"use client";

import { useState } from "react";
import Link from "next/link";
import "react-circular-progressbar/dist/styles.css";
import BookCreateDialog from "./BookCreateDialog";
import ChapterCreateDialog from "./ChapterCreateDialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

type Book = {
  id: number;
  bookName: string;
  imageUrl?: string;
  progressPercent?: number;
  totalStudyMinutes?: number;
};

export default function BookList({
  initialBooks,
  examId,
}: {
  initialBooks: Book[];
  examId: number;
}) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [bookCreateOpen, setBookCreateOpen] = useState(false);
  const [chapterCreateOpen, setChapterCreateOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const fetchBooks = async () => {
    const res = await fetch(`http://localhost:3000/api/exams/${examId}/books`);
    const data = await res.json();
    setBooks(data);
  };

  const handleCreated = async (book: Book) => {
    setBooks((prev) => [...prev, book]);
    // 書籍作成ダイアログを閉じる
    setBookCreateOpen(false);

    // BookID を保持
    setSelectedBookId(book.id);

    // 章作成ダイアログを「自動で開く！」
    setChapterCreateOpen(true);
  };

  function formatMinutes(minutes: number) {
    if (!minutes || minutes === 0) return "0分";

    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    if (h === 0) return `${m}分`;
    return `${h}時間 ${m}分`;
  }

  return (
    <ul>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <Card
            key={book.id}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            {/* 画像 */}
            <CardHeader className="p-0">
              <div className="relative w-full h-48 bg-gray-200">
                <Image
                  src={book.imageUrl || "/book-default.png"}
                  alt={book.bookName ?? "参考書の表紙"}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>

            {/* タイトル + 情報 */}
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg line-clamp-2">
                {book.bookName}
              </h3>

              {/* 進捗 */}
              <div className="mt-3">
                <div className="flex justify-between text-sm">
                  <span>進捗</span>
                  <span>{book.progressPercent ?? 0}%</span>
                </div>

                <Progress
                  value={book.progressPercent ?? 0}
                  className="h-2 mt-1"
                />
              </div>

              {/* 学習時間 */}
              <p className="text-sm text-gray-600 mt-3">
                ⏱ 合計学習時間: {formatMinutes(book.totalStudyMinutes ?? 0)}
              </p>
            </CardContent>

            {/* 詳細へ */}
            <CardFooter className="p-4 pt-0">
              <Link
                href={`/books/${book.id}`}
                className="text-blue-600 text-sm hover:underline"
              >
                詳細を見る →
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <BookCreateDialog
        examId={examId}
        onCreated={(book) => {
          console.log("新しく作成された Book ID:", book);
          handleCreated(book);
        }}
      />
      <ChapterCreateDialog
        bookId={selectedBookId}
        open={chapterCreateOpen}
        onOpenChange={setChapterCreateOpen}
      />
    </ul>
  );
}
