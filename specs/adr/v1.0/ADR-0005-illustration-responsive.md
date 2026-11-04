# ADR-0005 : Illustration responsive avec `<picture>`

## Statut
Accepté (2026-11-04)

## Contexte
FM fournit trois illustrations de compositions différentes : mobile (375 × 284), tablette (528 × 360) et desktop (400 × 593). Les points de rupture validés sont 640 px (tablette) et 1024 px (desktop). L'illustration est décorative.

## Décision
- Un `<picture>` avec deux `<source media>` (`min-width: 64rem` → desktop, `min-width: 40rem` → tablette) et un `<img>` mobile par défaut, `alt=""`, avec `width`/`height` pour réserver la place.
- Les SVG sont utilisés tels quels (coins arrondis déjà dans les fichiers) ; le CSS ne fait que les dimensionner.
- Dans le HTML, l'illustration est placée **avant** le texte (ordre visuel mobile et tablette) ; en desktop, la carte passe en `flex-row-reverse` pour la mettre à droite. L'ordre de lecture reste correct puisque l'image est ignorée par les lecteurs d'écran.

## Conséquences
- Un seul fichier téléchargé selon la largeur.
- Les points de rupture vivent à deux endroits (`media` du `<picture>` et variantes `sm:` / `lg:` de Tailwind) : ils doivent rester alignés (40rem / 64rem, valeurs par défaut de Tailwind).
