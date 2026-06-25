"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Music, Camera, Clock, Star } from "lucide-react";
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
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {cocktail.images?.[0] && (
        <div className="relative h-48 w-full">
          <Image
            src={cocktail.images[0].url}
            alt={cocktail.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold">{cocktail.name}</h3>
            <p className="text-sm text-muted-foreground">{cocktail.nameEn}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleFavorite(cocktail)}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorited ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
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
          <Badge variant="outline">
            <Music className="h-3 w-3 mr-1" />
            {cocktail.pairingMusic}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {cocktail.history}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant="default"
          className="w-full"
          onClick={() => onShowDetail(cocktail)}
        >
          詳細を見る
        </Button>
      </CardFooter>
    </Card>
  );
}