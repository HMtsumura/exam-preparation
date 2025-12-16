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
import { EXAM_MASTERS } from "@/data/exams";

export function ExamNameInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);

  const filtered = React.useMemo(() => {
    if (!inputValue) return EXAM_MASTERS;

    const keyword = inputValue.toLowerCase();

    return EXAM_MASTERS.filter((exam) => {
      if (exam.name.toLowerCase().includes(keyword)) return true;
      if (exam.aliases?.some((a) => a.toLowerCase().includes(keyword))) {
        return true;
      }
      return false;
    });
  }, [inputValue]);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Command shouldFilter={false}>
            <CommandInput
              value={inputValue}
              onValueChange={(v) => {
                setInputValue(v);
                onChange(v);
                setOpen(true);
              }}
              placeholder="資格名"
            />
          </Command>
        </PopoverTrigger>

        <PopoverContent
          className="p-0 w-[300px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <Command shouldFilter={false}>
            <CommandList>
              <CommandGroup>
                {filtered.map((exam) => (
                  <CommandItem
                    key={exam.name}
                    // 入力された文字で Command 側のフィルタが暴走しないように
                    value={exam.name}
                    onSelect={() => {
                      setInputValue(exam.name);
                      onChange(exam.name);
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    {exam.name}
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
