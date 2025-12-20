import Link from 'next/link';
import ExamRegisterDialogWrapper from './ExamRegisterDialogWrapper';

type Exam = {
  id: number;
  examName: string;
  examDate: Date;
  progressPercent: number;
  estimatedStudyHours: number;
  status: string;
};

// const dummyExams: Exam[] = [
//   { id: 1, examName: '試験A' },
//   { id: 2, examName: '試験B' },
// ];

const examRes = await fetch(`http://localhost:3000/api/exams`);
const exams: Exam[] = await examRes.json();

export default function MainPage() {
  return (
    <div>
      <ExamRegisterDialogWrapper initialExams={exams}/>
    </div>
  );
}