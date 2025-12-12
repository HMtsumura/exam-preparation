"use client";

import { useState } from "react";
import ExamRegisterDialog from "./ExamRegisterDialog";
import { Button } from "@/components/ui/button";

export default function ExamRegisterDialogWrapper() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: {
    examName: string;
    dailyHours: number;
    targetDate: string;
  }) => {
    await fetch("/api/exams", {
      method: "POST",
      body: JSON.stringify(data),
    });

    alert("試験を登録しました");
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>＋ 試験を登録</Button>

      <ExamRegisterDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />
    </>
  );
}
