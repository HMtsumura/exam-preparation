import { Numerals } from "react-day-picker";
import BookList from "./BookList";
import ExamPaceStatus from "./ExamPaceStatus";

// app/exams/[id]/page.tsx
type Exam = {
  id: number;
  userId: number;
  examName: string;
  examDate: string;
  status: string;
  estimatedStudyHours: number;
};

type Book = {
  id: number;
  bookName: string;
  imageUrl?: string;
  progressPercent?: number;
  totalStudyMinutes?: number;
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
  console.log(books);
  return (
    <div>
      <h1>試験詳細</h1>
      <p>ID: {exam.id}</p>
      <p>試験名: {exam.examName}</p>
      <p>試験日: {exam.examDate}</p>
      <ExamPaceStatus
        examDate={new Date(exam.examDate)}
        totalStudyMinutes={exam.estimatedStudyHours}
        estimatedStudyHours={exam.estimatedStudyHours}
      />

      <p>必要な勉強時間: {exam.estimatedStudyHours}</p>
      <h2>この試験で使う本</h2>
      <BookList initialBooks={books} examId={exam.id} />
    </div>
  );
}
