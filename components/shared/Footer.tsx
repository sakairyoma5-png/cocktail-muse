export function Footer() {
  return (
    <footer className="border-t py-12 mt-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 text-center">
        <div className="text-3xl mb-4">🍸</div>
        <p className="text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Cocktail Muse
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Cocktails for your mood, your moment, your muse.
        </p>
        <div className="mt-6 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Cocktail Muse. All rights reserved.</p>
          <p className="mt-1">Made with 🥂 for cocktail lovers everywhere.</p>
        </div>
      </div>
    </footer>
  );
}