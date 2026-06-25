"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Music, Camera, Clock, Sparkles } from "lucide-react";
import type { CocktailSuggestion } from "@/types/cocktail";

interface CocktailCardProps {
  cocktail: CocktailSuggestion;
  onShowDetail: (cocktail: CocktailSuggestion) => void;
  onToggleFavorite: (cocktail: CocktailSuggestion) => void;
  isFavorited: boolean;
}

export function CocktailCard({
  cocktail,
  onShowDetail,
  onToggleFavorite,
  isFavorited,
}: CocktailCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border hover:border-amber-200/50 dark:hover:border-amber-800/50 bg-card/80 backdrop-blur-sm">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        {cocktail.images?.[0] ? (
          <Image
            src={cocktail.images[0].url}
            alt={cocktail.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900 dark:to-orange-900 flex items-center justify-center text-5xl">
            🍸
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Match score badge */}
        <div className="absolute top-2 right-2">
          <Badge className="bg-amber-500/90 text-white border-0 shadow-lg">
            <Sparkles className="h-3 w-3 mr-1" />
            マッチ {cocktail.matchScore}/5
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold truncate">{cocktail.name}</h3>
            <p className="text-sm text-muted-foreground truncate">{cocktail.nameEn}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(cocktail);
            }}
            className="shrink-0 ml-2 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <Heart
              className={`h-5 w-5 transition-all ${
                isFavorited
                  ? "fill-red-500 text-red-500 scale-110"
                  : "text-muted-foreground group-hover:text-red-400"
              }`}
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-2 space-y-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="text-xs">
            <Camera className="h-3 w-3 mr-1" />
            映え度 {cocktail.photoScore}/5
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            {cocktail.time}
          </Badge>
        </div>

        {/* Music pairing */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Music className="h-3 w-3" />
          <span className="truncate">{cocktail.pairingMusic}</span>
        </div>

        {/* History */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {cocktail.history}
        </p>
      </CardContent>

      <CardFooter>
        <Button
          variant="default"
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-300"
          onClick={() => onShowDetail(cocktail)}
        >
          詳細を見る
        </Button>
      </CardFooter>
    </Card>
  );
}