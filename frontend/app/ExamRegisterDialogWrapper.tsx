"use client";

import { useState } from "react";
import ExamRegisterDialog from "./ExamRegisterDialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { PassedStamp } from "./PassedStamp";

type Exam = {
  id: number;
  examName: string;
  examDate: Date;
  progressPercent: number;
  estimatedStudyHours: number;
  status: string;
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

  function getExamStatus(date: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    if (d.getTime() === today.getTime()) return "today";
    if (d.getTime() < today.getTime()) return "past";
    return "future";
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>＋ 試験を登録</Button>
      <h1>試験一覧</h1>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => {
          const examDate = new Date(exam.examDate);
          const daysLeft = daysUntilIfFuture(
            examDate.toLocaleDateString("ja-JP")
          );
          const status = getExamStatus(examDate);

          return (
            <li
              key={exam.id}
              className={`relative rounded-lg border p-4 transition hover:shadow
          ${exam.status === "passed" ? "bg-gray-50 text-gray-400" : "bg-white"}
        `}
            >
              {exam.status === "passed" && <PassedStamp />}

              <Link href={`/exams/${exam.id}`}>
                <h3 className="font-semibold text-lg">{exam.examName}</h3>
              </Link>

              <div className="mt-1 text-sm">
                📅 {examDate.toLocaleDateString("ja-JP")}
              </div>

              {/* ステータス表示 */}
              <div className="mt-3">
                {status === "future" && daysLeft !== null && (
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    あと {daysLeft} 日
                  </span>
                )}

                {status === "today" && (
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    🎯 本日試験
                  </span>
                )}

                {status === "past" && (
                  <span className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm">
                    試験終了
                  </span>
                )}
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>進捗</span>
                  <span>{Math.round(exam.progressPercent)}%</span>
                </div>

                <Progress
                  value={exam.progressPercent}
                  className={`h-2 ${
                    exam.progressPercent >= 80
                      ? "bg-green-500"
                      : exam.progressPercent >= 50
                      ? "bg-blue-500"
                      : "bg-gray-300"
                  }`}
                />
              </div>
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
