// types/quiz.ts

// --- 基本的な型定義 ---

// 工芸品の具体的な名前（例：「結城紬」）の型
export type CraftCategory = string;

// 問題の難易度の型（3種類のみ許可）
export type Difficulty = "easy" | "medium" | "hard";

// 知識分野の型
export type KnowledgeCategory =
  | "history"
  | "geography"
  | "materials"
  | "usage"
  | "design"
  | "trivia";

// ★★★ 変更点：4択問題のみに統一 ★★★
export type QuestionFormat = "multiple_choice";


// --- 新しい設計思想のための型定義 ---

// ★★★ 新定義：工芸品グループのキー ★★★
export type GroupKey =
  | "textile"
  | "ceramic"
  | "wood"
  | "metal"
  | "paper" // 宗教・紙・文具系を統合
  | "other"; // その他工芸を統合

// ★★★ 新定義：誤答プールのキー ★★★
// GroupKeyに 'prefectures' を追加した形
export type DistractorPoolKey = GroupKey | "prefectures";


// --- 問題データの型定義 ---

// 静的な4択問題の「設計図」
export interface QuizQuestion {
  id: number;
  craft: CraftCategory;
  category: KnowledgeCategory;
  difficulty: Difficulty;
  format: QuestionFormat;
  question: string;
  options: string[]; // 4つの選択肢が必須
  answer: string;
  explanation: string;
}

// 動的な4択問題テンプレートの「設計図」
export interface DynamicQuizTemplate {
  id: number;
  craft: CraftCategory;
  category: KnowledgeCategory;
  difficulty: Difficulty;
  format: "dynamic_multiple_choice"; // このテンプレート専用のフォーマット名
  questionTemplate: string;
  answer: string;
  distractorPoolKey: DistractorPoolKey; // ★ どの誤答プールを使うか
  groupKey: GroupKey;                  // ★ どの工芸品グループに属するか
  explanation: string;
}


// --- アプリケーションで使うその他の型定義 ---

// ジャンル選択画面で使うキーの型
export type GenreKey =
  | "all"
  | "textiles"
  | "dyedGoods"
  | "otherTextiles"
  | "pottery"
  | "lacquerware"
  | "woodBamboo"
  | "metalwork"
  | "buddhistAltar"
  | "paper"
  | "stationery"
  | "stonework"
  | "gemstone"
  | "dolls"
  | "otherCrafts"
  | "materials";

// ランキングデータ一件の型定義
export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  accuracy: number;
  completionTime: number;
  date: Date;
}

// クイズセッション全体の型定義
export interface QuizSession {
  id: string;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: (string | null)[];
  score: number;
  startTime: Date;
  endTime?: Date;
}

