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
    console.log(exams);
    setOpen(false);
  };

  function daysUntil(dateStr: string) {
    const today = new Date();
    const exam = new Date(dateStr);

    const diff = exam.getTime() - new Date(today.toDateString()).getTime();

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  function daysUntilIfFuture(dateStr: string): number | null {
    const today = new Date();
    const exam = new Date(dateStr);

    // 時刻の影響をなくす（重要）
    today.setHours(0, 0, 0, 0);
    exam.setHours(0, 0, 0, 0);

    const diffDays = (exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays < 0) {
      return null; // 過去の試験日は表示しない
    }

    return Math.ceil(diffDays);
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>＋ 試験を登録</Button>
      <h1>試験一覧</h1>
      <ul className="space-y-3">
        {exams.map((exam) => {
          const examDate = new Date(exam.examDate);
          const daysLeft = daysUntilIfFuture(examDate.toLocaleDateString("ja-JP"));

          return (
            <li key={exam.id} className="rounded border p-4 hover:bg-gray-50">
              <Link href={`/exams/${exam.id}`}>
                <div className="font-semibold">{exam.examName}</div>
              </Link>

              <div className="text-sm text-gray-500">
                受験日：
                {examDate.toLocaleDateString("ja-JP")}
              </div>

              {daysLeft !== null && (
                <span className="inline-block rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                  あと {daysLeft} 日
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <ExamRegisterDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />
    </>
  );
}
