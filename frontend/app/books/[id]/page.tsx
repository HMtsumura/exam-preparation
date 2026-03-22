import Link from "next/link";
import ChapterList from "./ChapterList";
import { Button } from "@/components/ui/button";

// app/books/[id]/page.tsx
type Book = {
  id: number;
  bookName: string;
};

type Chapter = {
  id: number;
  chapterTitle: string;
  progressPercent: number;
  totalStudyTime: number;
  formattedTime: string;
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BookDetailPage({ params }: Props) {
  const { id } = await params;

  const bookRes = await fetch(`http://localhost:3000/api/books/${id}`);
  const book: Book = await bookRes.json();

  const chaptersRes = await fetch(`http://localhost:3000/api/books/${id}/chapters`);
  const chapters: Chapter[] = await chaptersRes.json();

  // 本の試験IDを取得するため、別途APIを呼び出す
  const bookDetailsRes = await fetch(`http://localhost:3000/api/books/${id}`);
  const bookDetails: any = await bookDetailsRes.json();
  const examId = bookDetails.examId;

  return (
    <div>
        <Link href={`/exams/${examId}`}>
          <Button variant="outline" className="mb-4">← 試験詳細に戻る</Button>
        </Link>
        <h1>参考書詳細</h1>
        <p>ID: {book.id}</p>
        <p>試験名: {book.bookName}</p>

         <ChapterList initialChapters={chapters} bookId={book.id}/>
    </div>
  );
}
