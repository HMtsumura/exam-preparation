import Link from 'next/link';

type Exam = {
  id: number;
  examName: string;
};

const dummyExams: Exam[] = [
  { id: 1, examName: '試験A' },
  { id: 2, examName: '試験B' },
];

export default function MainPage() {
  return (
    <div>
      <h1>試験一覧</h1>
      <ul>
        {dummyExams.map((exam) => (
          <li key={exam.id}>
            <Link href={`/exams/${exam.id}`}>{exam.examName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}