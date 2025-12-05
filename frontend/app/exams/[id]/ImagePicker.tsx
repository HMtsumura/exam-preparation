"use client";

import { useState } from "react";

export default function ImagePicker({
  imageUrl,
  onChange,
}: {
  imageUrl: string;
  onChange: (value: string) => void;
}) {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <img src={imageUrl} className="object-cover w-full h-full" />
          ) : (
            <div className="text-gray-500">画像を追加</div>
          )}
        </div>

        {/* ホバーで表示される変更ボタン */}
        <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition">
          <span className="text-white text-sm">変更</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
        </label>

        {imageUrl && (
          <button
            onClick={() => onChange("")}
            className="absolute -right-2 -bottom-2 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center shadow"
          >
            ×
          </button>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-2">クリックして画像を変更できます</p>
    </div>
  );
}
