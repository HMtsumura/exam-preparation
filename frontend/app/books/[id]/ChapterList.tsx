"use client";

import { useState } from "react";
import Link from "next/link";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type Chapter = {
  id: number;
  chapterTitle: string;
  progressPercent: number;
};

export default function ChapterList({ initialChapters, bookId }: { initialChapters: Chapter[], bookId: number }) {
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    const res = await fetch(`http://localhost:3000/api/books/${bookId}/chapters`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ chapterTitle: newTitle }),
    });
    if (!res.ok) {
        console.error("章の追加に失敗しました");
        return;
    }

    const created = await res.json();

    // ローカル状態に反映
    setChapters([...chapters, created]);
    setNewTitle("");
    setIsAdding(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mt-4">章</h2>

      <ul className="mt-2">
        {chapters.map((chapter) => (
          <li key={chapter.id} className="py-1">
            <Link href={`/chapters/${chapter.id}`}>
              {chapter.chapterTitle}
            </Link>
            <div className="w-12 h-12">
                <CircularProgressbar
                    value={chapter.progressPercent ?? 0}
                    text={`${chapter.progressPercent ?? 0}%`}
                    styles={buildStyles({
                        textSize: '30px',
                        pathColor: `#3b82f6`, // 青色
                        textColor: '#ffffffff',
                        trailColor: '#e5e7eb', // 薄いグレー
                    })}
                />
            </div>
          </li>
        ))}
      </ul>

      {/* 章追加 UI */}
      {isAdding ? (
        <div className="flex gap-2 mt-4">
          <input
            className="border p-2 rounded w-full"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="新しい章タイトル"
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleAdd}
          >
            追加
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setIsAdding(false)}
          >
            キャンセル
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
        >
          ＋ 章を追加
        </button>
      )}
    </div>
  );
}
