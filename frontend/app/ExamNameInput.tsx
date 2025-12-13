"use client";

import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ExamNameInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);

  const examOptions = [
    "基本情報技術者試験",
    "応用情報技術者試験",
    "ITパスポート",
    "簿記3級",
    "簿記2級",
    "公認会計士試験",
    "TOEIC L&R",
    "AWS Cloud Practitioner",
  ];

  const filtered = examOptions.filter((exam) =>
    exam.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Command shouldFilter={false}>   
                <CommandInput 
                    value={inputValue} 
                    onValueChange={
                        (v) => {
                            setInputValue(v);
                            onChange(v);
                            setOpen(true);
                        }} placeholder="資格名" />
            </Command>
        </PopoverTrigger>

        <PopoverContent 
            className="p-0 w-[300px]"
            onOpenAutoFocus={(e) => e.preventDefault()}>
          <Command shouldFilter={false}>
            <CommandList>
              <CommandGroup>
                {filtered.map((exam) => (
                  <CommandItem
                    key={exam}
                    // 入力された文字で Command 側のフィルタが暴走しないように
                    value={exam}
                    onSelect={() => {
                      setInputValue(exam);
                      onChange(exam);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    {exam}
                  </CommandItem>
                ))}

                {filtered.length === 0 && (
                  <div className="p-2 text-sm text-gray-400">
                    該当する資格がありません
                  </div>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
