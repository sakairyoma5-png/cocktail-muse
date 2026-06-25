"use client";

import { Button } from "@/components/ui/button";

interface QuickTag {
  label: string;
  mood: string;
  scene: string;
}

const QUICK_TAGS: QuickTag[] = [
  { label: "#映え", mood: "インスタ映えする見た目重視", scene: "ホームパーティー" },
  { label: "#簡単", mood: "手軽にサッと作りたい", scene: "一人飲み" },
  { label: "#ノンアル", mood: "飲めなくてもおしゃれに", scene: "女子会" },
  { label: "#大人の夜", mood: "シックで大人な気分", scene: "デート" },
  { label: "#パーティー", mood: "みんなで盛り上がりたい", scene: "パーティー" },
];

interface QuickTagsProps {
  onSelect: (mood: string, scene: string) => void;
  disabled: boolean;
}

export function QuickTags({ onSelect, disabled }: QuickTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {QUICK_TAGS.map((tag) => (
        <Button
          key={tag.label}
          variant="outline"
          size="sm"
          onClick={() => onSelect(tag.mood, tag.scene)}
          disabled={disabled}
        >
          {tag.label}
        </Button>
      ))}
    </div>
  );
}