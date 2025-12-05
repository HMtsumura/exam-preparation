"use client";

import { useState } from "react";
import Link from "next/link";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import StudyRecordDialog from "./StudyRecordDialog";
import { DeleteChapterButton } from "./DeleteChapterButton";

type Chapter = {
  id: number;
  chapterTitle: string;
  progressPercent: number;
  totalStudyTime: number;
  formattedTime: string;
};

export default function ChapterList({
  initialChapters,
  bookId,
}: {
  initialChapters: Chapter[];
  bookId: number;
}) {
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<{
    id: number;
    title: string;
    progressPercent: number;
  } | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentBookId, setCurrentBookId] = useState(bookId);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    const res = await fetch(
      `http://localhost:3000/api/books/${bookId}/chapters`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chapterTitle: newTitle }),
      }
    );
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

  const handleRecordClick = (chapter: {
    id: number;
    title: string;
    progressPercent: number;
  }) => {
    setCurrentChapter(chapter);
    setProgress(chapter.progressPercent);
    setDialogOpen(true);
  };

  const handleSaveRecord = async (
    progress: number,
    durationMinutes: number,
    notes: string
  ) => {
    if (!currentChapter) return;

    await fetch(
      `http://localhost:3000/api/chapters/${currentChapter.id}/study_logs`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          durationMinutes,
          notes,
        }),
      }
    );

    await fetch(
      `http://localhost:3000/api/chapters/${currentChapter.id}/progress`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          progress,
        }),
      }
    );

    const updated = await fetch(
      `http://localhost:3000/api/books/${bookId}/chapters/${currentChapter.id}`
    ).then((r) => r.json());
    console.log(updated);

    setChapters((prev) =>
      prev.map((ch) => (ch.id === updated.id ? updated : ch))
    );
    // 必要なら状態更新
    setDialogOpen(false);
  };

  const fetchChapters = async () => {
    const res = await fetch(
      `http://localhost:3000/api/books/${bookId}/chapters`
    );
    const data = await res.json();
    setChapters(data);
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">章一覧</h2>

      <div className="space-y-4">
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            {/* 左側：タイトル + 学習時間 */}
            <div className="flex flex-col">
              <Link
                href={`/chapters/${chapter.id}`}
                className="text-lg font-semibold hover:underline"
              >
                {chapter.chapterTitle}
              </Link>

              <span className="text-sm text-gray-600 mt-1">
                合計学習時間: {chapter.formattedTime}
              </span>
            </div>

            {/* 右側：進捗とボタン */}
            <div className="flex items-center gap-4">
              {/* 進捗丸 */}
              <div className="w-14 h-14">
                <CircularProgressbar
                  value={chapter.progressPercent ?? 0}
                  text={`${chapter.progressPercent ?? 0}%`}
                  styles={buildStyles({
                    textSize: "28px",
                    pathColor: "#3b82f6",
                    textColor: "#000",
                    trailColor: "#e5e7eb",
                  })}
                />
              </div>

              {/* アクション */}
              <div className="flex flex-col gap-2">
                <button
                  className="px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                  onClick={() =>
                    handleRecordClick({
                      id: chapter.id,
                      title: chapter.chapterTitle,
                      progressPercent: chapter.progressPercent,
                    })
                  }
                >
                  記録
                </button>

                <DeleteChapterButton
                  chapterId={chapter.id}
                  onDeleted={() => fetchChapters()}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 章追加 UI */}
      <div className="mt-6">
        {isAdding ? (
          <div className="flex gap-2">
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
            className="bg-blue-600 text-white rounded-xl px-5 py-3 shadow hover:bg-blue-700 transition w-full"
          >
            ＋ 章を追加
          </button>
        )}
      </div>

      {/* 記録ダイアログ */}
      {currentChapter && (
        <StudyRecordDialog
          chapterTitle={currentChapter.title}
          progressPercent={progress}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSaveRecord}
        />
      )}
    </div>
  );
}
