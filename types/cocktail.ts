export interface CocktailRecipe {
  ingredients: string[];
  steps: string[];
  tips: string;
}

export interface CocktailImage {
  url: string;
  photographer: string;
  unsplashUrl: string;
}

export interface CocktailSuggestion {
  id: string;
  name: string;
  nameEn: string;
  matchScore: number;
  photoScore: number;
  time: string;
  recipe: CocktailRecipe;
  history: string;
  searchKeyword: string;
  images: CocktailImage[];
  pairingMusic: string;
  photoAdvice: string;
}

export interface RecommendRequest {
  mood: string;
  scene: string;
  inventory?: string[];
}

export interface RecommendResponse {
  suggestions: CocktailSuggestion[];
}

export interface FavoriteCocktail {
  id: string;
  user_id: string;
  cocktail_name: string;
  recipe: CocktailSuggestion;
  created_at: string;
}