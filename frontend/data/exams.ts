export type ExamMaster = {
  id: string
  name: string
  category: string
  aliases?: string[]
}

export const EXAM_MASTERS: ExamMaster[] = [
  /* =====================
   * IT・情報系（国家資格）
   * ===================== */
  { id: "it_passport", name: "ITパスポート試験", category: "IT", aliases: ["IP"] },
  { id: "fe", name: "基本情報技術者試験", category: "IT", aliases: ["FE", "基本情報"] },
  { id: "ap", name: "応用情報技術者試験", category: "IT", aliases: ["AP", "応用情報"] },
  { id: "sc", name: "情報処理安全確保支援士試験", category: "IT", aliases: ["SC", "情報セキュリティ"] },

  { id: "pm", name: "プロジェクトマネージャ試験", category: "IT" },
  { id: "st", name: "ITストラテジスト試験", category: "IT" },
  { id: "sa", name: "システムアーキテクト試験", category: "IT" },
  { id: "db", name: "データベーススペシャリスト試験", category: "IT" },
  { id: "nw", name: "ネットワークスペシャリスト試験", category: "IT" },
  { id: "es", name: "エンベデッドシステムスペシャリスト試験", category: "IT" },
  { id: "sm", name: "ITサービスマネージャ試験", category: "IT" },
  { id: "au", name: "システム監査技術者試験", category: "IT" },

  /* =====================
   * AWS / クラウド
   * ===================== */
  { id: "aws_cp", name: "AWS Certified Cloud Practitioner", category: "Cloud", aliases: ["AWS CP"] },
  { id: "aws_saa", name: "AWS Certified Solutions Architect – Associate", category: "Cloud", aliases: ["SAA"] },
  { id: "aws_soa", name: "AWS Certified SysOps Administrator – Associate", category: "Cloud" },
  { id: "aws_dva", name: "AWS Certified Developer – Associate", category: "Cloud" },
  { id: "aws_sap", name: "AWS Certified Solutions Architect – Professional", category: "Cloud" },

  { id: "azure_fund", name: "Microsoft Azure Fundamentals", category: "Cloud" },
  { id: "azure_admin", name: "Azure Administrator Associate", category: "Cloud" },
  { id: "gcp_ace", name: "Google Associate Cloud Engineer", category: "Cloud" },

  /* =====================
   * ネットワーク / ベンダー
   * ===================== */
  { id: "ccna", name: "Cisco CCNA", category: "Network" },
  { id: "ccnp", name: "Cisco CCNP", category: "Network" },
  { id: "lpci1", name: "LPIC Level 1", category: "Linux" },
  { id: "lpci2", name: "LPIC Level 2", category: "Linux" },
  { id: "rhce", name: "Red Hat Certified Engineer (RHCE)", category: "Linux" },

  /* =====================
   * データ・AI
   * ===================== */
  { id: "gtest", name: "G検定", category: "AI" },
  { id: "etest", name: "E資格", category: "AI" },
  { id: "ds", name: "データサイエンティスト検定", category: "Data" },
  { id: "python_basic", name: "Pythonエンジニア認定基礎試験", category: "Programming" },
  { id: "python_data", name: "Pythonエンジニア認定データ分析試験", category: "Programming" },

  /* =====================
   * 会計・ビジネス
   * ===================== */
  { id: "boki3", name: "日商簿記3級", category: "Accounting" },
  { id: "boki2", name: "日商簿記2級", category: "Accounting" },
  { id: "boki1", name: "日商簿記1級", category: "Accounting" },
  { id: "fp3", name: "FP技能士3級", category: "Finance" },
  { id: "fp2", name: "FP技能士2級", category: "Finance" },
  { id: "fp1", name: "FP技能士1級", category: "Finance" },
  { id: "cpa", name: "公認会計士試験", category: "Accounting" },
  { id: "tax", name: "税理士試験", category: "Accounting" },
  { id: "sme", name: "中小企業診断士試験", category: "Business" },

  /* =====================
   * 法律・不動産
   * ===================== */
  { id: "gyosei", name: "行政書士試験", category: "Law" },
  { id: "shoshi", name: "司法書士試験", category: "Law" },
  { id: "sharoshi", name: "社会保険労務士試験", category: "Law" },
  { id: "takken", name: "宅地建物取引士試験", category: "RealEstate", aliases: ["宅建"] },
  { id: "kanrishi", name: "マンション管理士試験", category: "RealEstate" },

  /* =====================
   * 英語・語学
   * ===================== */
  { id: "toeic", name: "TOEIC L&R", category: "Language" },
  { id: "toefl", name: "TOEFL iBT", category: "Language" },
  { id: "ielts", name: "IELTS", category: "Language" },
  { id: "eiken1", name: "英検1級", category: "Language" },
  { id: "eiken2", name: "英検準1級", category: "Language" },
  { id: "eiken3", name: "英検2級", category: "Language" },

  /* =====================
   * その他専門職
   * ===================== */
  { id: "care_manager", name: "介護支援専門員試験", category: "Medical" },
  { id: "nurse", name: "看護師国家試験", category: "Medical" },
  { id: "pharmacist", name: "薬剤師国家試験", category: "Medical" },
  { id: "teacher", name: "教員採用試験", category: "Education" },
  { id: "hoiku", name: "保育士試験", category: "Education" },
]
