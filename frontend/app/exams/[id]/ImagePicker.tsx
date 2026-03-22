"use client";

import { useState } from "react";

interface ImagePickerProps {
  onChange: (files: File[]) => void;
  imageUrls?: string[] | null; // 複数の既存画像 URL
  multiple?: boolean; // 複数選択対応
}



export default function ImagePicker({ onChange, imageUrls, multiple = false }: ImagePickerProps) {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    onChange(files);
    // inputをリセットして、同じファイルを再度選択できるようにする
    e.target.value = "";
  };

  return (
    <div className="flex flex-col items-center w-full">
      {multiple ? (
        // 複数選択モード
        <div className="w-full">
          <label htmlFor="file-input-multiple" className="block cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition">
              <div className="text-gray-500">
                <p className="font-semibold">クリックして画像を選択</p>
                <p className="text-sm">(複数選択可)</p>
              </div>
            </div>
            <input
              type="file"
              accept="image/*,.heic,.heif"
              multiple
              className="hidden"
              id="file-input-multiple"
              onChange={handleFileSelect}
            />
          </label>
          {imageUrls && imageUrls.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2 w-full">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="relative">
                  <img src={url} className="w-full h-24 object-cover rounded" alt={`画像${idx + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // 単一選択モード
        <div className="relative group">
          <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
            {imageUrls && imageUrls[0] ? (
              <img src={imageUrls[0]} className="object-cover w-full h-full" alt="書籍表紙" />
            ) : (
              <div className="text-gray-500">画像を追加</div>
            )}
          </div>

          {/* ホバーで表示される変更ボタン */}
          <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition" htmlFor="file-input-single">
            <span className="text-white text-sm">変更</span>
          </label>
          <input
            type="file"
            accept="image/*,.heic,.heif"
            className="hidden"
            id="file-input-single"
            onChange={handleFileSelect}
          />

          {imageUrls && imageUrls[0] && (
            <button
              onClick={() => onChange([])}
              className="absolute -right-2 -bottom-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center shadow"
            >
              ×
            </button>
          )}
        </div>
      )}

      <p className="text-xs text-gray-500 mt-2">
        {multiple ? "複数の画像を選択できます" : "クリックして画像を変更できます"}
      </p>
    </div>
  );
}
