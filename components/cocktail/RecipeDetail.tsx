"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Music, Camera, Clock, Star, History, Lightbulb } from "lucide-react";
import Image from "next/image";
import type { CocktailSuggestion } from "@/types/cocktail";

interface RecipeDetailProps {
  cocktail: CocktailSuggestion | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecipeDetail({ cocktail, open, onOpenChange }: RecipeDetailProps) {
  if (!cocktail) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{cocktail.name}</DialogTitle>
          <DialogDescription>{cocktail.nameEn}</DialogDescription>
        </DialogHeader>

        {cocktail.images && cocktail.images.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {cocktail.images.slice(0, 3).map((img, i) => (
              <div key={i} className="relative h-32 rounded-lg overflow-hidden">
                <Image
                  src={img.url}
                  alt={`${cocktail.name} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            <Star className="h-3 w-3 mr-1" />
            マッチ度 {cocktail.matchScore}/5
          </Badge>
          <Badge variant="secondary">
            <Camera className="h-3 w-3 mr-1" />
            映え度 {cocktail.photoScore}/5
          </Badge>
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            {cocktail.time}
          </Badge>
        </div>

        <Separator />

        <div>
          <h4 className="font-semibold mb-2">📝 材料</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {cocktail.recipe.ingredients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">👨‍🍳 作り方</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            {cocktail.recipe.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        {cocktail.recipe.tips && (
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm flex items-start gap-2">
              <Lightbulb className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{cocktail.recipe.tips}</span>
            </p>
          </div>
        )}

        <Separator />

        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <History className="h-4 w-4" />
            歴史・豆知識
          </h4>
          <p className="text-sm text-muted-foreground">{cocktail.history}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Music className="h-4 w-4" />
            おすすめ音楽
          </h4>
          <p className="text-sm">{cocktail.pairingMusic}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Camera className="h-4 w-4" />
            撮影アドバイス
          </h4>
          <p className="text-sm text-muted-foreground">{cocktail.photoAdvice}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}