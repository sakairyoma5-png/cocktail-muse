"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Wand2 } from "lucide-react";

interface MoodSelectorProps {
  onRecommend: (mood: string, scene: string, inventory: string) => void;
  isLoading: boolean;
}

export function MoodSelector({ onRecommend, isLoading }: MoodSelectorProps) {
  const [mood, setMood] = useState("");
  const [scene, setScene] = useState("");
  const [inventory, setInventory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood || !scene) return;
    onRecommend(mood, scene, inventory);
  };

  return (
    <Card className="border shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <span className="text-lg">🤔</span>
              今の気分 <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="例: 疲れたけどおしゃれしたい"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              disabled={isLoading}
              className="transition-all focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <span className="text-lg">📍</span>
              シチュエーション <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="例: ホームパーティー"
              value={scene}
              onChange={(e) => setScene(e.target.value)}
              disabled={isLoading}
              className="transition-all focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <span className="text-lg">🧊</span>
              自宅にある材料
              <span className="text-xs text-muted-foreground font-normal">（任意）</span>
            </label>
            <Textarea
              placeholder="例: ジン, レモン, 砂糖（カンマ区切り）"
              value={inventory}
              onChange={(e) => setInventory(e.target.value)}
              disabled={isLoading}
              rows={2}
              className="transition-all focus:ring-2 focus:ring-amber-500/20 resize-none"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 text-base"
            disabled={isLoading || !mood || !scene}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                提案中...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-5 w-5" />
                カクテルを提案してもらう 🍸
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}