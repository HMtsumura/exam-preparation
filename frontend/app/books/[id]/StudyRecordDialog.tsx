"use client";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

interface StudyRecordDialogProps {
  chapterTitle: string;
  progressPercent: number;
  open: boolean;
  onClose: () => void;
  onSave: (progress: number, duration: number, notes: string) => void;
}

export default function StudyRecordDialog({
  chapterTitle,
  progressPercent,
  open,
  onClose,
  onSave,
}: StudyRecordDialogProps) {
  const [progress, setProgress] = useState(progressPercent);
  const [duration, setDuration] = useState(0);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    console.log('aa')
    if (open) {
      setProgress(progressPercent);
    }
  }, [open]);

  const handleSave = () => {
    onSave(progress, duration, notes);
    setProgress(0);
    setDuration(0);
    setNotes("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed z-50 inset-0 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/30" onClick={onClose}></div>
      <div className="text-black bg-white p-6 rounded shadow-lg z-50 w-96">
        <Dialog.Title className="text-lg font-bold mb-4">
          {chapterTitle}
        </Dialog.Title>

        <div className="mb-4">
          <label className="block mb-1">進捗</label>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full"
          />
          <div>{progress}%</div>
        </div>

        <div className="mb-4">
          <label className="block mb-1">学習時間（分）</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">コメント</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            キャンセル
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            保存
          </button>
        </div>
      </div>
    </Dialog>
  );
}
