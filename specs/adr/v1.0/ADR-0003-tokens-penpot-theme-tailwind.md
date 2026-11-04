# ADR-0003 : Tokens Penpot → thème Tailwind (`@theme`)

## Statut
Accepté (2026-11-04)

## Contexte
La maquette Penpot (validée G3) définit un jeu de tokens « newsletter » : couleurs FM et dérivées, tailles de texte, espacements, rayons. La spec impose que les écarts avec le design viennent de ces valeurs et pas de valeurs écrites à la main. Décisions communes : ADR-0001, ADR-0002 (dans `frontmentor/specs/adr/`).

## Décision
- `src/style.css` déclare les tokens dans `@theme` et **vide la palette par défaut** de Tailwind (`--color-*: initial`) : seules nos couleurs existent comme utilitaires (`bg-blue-800`, `text-red-text`, `border-grey/50`…).
- Correspondance :

| Penpot | `@theme` |
|---|---|
| `color.red`, `red-text`, `blue-800`, `blue-700`, `grey`, `white` | `--color-red`, `--color-red-text`, `--color-blue-800`, `--color-blue-700`, `--color-grey`, `--color-white` (valeurs `hsl()` du style-guide) |
| `color.gradient-start` / `gradient-end` | `--color-gradient-start` / `--color-gradient-end` |
| `font.family` | `--font-sans: "Roboto"` (+ `@font-face` sur les fichiers locaux 400 et 700) |
| `font.size.title-desktop` / `title-mobile` | `--text-title` (56 px, interligne 1) / `--text-title-mobile` (40 px, interligne 1) |
| `font.size.label` | utilitaire `text-xs` (12 px) avec interligne 1,5 |
| `radius.control` / `illustration` / `card` | `--radius-control` (8) / `--radius-illustration` (16) / `--radius-card` (36) |
| ombres de la maquette | `--shadow-card`, `--shadow-button` |
| `space.*` | échelle Tailwind (`--spacing: 4px` : `6` = 24, `10` = 40, `16` = 64…) |

- Les opacités dérivées (Red 15 %, Grey 50 %, Blue 800 50 %) passent par la syntaxe `/15`, `/50` de Tailwind, pas par de nouvelles couleurs.

## Conséquences
- Changer une couleur du design = changer une ligne de `@theme`.
- Fitness function : aucune couleur (`#…`, `rgb(`, `hsl(`) dans `index.html`, `src/main.js`, ni dans `src/style.css` hors du bloc `@theme`.
- Les classes Tailwind de couleurs par défaut (`text-gray-500`…) ne compilent plus : une faute de frappe se voit tout de suite.
- (v1.0.1, retour FM R1) Un groupe d'utilitaires répété sur plusieurs éléments devient un utilitaire nommé dans `src/style.css` (`@utility btn`, `@utility link`) ; le HTML ne garde que les différences.
