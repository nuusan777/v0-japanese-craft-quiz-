"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface Review {
  user: string;
  age: number;
  text: string;
  img: string;
  likes: number;
  replies?: { user: string; text: string }[];
}

export default function ReviewCard({ review }: { review: Review }) {
  const [likes, setLikes] = useState(review.likes);
  const [liked, setLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState(review.replies || []);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handleReply = () => {
    if (replyText.trim()) {
      setReplies([...replies, { user: "あなた", text: replyText }]);
      setReplyText("");
      setShowReply(false);
    }
  };

  return (
    <div className="mb-3">
      <div className="flex gap-3 items-start">
        <Image src={review.img} alt="user" width={32} height={32} className="rounded-full border" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground">{review.user}</span>
            <span className="text-xs text-muted-foreground">{review.age}歳</span>
          </div>
          <p className="text-sm mt-1 mb-2 whitespace-pre-line">{review.text}</p>
          <div className="flex items-center gap-2 text-pink-600 mb-1">
            <button onClick={handleLike} disabled={liked} className={`flex items-center gap-1 px-2 py-1 rounded-full bg-pink-100 transition ${liked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-200'}`}> 
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.8 4.6c-1.5-1.3-3.7-1.3-5.2 0l-.6.6-.6-.6c-1.5-1.3-3.7-1.3-5.2 0-1.6 1.4-1.7 3.8-.2 5.3l8 8.1 8-8.1c1.5-1.5 1.4-3.9-.2-5.3z"></path></svg>
              <span className="text-xs font-bold">{likes}</span>
            </button>
            <button onClick={() => setShowReply(!showReply)} className="text-xs px-2 py-1 rounded-full bg-blue-100 hover:bg-blue-200 transition">返信</button>
          </div>
          {showReply && (
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                placeholder="返信を入力..."
                className="flex-1 rounded-full border px-2 py-1 text-xs"
              />
              <Button size="sm" variant="outline" onClick={handleReply}>送信</Button>
            </div>
          )}
          {replies.length > 0 && (
            <div className="ml-2 mt-1 border-l-2 border-gray-200 pl-2">
              {replies.map((r, i) => (
                <div key={i} className="text-xs text-muted-foreground mb-1">
                  <span className="font-bold text-foreground mr-1">{r.user}:</span>{r.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
