"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExamNameInput } from "./ExamNameInput";
import { ExamDatePicker } from "./ExamDatePicker";

type ExamInfo = {
  requiredStudyHours: number;
  actualStudyHours: number;
  examDateInfo: string;
  examDate: string;
};

type ExamRegisterDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (data: {
    examName: string;
    estimatedDailyStudyHours: number;
    examDate: Date | undefined;
    requiredStudyHours: number;
  }) => void | Promise<void>;
};

export default function ExamRegisterDialog({
  open,
  onOpenChange,
  onSubmit,
}: ExamRegisterDialogProps) {
  const [step, setStep] = useState(1);

  const [examName, setExamName] = useState("");
  const [estimatedDailyStudyHours, setEstimatedDailyStudyHours] = useState("");
  const [examDate, setExamDate] = useState<Date | undefined>();
  const [examInfo, setExamInfo] = useState<ExamInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const next = () => setStep((s: number) => s + 1);
  const back = () => {
    const currentStep = step;
    if (currentStep === 2) {
      // STEP 2 から戻る時は examInfo をリセット（新しい試験の分析ができるように）
      setExamInfo(null);
      setError("");
    }
    if (currentStep === 3) {
      // STEP 3 から戻る時は examInfo をリセット
      setExamInfo(null);
      setError("");
    }
    setStep((s: number) => s - 1);
  };

  const fetchExamInfo = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("Fetching exam info for:", examName, estimatedDailyStudyHours);
      
      const response = await fetch("/api/exams/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examName,
          dailyStudyHours: Number(estimatedDailyStudyHours),
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("情報取得に失敗しました");
      }

      const data = await response.json();
      console.log("Exam info received:", data);
      
      setExamInfo(data.data || data);
      
      // examDateを設定（バックエンドから返された日付）
      const dateToSet = data.data?.examDate || data.examDate;
      if (dateToSet) {
        console.log("Setting exam date:", dateToSet);
        setExamDate(new Date(dateToSet));
      }
      
      // STEP 2 → STEP 3 へ進める
      next();
    } catch (err) {
      console.error("Error in fetchExamInfo:", err);
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    await onSubmit({
      examName,
      estimatedDailyStudyHours: Number(estimatedDailyStudyHours),
      examDate,
      requiredStudyHours: examInfo?.requiredStudyHours || 0,
    });
    onOpenChange(false);
    setStep(1);
    setExamName("");
    setEstimatedDailyStudyHours("");
    setExamDate(undefined);
    setExamInfo(null);
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "受験する資格を入力"}
            {step === 2 && (loading ? "試験情報を分析中..." : "1日の学習時間（時間）")}
            {step === 3 && "受験予定日"}
          </DialogTitle>
        </DialogHeader>

        {/* STEP 1 */}
        {step === 1 && (
          <ExamNameInput 
            value={examName} 
            onChange={setExamName}
          />
        )}

        {/* STEP 2 - 学習時間入力または分析結果表示 */}
        {step === 2 && (
          <>
            {loading ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                  <p>試験情報を分析中...</p>
                </div>
              </div>
            ) : (
              <>
                {!examInfo && (
                  <Input
                    type="number"
                    placeholder="学習時間（時間）"
                    value={estimatedDailyStudyHours}
                    onChange={(e: any) => setEstimatedDailyStudyHours(e.target.value)}
                  />
                )}
                
                {examInfo && (
                  <div className="space-y-3 bg-blue-50 border border-blue-200 rounded p-4">
                    <div>
                      <p className="text-sm text-gray-600">必要な勉強時間（目安）</p>
                      <p className="text-lg font-semibold">{examInfo.requiredStudyHours}時間</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">合格者の平均勉強時間</p>
                      <p className="text-lg font-semibold">{examInfo.actualStudyHours}時間</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">試験実施日</p>
                      <p className="text-lg font-semibold">{examInfo.examDateInfo}</p>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">予想される合格日</p>
                      <p className="text-lg font-semibold text-green-600">
                        {examDate ? examDate.toLocaleDateString("ja-JP") : "計算中..."}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-4 text-red-800">
                {error}
              </div>
            )}
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4">
            {examInfo && (
              <div className="space-y-3 bg-blue-50 border border-blue-200 rounded p-4">
                <div>
                  <p className="text-sm text-gray-600">試験名</p>
                  <p className="text-lg font-semibold">{examName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">必要な勉強時間（目安）</p>
                  <p className="text-lg font-semibold">{examInfo.requiredStudyHours}時間</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">合格者の平均勉強時間</p>
                  <p className="text-lg font-semibold">{examInfo.actualStudyHours}時間</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">試験実施日</p>
                  <p className="text-lg font-semibold">{examInfo.examDateInfo}</p>
                </div>
              </div>
            )}
            
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <p className="text-sm text-gray-600 mb-2">推奨受験日</p>
              <p className="text-lg font-semibold">{examDate?.toLocaleDateString("ja-JP")}</p>
              <p className="text-xs text-gray-500 mt-2">
                （{estimatedDailyStudyHours}時間/日の勉強で合格可能な日程）
              </p>
            </div>
            <ExamDatePicker
              value={examDate}
              onChange={setExamDate}
            />
          </div>
        )}

        <DialogFooter>
          {step > 1 && (
            <Button variant="outline" onClick={back} disabled={loading}>
              戻る
            </Button>
          )}
          {step === 1 && (
            <Button onClick={next} disabled={!examName}>
              次へ
            </Button>
          )}
          {step === 2 && !examInfo && (
            <Button onClick={fetchExamInfo} disabled={!estimatedDailyStudyHours || loading}>
              {loading ? "分析中..." : "次へ"}
            </Button>
          )}
          {step === 2 && examInfo && (
            <Button onClick={next}>
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
