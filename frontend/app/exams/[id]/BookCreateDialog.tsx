"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImagePicker from "./ImagePicker";

type Book = {
  id: number;
  bookName: string;
};

export default function BookCreateDialog({
  examId,
  onCreated,
}: {
  examId: number;
  onCreated: (book: Book) => void;
}) {
  const [open, setOpen] = useState(false);
  const [bookName, setbookName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function handleCreate() {
    const formData = new FormData();

    formData.append("bookName", bookName);
    formData.append("examId", examId.toString());

    if (imageFile) {
      formData.append("file", imageFile);
    }
    
    const res = await fetch("http://localhost:3000/api/books", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("書籍の作成に失敗しました");
      return;
    }

    const book = await res.json();

    setOpen(false); // このダイアログを閉じる
    onCreated(book); // 作成された bookId を親へ通知
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>+ 書籍を追加</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>書籍を追加</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-center">
              <ImagePicker
                imageUrl={imageUrl}
                onChange={(file) => {
                  if (file) {
                    setImageUrl(URL.createObjectURL(file)); // 表示用
                    setImageFile(file); // サーバー送信用
                  } else {
                    setImageUrl("");
                    setImageFile(null);
                  }
                }}
              />
            </div>
            <Input
              placeholder="書籍名"
              value={bookName}
              onChange={(e) => setbookName(e.target.value)}
            />

            <Button className="w-full" onClick={handleCreate}>
              作成する
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
