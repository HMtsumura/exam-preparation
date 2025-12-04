"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ChapterCreateDialog({
  bookId,
  open,
  onOpenChange,
}: {
  bookId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [title, setTitle] = useState("");

  const handleCreate = async () => {
    if (!bookId) return;

    await fetch(`http://localhost:3000/api/books/${bookId}/chapters`, {
      method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ chapterTitle: title }),
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>章を追加</DialogTitle>
        </DialogHeader>

        <Input value={title} onChange={(e) => setTitle(e.target.value)} />

        <Button onClick={handleCreate}>追加</Button>
      </DialogContent>
    </Dialog>
  );
}
