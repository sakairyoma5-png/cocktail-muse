import type { CocktailImage } from "@/types/cocktail";

interface UnsplashPhoto {
  urls: { regular: string };
  user: { name: string; links: { html: string } };
  links: { html: string };
}

export async function searchImages(
  keyword: string,
  perPage: number = 3
): Promise<CocktailImage[]> {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&per_page=${perPage}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.status}`);
  }

  const data = await response.json();
  return data.results.map((photo: UnsplashPhoto) => ({
    url: photo.urls.regular,
    photographer: photo.user.name,
    unsplashUrl: photo.links.html,
  }));
}