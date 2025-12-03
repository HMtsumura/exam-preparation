"use client";

import { useState } from "react";
import Link from "next/link";
import 'react-circular-progressbar/dist/styles.css';
import BookCreateDialog from "./BookCreateDialog";


type Book = {
  id: number;
  bookName: string;
};

export default function BookList({ initialBooks, examId }: { initialBooks: Book[], examId: number }) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<{ id: number, title: string, progressPercent: number } | null>(null);
  const [progress, setProgress] = useState(0);



  const handleRecordClick = (chapter: { id: number, title: string, progressPercent: number }) => {
    setCurrentChapter(chapter);
    setProgress(chapter.progressPercent);
    setDialogOpen(true);
  };

  const fetchBooks = async ()=>{
    const res = await fetch(`http://localhost:3000/api/exams/${examId}/books`);
    const data = await res.json();
    setBooks(data);
  };

  const handleCreated = async (book: Book)=>{
    setBooks((prev) => [...prev, book]);
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
    </ul>
  );
}
