import { type NextRequest, NextResponse } from "next/server";
import { GENRE_CATEGORIES, SAMPLE_QUESTIONS, GROUP_DISTRACTOR_POOLS } from "@/lib/quiz-data";
import type { Difficulty, QuizQuestion, GenreKey, DynamicQuizTemplate } from "@/types/quiz";

/**
 * 配列をシャッフルするヘルパー関数
 */
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * 動的な問題テンプレートから、完成したクイズ問題を生成する関数
 */
function buildQuestionFromTemplate(template: DynamicQuizTemplate): QuizQuestion {
  const poolKey = template.distractorPoolKey;
  let distractorPool: string[] = [];

  if (poolKey === 'prefectures' && GROUP_DISTRACTOR_POOLS.prefectures) {
    distractorPool = GROUP_DISTRACTOR_POOLS.prefectures.distractors;
  } else if (poolKey !== 'prefectures' && GROUP_DISTRACTOR_POOLS[poolKey]) {
    // @ts-ignore - groupKey is checked, so this is safe
    distractorPool = GROUP_DISTRACTOR_POOLS[poolKey].distractors;
  } else {
    const fallbackKeys = Object.keys(GROUP_DISTRACTOR_POOLS).filter(k => k !== 'prefectures') as (keyof typeof GROUP_DISTRACTOR_POOLS)[];
    const randomKey = fallbackKeys[Math.floor(Math.random() * fallbackKeys.length)];
    // @ts-ignore
    distractorPool = GROUP_DISTRACTOR_POOLS[randomKey]?.distractors || ["選択肢A", "選択肢B", "選択肢C"];
  }

  const filteredPool = distractorPool.filter(item => item !== template.answer);
  const shuffledDistractors = shuffleArray(filteredPool);

  const distractors = shuffledDistractors.slice(0, 3);
  if (distractors.length < 3) {
    while(distractors.length < 3) {
      distractors.push(`ダミー選択肢${distractors.length + 1}`);
    }
  }

  const finalOptions = shuffleArray([template.answer, ...distractors]);
  const finalQuestionText = template.questionTemplate.replace("{craft}", template.craft);

  return {
    id: template.id,
    craft: template.craft,
    category: template.category,
    difficulty: template.difficulty,
    format: "multiple_choice",
    question: finalQuestionText,
    options: finalOptions,
    answer: template.answer,
    explanation: template.explanation,
  };
}

/**
 * クイズセッションを生成するメイン関数
 */
function generateQuizSession(selectedGenre: GenreKey = "all"): QuizQuestion[] | null {
  const targetCrafts = GENRE_CATEGORIES[selectedGenre]?.crafts || [];

  // ★★★ 変更点：静的な問題の選択肢もここでシャッフルする ★★★
  const availableStaticQuestions = SAMPLE_QUESTIONS.filter(
    (q): q is QuizQuestion => targetCrafts.includes(q.craft) && q.format === 'multiple_choice'
  ).map(q => ({
    ...q,
    options: q.options ? shuffleArray(q.options) : [], // 選択肢をここでシャッフル
  }));

  const availableDynamicTemplates = SAMPLE_QUESTIONS.filter(
    (q): q is DynamicQuizTemplate => targetCrafts.includes(q.craft) && q.format === 'dynamic_multiple_choice'
  );

  const generatedDynamicQuestions = availableDynamicTemplates.map(buildQuestionFromTemplate);

  const allAvailableQuestions = [...availableStaticQuestions, ...generatedDynamicQuestions];

  if (allAvailableQuestions.length < 15) {
    console.warn(`[Server] Not enough questions for genre "${selectedGenre}". Found only ${allAvailableQuestions.length}. Need at least 15.`);
    return null; 
  }

  const easyPool = shuffleArray(allAvailableQuestions.filter((q) => q.difficulty === "easy"));
  const mediumPool = shuffleArray(allAvailableQuestions.filter((q) => q.difficulty === "medium"));
  const hardPool = shuffleArray(allAvailableQuestions.filter((q) => q.difficulty === "hard"));
  
  const finalQuestions: QuizQuestion[] = [];
  const usedQuestionIds = new Set<number>();

  const pickQuestions = (pool: QuizQuestion[], count: number) => {
    let pickedCount = 0;
    for (const question of pool) {
        if (pickedCount >= count) break;
        if (!usedQuestionIds.has(question.id)) {
            finalQuestions.push(question);
            usedQuestionIds.add(question.id);
            pickedCount++;
        }
    }
  };
  
  pickQuestions(easyPool, 5);
  pickQuestions(mediumPool, 5);
  pickQuestions(hardPool, 5);

  if (finalQuestions.length < 15) {
      const remainingPool = shuffleArray(allAvailableQuestions.filter(q => !usedQuestionIds.has(q.id)));
      for(const question of remainingPool) {
          if (finalQuestions.length >= 15) break;
          finalQuestions.push(question);
      }
  }

  if (finalQuestions.length < 15) {
    console.warn(`[Server] Could not assemble a full 15-question quiz for "${selectedGenre}". Assembled ${finalQuestions.length}.`);
    return null;
  }

  const difficultyOrder: Record<Difficulty, number> = { easy: 1, medium: 2, hard: 3 };
  finalQuestions.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);

  return finalQuestions.slice(0, 15);
}

// APIルートのメイン処理
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = (searchParams.get("genre") as GenreKey) || "all";
    const questions = generateQuizSession(genre);
    
    if (!questions) {
      const genreName = GENRE_CATEGORIES[genre]?.name || genre;
      const errorMsg = `選択されたジャンル「${genreName}」には、クイズを作成するための十分な問題（15問以上）が登録されていません。`;
      return NextResponse.json({ success: false, error: errorMsg }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      questions,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("[API] Error generating quiz:", error);
    return NextResponse.json({ success: false, error: "クイズの生成に失敗しました。", details: errorMessage }, { status: 500 });
  }
}

