// app/exams/[id]/page.tsx
type Exam = {
  id: number;
  userId: number;
  examName: string;
  examDate: string;
  status: string;
};

interface Props {
  params: Promise<{ id: string }>;  // 👈 ここ重要：Promise
}

export default async function ExamDetailPage({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3000/api/exams/${id}`);
  const exam: Exam = await res.json();

  return (
    <div>
      <h1>試験詳細</h1>
      <p>ID: {exam.id}</p>
      <p>試験名: {exam.examName}</p>
      <p>試験日: {exam.examDate}</p>
    </div>
  );
}
