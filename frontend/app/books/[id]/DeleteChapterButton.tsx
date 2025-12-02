"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DeleteChapterButton({
  chapterId,
  onDeleted,
}: {
  chapterId: number;
  onDeleted: () => void; // 親の再取得処理
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteChapter = async () => {
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3000/api/chapters/${chapterId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete");
      }

      setLoading(false);
      setOpen(false);
      onDeleted(); // 親へ通知
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <>
      {/* 削除アイコンボタン */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="text-red-500 hover:text-red-600 hover:bg-red-50"
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      {/* ダイアログ */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>

          <DialogHeader>
            <DialogTitle>章を削除しますか？</DialogTitle>
            <DialogDescription>
              この操作は取り消せません。本当に削除してよろしいですか？
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              キャンセル
            </Button>

            <Button
              variant="destructive"
              onClick={deleteChapter}
              disabled={loading}
            >
              {loading ? "削除中..." : "削除する"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
