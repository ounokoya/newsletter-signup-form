# Maquette Penpot — Newsletter sign-up form

> SDL-FM Phase 3. Fichier Penpot : « Newsletter sign-up form », page « Newsletter ». En attente de validation (G3).
> L'export `.penpot` par l'API du plugin a échoué (« No matching clause ») : pour une copie dans le dépôt, l'exporter à la main depuis Penpot (menu du fichier → Exporter).

## Bibliothèque

### Couleurs

| Groupe | Nom | Valeur |
|---|---|---|
| FM | Red | `#FF6257` |
| FM | Blue 800 | `#242742` |
| FM | Blue 700 | `#36384E` |
| FM | Grey | `#949494` |
| FM | White | `#FFFFFF` |
| Dérivées | Red 15 % | `#FF6257` à 15 % (fond du champ en erreur) |
| Dérivées | Red texte (AA) | `#D60E00` (texte d'erreur, décision Q1) |
| Dérivées | Blue 800 50 % | `#242742` à 50 % (placeholder) |
| Dérivées | Grey 50 % | `#949494` à 50 % (bordure du champ) |

Le dégradé de survol `#FF527B → #FF6A3A` (les couleurs du dégradé des illustrations FM) est appliqué directement sur le composant « Bouton / Survol » : l'API du plugin refuse les dégradés dans la bibliothèque.

### Typographies (Roboto)

| Nom | Graisse | Taille | Interligne |
|---|---|---|---|
| Titre desktop | 700 | 56 | 100 % |
| Titre mobile | 700 | 40 | 100 % |
| Texte | 400 | 16 | 150 % |
| Texte gras | 700 | 16 | 150 % |
| Libellé | 700 | 12 | 150 % |
| Bouton | 700 | 16 | 150 % |
| Pied de page | 400 | 11 | 150 % |

### Tokens (jeu « newsletter »)

Couleurs (`color.*`, dont `gradient-start` / `gradient-end`), police (`font.family`, `font.size.*`), espacements (`space.8`, `10`, `16`, `24`, `40`, `48`, `64`), rayons (`radius.control` 8, `radius.illustration` 16, `radius.card` 36). Ils serviront à l'ADR-0003 (tokens → thème Tailwind).

## Composants

| Composant | États |
|---|---|
| Bouton | Normal (Blue 800) · Survol (dégradé + ombre `0 16 32` Red 50 %) · Focus clavier (dégradé + contour 2 px Blue 800) |
| Champ | Normal (bordure Grey 50 %, placeholder) · Survol (bordure Blue 800, Q4) · Focus (bordure Blue 800, valeur saisie) · Erreur (bordure Red, fond Red 15 %, texte `#D60E00`) |
| Libellé | Normal · Erreur (« Valid email required » à droite, `#D60E00`) |
| Élément de liste | Icône 21 × 21 + 16 + texte |

## Écrans

| Écran | Taille | Image FM comparée | Pixels différents* |
|---|---|---|---|
| Desktop · Formulaire | 1440 × 1080 | `desktop.jpg` | 1,33 % |
| Desktop · Formulaire (survol bouton) | 1440 × 1080 | — | — |
| Desktop · Erreur | 1440 × 1080 | `etat-erreur.jpg` | 1,03 % |
| Desktop · Focus + survol | 1440 × 1080 | `etat-survol-focus.jpg` | 1,00 % |
| Desktop · Succès | 1440 × 1080 | `etat-succes-desktop.jpg` | 0,42 % |
| Desktop · Succès (survol) | 1440 × 1080 | `etat-succes-desktop-survol.jpg` | 0,43 % |
| Tablette · Formulaire (proposition Q2) | 768 × 1024 | — | — |
| Mobile · Formulaire | 375 × 842 | `mobile.jpg` | 5,25 % |
| Mobile · Erreur | 375 × 842 | — | — |
| Mobile · Succès | 375 × 812 | `etat-succes-mobile.jpg` | 2,94 % |

\* Part des pixels dont un canal diffère de plus de 40 (sur 255). Les écarts restants viennent du lissage des polices et, sur mobile, du rendu des flous de l'illustration SVG par Penpot ; les positions sont au pixel près (± 1 px). Comparaisons côte à côte : `comparaison-*.png` (image FM | Penpot | écarts en rouge).

Chaque écran contient un calque « Référence FM » (image FM à 50 %, masqué et verrouillé) pour vérifier le calage.

## Prototype

Animations : fondu de 200 ms (`ease-out`) entre les états, 150 ms pour le survol.

**Flux « Desktop »** (départ : Desktop · Formulaire)

| Depuis | Action | Vers |
|---|---|---|
| Formulaire | clic sur le champ | Focus + survol (email valide saisi) |
| Formulaire | survol du bouton | Formulaire (survol bouton) |
| Formulaire (survol bouton) | sortie du bouton | Formulaire |
| Formulaire (survol bouton) | clic sur Subscribe (champ vide) | Erreur |
| Erreur | clic sur le champ (correction) | Focus + survol |
| Focus + survol | clic sur Subscribe | Succès |
| Succès | survol de Dismiss | Succès (survol) |
| Succès (survol) | sortie / clic | Succès / Formulaire |

**Flux « Mobile »** : Formulaire → (Subscribe) → Erreur → (Subscribe après correction) → Succès → (Dismiss) → Formulaire.

Limite : Penpot ne change pas l'état d'un composant au survol ; le survol est simulé par des écrans dédiés.
