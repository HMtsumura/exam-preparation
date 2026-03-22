import os
from openai import OpenAI
import json
from datetime import datetime, timedelta

class ExamAnalyzer:
    def __init__(self):
        """Initialize OpenAI client"""
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY environment variable is not set")
        self.client = OpenAI(api_key=api_key)

    def analyze_exam(self, exam_name: str, daily_study_hours: float) -> dict:
        """
        試験情報を分析してOpenAI APIから取得
        
        Args:
            exam_name: 試験名
            daily_study_hours: 1日の学習時間
        
        Returns:
            dict: 分析結果（必要勉強時間、平均勉強時間、試験日、次回試験日など）
        """
        try:
            # 現在の年を取得
            current_year = datetime.now().year
            current_month = datetime.now().month
            
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "user",
                        "content": f"""以下の情報について、JSON形式で返してください。

試験名: {exam_name}
1日の学習時間: {daily_study_hours}時間
現在の日付: {datetime.now().strftime('%Y年%m月%d日')}

以下の情報を調べて、JSON形式で返してください：
1. requiredStudyHours: この試験に合格するのに必要な勉強時間（時間単位の整数）
2. actualStudyHours: この試験に合格した人たちの平均勉強時間（時間単位の整数）
3. examDateInfo: この試験の実施日パターン（例：「毎年7月と12月の第1日曜日」または「通年随時（毎日実施）」）
4. examDates: 今後の試験日リスト（YYYY-MM-DD形式）。通年随時の場合は今後30日分、定期試験の場合は最低3つの試験日を{current_year}年と{current_year + 1}年から。

重要：
- 毎日受験可能な試験の場合は、examDateInfoに「通年随時」または「毎日実施」と明記してください
- examDatesには実際の試験開催日のみを記載してください。毎日実施の場合は30日分の連続日付を記載してください

返すフォーマット：
{{
  "requiredStudyHours": 数字,
  "actualStudyHours": 数字,
  "examDateInfo": "試験日の説明",
  "examDates": ["YYYY-MM-DD", "YYYY-MM-DD", "YYYY-MM-DD"]
}}

JSONのみを返してください。他のテキストは含めないでください。"""
                    }
                ],
                temperature=0.7,
                max_tokens=500,
            )

            content = response.choices[0].message.content
            
            # JSONを抽出
            json_match = content.strip()
            if json_match.startswith("```json"):
                json_match = json_match[7:]
            if json_match.startswith("```"):
                json_match = json_match[3:]
            if json_match.endswith("```"):
                json_match = json_match[:-3]
            
            exam_data = json.loads(json_match.strip())

            # 受験に必要な日数を計算
            required_hours = exam_data["requiredStudyHours"]
            required_days = max(1, int(required_hours / daily_study_hours))
            calculated_exam_date = datetime.now() + timedelta(days=required_days)

            # 複数の試験日候補から最適な日付を選択
            exam_dates = [datetime.strptime(date, "%Y-%m-%d") for date in exam_data["examDates"]]
            exam_dates.sort()
            
            # calculated_exam_date以降で最も近い試験日を探す
            suitable_exam_dates = [d for d in exam_dates if d >= calculated_exam_date]
            
            if suitable_exam_dates:
                # 計算日付以降で最も近い試験日
                exam_date = suitable_exam_dates[0]
            else:
                # 計算日付より前の場合は、試験日リストの最後の日付を使用
                # （余裕をもって準備できる）
                exam_date = exam_dates[-1] if exam_dates else calculated_exam_date

            return {
                "requiredStudyHours": exam_data["requiredStudyHours"],
                "actualStudyHours": exam_data["actualStudyHours"],
                "examDateInfo": exam_data["examDateInfo"],
                "examDate": exam_date.strftime("%Y-%m-%dT00:00:00.000Z")
            }
        except json.JSONDecodeError as e:
            raise ValueError(f"JSONパースエラー: {str(e)}")
        except Exception as e:
            raise ValueError(f"試験分析エラー: {str(e)}")
