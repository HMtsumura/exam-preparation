"use client";

import { useState } from "react";
import ExamRegisterDialog from "./ExamRegisterDialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Exam = {
  id: number;
  examName: string;
  examDate: Date;
};

export default function ExamRegisterDialogWrapper({
    initialExams,
}: {
  initialExams: Exam[];
}) {
  const [open, setOpen] = useState(false);
  const [exams, setExams] = useState(initialExams);
  const handleSubmit = async (data: {
    examName: string;
    // dailyHours: number;
    examDate: Date | undefined;
  }) => {
    if (!data.examDate) {
        alert("受験日を選択してください");
        return;
    }
    const examDate = data.examDate.toISOString();
    const examName = data.examName;
    const res = await fetch("/api/exams", {
      method: "POST",
      body: JSON.stringify({
        examName,
        examDate,
        }),
    });

    alert("試験を登録しました");

    const createdExam = await res.json();
    setExams((prev) => [...prev, createdExam]);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>＋ 試験を登録</Button>
        <h1>試験一覧</h1>
        <ul className="space-y-3">
        {exams.map((exam) => (
          <li
            key={exam.id}
            className="rounded border p-4 hover:bg-gray-50"
          >
            <Link href={`/exams/${exam.id}`}>
                <div className="font-semibold">{exam.examName}</div>
            </Link>
            
            <div className="text-sm text-gray-500">
              {/* 受験日：{exam.examDate.toDateString()} */}
            </div>
          </li>
        ))}
      </ul>

      <ExamRegisterDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />
    </>
  );
}
