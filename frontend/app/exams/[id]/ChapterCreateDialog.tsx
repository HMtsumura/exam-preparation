"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function ChapterCreateDialog({
  bookId,
  open,
  onOpenChange,
}: {
  bookId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [chapters, setChapters] = useState<string[]>([""]);

  // 行を追加
  const addRow = () => {
    setChapters((prev) => [...prev, ""]);
  };

  const removeRow = (index: number) => {
    setChapters(chapters.filter((_, i) => i !== index));
  };

  // 入力変更
  const updateRow = (index: number, value: string) => {
    setChapters((prev) => prev.map((c, i) => (i === index ? value : c)));
  };

  const handleCreate = async () => {
    if (!bookId) return;

    const validChapters = chapters.filter((title) => title.trim() !== "");
    if (validChapters.length === 0) return;

    await fetch("http://localhost:3000/api/chapters/bulk", {
      method: "POST",
      body: JSON.stringify({ bookId, titles: validChapters }),
      headers: { "Content-Type": "application/json" },
    });

    onOpenChange(false);
    setChapters([""]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>章を追加</DialogTitle>
        </DialogHeader>

           {chapters.map((title, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Input
                value={title}
                onChange={(e) => updateRow(idx, e.target.value)}
                placeholder={`章タイトル ${idx + 1}`}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeRow(idx)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button variant="outline" onClick={addRow}>
            + 行を追加
          </Button>

          <Button className="w-full" onClick={handleCreate}>
            登録する
          </Button>
      </DialogContent>
    </Dialog>
  );
}
