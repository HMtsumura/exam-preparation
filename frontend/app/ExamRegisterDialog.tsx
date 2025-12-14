"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExamNameInput } from "./ExamNameInput";
import { ExamDatePicker } from "./ExamDatePicker";

type ExamRegisterDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (data: {
    examName: string;
    // dailyHours: number;
    examDate: Date | undefined; // ← page.tsx に合わせる
  }) => void | Promise<void>;
};

export default function ExamRegisterDialog({
  open,
  onOpenChange,
  onSubmit,
}: ExamRegisterDialogProps) {
  const [step, setStep] = useState(1);

  const [examName, setExamName] = useState("");
  const [dailyHours, setDailyHours] = useState("");
  const [examDate, setExamDate] = useState<Date | undefined>();

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    await onSubmit({
      examName,
      // dailyHours: Number(dailyHours), TODO: 必要な勉強時間に変更する
      examDate,
    });
    onOpenChange(false);
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          {step === 1 && "受験する資格を入力"}
          {step === 2 && "1日の学習時間（時間）"}
          {step === 3 && "受験予定日を入力"}
        </DialogHeader>

        {/* STEP 1 */}
        {step === 1 && (
          <ExamNameInput 
            value={examName} 
            onChange={setExamName}/>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <Input
            type="number"
            placeholder="学習時間（時間）"
            value={dailyHours}
            onChange={(e) => setDailyHours(e.target.value)}
          />
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <ExamDatePicker
            value={examDate}
            onChange={setExamDate}
         />
        )}

        <DialogFooter>
          {step > 1 && (
            <Button variant="outline" onClick={back}>
              戻る
            </Button>
          )}
          {step < 3 && (
            <Button onClick={next} disabled={step === 1 && !examName}>
              次へ
            </Button>
          )}
          {step === 3 && (
            <Button onClick={handleSubmit} disabled={!examDate}>
              登録
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
