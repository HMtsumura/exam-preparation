export default function ExamPaceStatus({
  examDate,
  totalStudyMinutes,
  estimatedDailyStudyHours,
  estimatedStudyHours,
}: {
  examDate: Date;
  totalStudyMinutes: number;
  estimatedDailyStudyHours: number;
  estimatedStudyHours: number;
}) {
  const { status, message } = evaluatePace({
    examDate,
    totalStudyMinutes,
    estimatedDailyStudyHours,
    estimatedStudyHours,
  });

  type PaceStatus = "good" | "warning" | "danger";

  function evaluatePace({
    examDate,
    totalStudyMinutes,
    estimatedDailyStudyHours,
    dailyAvailableMinutes,
    // TODO: create TYPE
  }: any): {
    status: PaceStatus;
    message: string;
  } {
    const daysLeft = daysUntil(examDate);

    if (daysLeft <= 0) {
      return {
        status: "danger",
        message: "試験日を過ぎています",
      };
    }

    const possibleMinutes = daysLeft * dailyAvailableMinutes;
    const ratio = totalStudyMinutes / possibleMinutes;

    if (ratio >= 0.8) {
      return {
        status: "good",
        message: "このまま続ければ試験日までに間に合いそうです",
      };
    }

    if (ratio >= 0.5) {
      return {
        status: "warning",
        message: "今週あと30分学習できると理想ペースに戻ります",
      };
    }

    return {
      status: "danger",
      message: "今週は学習日を1日増やすのがおすすめです",
    };
  }

  const config = {
    good: {
      icon: "🟢",
      title: "良いペースです",
      className: "border-green-300 bg-green-50 text-green-800",
    },
    warning: {
      icon: "🟡",
      title: "少し遅れ気味です",
      className: "border-yellow-300 bg-yellow-50 text-yellow-800",
    },
    danger: {
      icon: "🔴",
      title: "遅れています",
      className: "border-red-300 bg-red-50 text-red-800",
    },
  }[status];

  return (
    <div className={`rounded border p-4 ${config.className}`}>
      <div className="flex items-center gap-2 font-semibold">
        <span>{config.icon}</span>
        <span>{config.title}</span>
      </div>

      <p className="mt-2 text-sm">{message}</p>
    </div>
  );
}
function daysUntil(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const diff = Math.ceil(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return diff;
}
