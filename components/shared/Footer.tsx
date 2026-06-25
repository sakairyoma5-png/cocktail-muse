export function Footer() {
  return (
    <footer className="border-t py-8 mt-16">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>🍸 Cocktail Muse — Cocktails for your mood, your moment, your muse.</p>
        <p className="mt-2">
          &copy; {new Date().getFullYear()} Cocktail Muse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}