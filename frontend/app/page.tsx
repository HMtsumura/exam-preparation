import ExamRegisterDialogWrapper from './ExamRegisterDialogWrapper';

type Exam = {
  id: number;
  examName: string;
  examDate: Date;
  progressPercent: number;
  estimatedStudyHours: number;
  status: string;
};

const examRes = await fetch(`http://localhost:3000/api/exams`);
const exams: Exam[] = await examRes.json();

export default function MainPage() {
  return (
    <div>
      <ExamRegisterDialogWrapper initialExams={exams}/>
    </div>
  );
}