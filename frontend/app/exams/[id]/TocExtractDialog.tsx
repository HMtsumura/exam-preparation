"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ImagePicker from "./ImagePicker";

type TocItem = {
  chapter_number: string;
  title: string;
  page_number: number;
};

type TocData = {
  status: string;
  data: {
    status: string;
    title: string;
    items: TocItem[];
    total_items: number;
  };
};

export default function TocExtractDialog({
  open,
  onOpenChange,
  bookId,
  onImported,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookId: number;
  onImported: () => void;
}) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tocData, setTocData] = useState<TocData | null>(null);
  const [editedItems, setEditedItems] = useState<TocItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<boolean[]>([]);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"upload" | "preview">("upload"); // upload or preview

  // ダイアログが閉じられた時にリセット
  useEffect(() => {
    if (!open) {
      setImageFile(null);
      setImageUrl("");
      setTocData(null);
      setEditedItems([]);
      setSelectedItems([]);
      setError("");
      setProgress(0);
      setLoading(false);
      setStep("upload");
    }
  }, [open]);

  async function extractToc() {
    if (!imageFile) {
      setError("画像を選択してください");
      return;
    }

    setLoading(true);
    setProgress(0);
    setError("");
    setTocData(null);
    setStep("preview"); // プレビューステップに移動 (ローディングUI を表示するため)

    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      // Simulate progress: 30% when sending request
      setProgress(30);

      const res = await fetch("http://localhost:8080/api/books/extract-toc", {
        method: "POST",
        body: formData,
      });

      // 70% when response received
      setProgress(70);

      if (!res.ok) {
        throw new Error("目次の抽出に失敗しました");
      }

      const data: TocData = await res.json();
      
      // 100% when data processed
      setProgress(100);
      
      setTocData(data);

      // 編集用のアイテムを初期化
      setEditedItems(data.data.items);

      // 最初はすべての章を選択状態にする
      setSelectedItems(new Array(data.data.items.length).fill(true));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "予期しないエラーが発生しました"
      );
    } finally {
      setLoading(false);
      // Don't reset progress immediately so user can see 100%
      setTimeout(() => setProgress(0), 500);
    }
  }

  async function handleImport() {
    // 編集済みのアイテムから選択されたものをフィルタリング
    const selectedChapters = editedItems.filter(
      (_: TocItem, index: number) => index < selectedItems.length && selectedItems[index]
    );

    // 選択された章をインポート
    try {
      const res = await fetch("http://localhost:8080/api/chapters/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId,
          chapters: selectedChapters,
        }),
      });

      if (!res.ok) {
        throw new Error("章のインポートに失敗しました");
      }

      onOpenChange(false);
      onImported();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "章のインポートに失敗しました"
      );
    }
  }

  const toggleItemSelection = (index: number) => {
    const newSelected = [...selectedItems];
    newSelected[index] = !newSelected[index];
    setSelectedItems(newSelected);
  };

  const toggleAllSelection = () => {
    const allSelected = selectedItems.every((item: boolean) => item);
    setSelectedItems(new Array(selectedItems.length).fill(!allSelected));
  };

  const addNewItem = () => {
    const newItem: TocItem = {
      chapter_number: "",
      title: "新規章",
      page_number: 0,
    };
    setEditedItems([...editedItems, newItem]);
    setSelectedItems([...selectedItems, true]); // 新しい項目は自動的に選択
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-96 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === "upload" ? "目次ページを指定して抽出" : "目次を確認してインポート"}
          </DialogTitle>
        </DialogHeader>

        {step === "upload" && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <p className="text-sm text-gray-600">
                目次が掲載されているページの画像を選択してください
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-4 text-red-800">
                {error}
              </div>
            )}

            <div className="flex justify-center">
              <ImagePicker
                imageUrl={imageUrl}
                onChange={(file) => {
                  if (file) {
                    setImageUrl(URL.createObjectURL(file));
                    setImageFile(file);
                    setError("");
                  } else {
                    setImageUrl("");
                    setImageFile(null);
                  }
                }}
              />
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                キャンセル
              </Button>
              <Button
                onClick={extractToc}
                disabled={!imageFile || loading}
              >
                {loading ? "抽出中..." : "目次を抽出"}
              </Button>
            </div>
          </div>
        )}

        {step === "preview" && (
          <>
            {loading && (
              <div className="flex flex-col justify-center items-center py-12 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <div className="text-center">
                  <p className="text-gray-600 mb-2">目次を抽出中...</p>
                  <div className="flex items-center gap-2">
                    <Progress value={progress} className="w-48 h-2" />
                    <span className="text-sm font-medium text-gray-700 w-12 text-right">{progress}%</span>
                  </div>
                </div>
              </div>
            )}

            {!loading && error && (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded p-4 text-red-800">
                  {error}
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    onClick={() => {
                      setError("");
                      setStep("upload");
                    }}
                    variant="outline"
                  >
                    戻る
                  </Button>
                </div>
              </div>
            )}

            {!loading && tocData && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-sm text-gray-600">
                    <strong>{editedItems.length}</strong> 個の章があります
                  </p>
                </div>

                {/* 全選択/全非選択ボタン */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={toggleAllSelection}
                  >
                    {selectedItems.every((item: boolean) => item)
                      ? "すべて非選択"
                      : "すべて選択"}
                  </Button>
                  <span className="text-sm text-gray-600 self-center">
                    {selectedItems.filter((item: boolean) => item).length} / {selectedItems.length} 選択
                  </span>
                  <div className="flex-1"></div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={addNewItem}
                  >
                    + 章を追加
                  </Button>
                </div>

                {/* 目次リスト */}
                <div className="space-y-2 max-h-96 overflow-y-auto border rounded p-4 bg-gray-50">
                  {editedItems.map((item: TocItem, index: number) => (
                    <Card
                      key={index}
                      className="cursor-pointer hover:bg-blue-50 transition"
                    >
                      <CardContent className="p-3 flex gap-3 items-start">
                        <input
                          type="checkbox"
                          checked={selectedItems[index] || false}
                          onChange={() => toggleItemSelection(index)}
                          className="w-5 h-5 mt-1 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={item.chapter_number}
                              onChange={(e: any) => {
                                const newItems = [...editedItems];
                                newItems[index].chapter_number = e.target.value;
                                setEditedItems(newItems);
                              }}
                              placeholder="章番号"
                              className="w-20 px-2 py-1 text-sm border rounded bg-white"
                              onClick={(e: any) => e.stopPropagation()}
                            />
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e: any) => {
                                const newItems = [...editedItems];
                                newItems[index].title = e.target.value;
                                setEditedItems(newItems);
                              }}
                              placeholder="タイトル"
                              className="flex-1 px-2 py-1 text-sm border rounded bg-white"
                              onClick={(e: any) => e.stopPropagation()}
                            />
                            <input
                              type="number"
                              value={item.page_number}
                              onChange={(e: any) => {
                                const newItems = [...editedItems];
                                newItems[index].page_number = parseInt(e.target.value) || 0;
                                setEditedItems(newItems);
                              }}
                              placeholder="ページ"
                              className="w-20 px-2 py-1 text-sm border rounded bg-white"
                              onClick={(e: any) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                        <button
                          onClick={(e: any) => {
                            e.stopPropagation();
                            // アイテムを削除
                            const newItems = editedItems.filter((_: TocItem, i: number) => i !== index);
                            const newSelected = selectedItems.filter((_: boolean, i: number) => i !== index);
                            setEditedItems(newItems);
                            setSelectedItems(newSelected);
                          }}
                          className="text-red-500 hover:text-red-700 text-sm font-semibold flex-shrink-0"
                        >
                          削除
                        </button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* アクション */}
                <div className="flex gap-2 justify-end pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep("upload")}
                  >
                    戻る
                  </Button>
                  <Button
                    onClick={handleImport}
                    disabled={selectedItems.filter((item: boolean) => item).length === 0}
                  >
                    {selectedItems.filter((item: boolean) => item).length} 個を登録
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
