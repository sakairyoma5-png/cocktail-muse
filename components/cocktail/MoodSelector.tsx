"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

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
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              今の気分 <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="例: 疲れたけどおしゃれしたい"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">
              シチュエーション <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="例: ホームパーティー"
              value={scene}
              onChange={(e) => setScene(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">
              自宅にある材料（任意）
            </label>
            <Textarea
              placeholder="例: ジン, レモン, 砂糖（カンマ区切り）"
              value={inventory}
              onChange={(e) => setInventory(e.target.value)}
              disabled={isLoading}
              rows={2}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading || !mood || !scene}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                提案中...
              </>
            ) : (
              "カクテルを提案してもらう 🍸"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}