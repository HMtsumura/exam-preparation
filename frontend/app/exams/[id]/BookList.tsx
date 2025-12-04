"use client";

import { useState } from "react";
import Link from "next/link";
import 'react-circular-progressbar/dist/styles.css';
import BookCreateDialog from "./BookCreateDialog";
import ChapterCreateDialog from "./ChapterCreateDialog";


type Book = {
  id: number;
  bookName: string;
};

export default function BookList({ initialBooks, examId }: { initialBooks: Book[], examId: number }) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [bookCreateOpen, setBookCreateOpen] = useState(false);
  const [chapterCreateOpen, setChapterCreateOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);


  const fetchBooks = async ()=>{
    const res = await fetch(`http://localhost:3000/api/exams/${examId}/books`);
    const data = await res.json();
    setBooks(data);
  };

  const handleCreated = async (book: Book)=>{
    setBooks((prev) => [...prev, book]);
        // 書籍作成ダイアログを閉じる
    setBookCreateOpen(false);

    // BookID を保持
    setSelectedBookId(book.id);

    // 章作成ダイアログを「自動で開く！」
    setChapterCreateOpen(true);
  };

  return (
    <ul>
        {books.map((book) => (
            <li key={book.id}> 
                <Link href={`/books/${book.id}`}>{book.bookName}</Link>
            </li>
        ))}
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
