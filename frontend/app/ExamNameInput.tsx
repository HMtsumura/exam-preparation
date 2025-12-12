"use client";

import * as React from "react";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          value={inputValue}
          placeholder="資格名を入力..."
          onChange={(e) => {
            setInputValue(e.target.value);
            setOpen(true);
            onChange(e.target.value);
          }}
        />
      </PopoverTrigger>

      {open && (
        <PopoverContent className="p-0 w-[300px]">
          <Command>
            <CommandList>
              <CommandGroup>
                {filtered.map((exam) => (
                  <CommandItem
                    key={exam}
                    onSelect={() => {
                      setInputValue(exam);
                      onChange(exam);
                      setOpen(false);
                    }}
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
      )}
    </Popover>
  );
}
