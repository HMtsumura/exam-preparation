"use client";

import { useState } from "react";
import Link from "next/link";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import StudyRecordDialog from "./StudyRecordDialog";
import { DeleteChapterButton } from "./DeleteChapterButton";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";

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
    chapterTitle: string;
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
    chapterTitle: string;
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
    <div className="space-y-4 mt-4">
      {chapters.map((chapter) => (
        <Card key={chapter.id} className="max-w-md w-full mx-auto shadow-sm">
          <CardHeader className="flex flex-row justify-between items-start">
            <div>
              <CardTitle className="text-lg">
                <Link
                  href={`/chapters/${chapter.id}`}
                  className="hover:underline"
                >
                  {chapter.chapterTitle}
                </Link>
              </CardTitle>
            </div>

            <div className="w-12 h-12">
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
          </CardHeader>

          <CardContent>
            <p className="text-sm text-muted-foreground">
              合計学習時間: {chapter.formattedTime}
            </p>
          </CardContent>

          <CardFooter className="flex justify-between items-center">
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => handleRecordClick(chapter)}
            >
              <Pencil className="w-4 h-4" />
              記録
            </Button>

            <DeleteChapterButton
              chapterId={chapter.id}
              onDeleted={fetchChapters}
            />
          </CardFooter>
        </Card>
      ))}
      {/* 章追加 UI */}
      {isAdding ? (
        <div className="flex gap-2 mt-4">
          <input
            className="border p-2 rounded w-full"
            value={newTitle ?? ""}
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
          className="bg-blue-500 text-white rounded px-4 py-2 mt-4 flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> 章を追加
        </button>
      )}

      {/* 記録ダイアログ */}
      {currentChapter && (
        <StudyRecordDialog
          chapterTitle={currentChapter.chapterTitle}
          progressPercent={currentChapter.progressPercent}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSaveRecord}
        />
      )}
    </div>
  );
}
