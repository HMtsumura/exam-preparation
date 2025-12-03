
import Link from "next/link";
import BookCreateDialog from "./BookCreateDialog";
import BookList from "./BookList";

// app/exams/[id]/page.tsx
type Exam = {
  id: number;
  userId: number;
  examName: string;
  examDate: string;
  status: string;
};

type Book = {
  id: number;
  bookName: string;
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ExamDetailPage({ params }: Props) {

  const { id } = await params;
  const examRes = await fetch(`http://localhost:3000/api/exams/${id}`);
  const exam: Exam = await examRes.json();

  const booksRes = await fetch(`http://localhost:3000/api/exams/${id}/books`);
  const books: Book[] = await booksRes.json();

  return (
    <div>
      <h1>試験詳細</h1>
      <p>ID: {exam.id}</p>
      <p>試験名: {exam.examName}</p>
      <p>試験日: {exam.examDate}</p>

      <h2>この試験で使う本</h2>
      <BookList initialBooks={books} examId={exam.id}/>      
    </div>
  );
}
