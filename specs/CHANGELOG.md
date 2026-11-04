# Changelog

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) · Versions : [SemVer](https://semver.org/lang/fr/).

## [1.0.1] — 2026-11-04

Correctifs issus du rapport Frontend Mentor (`specs/analyse/2026-11-04-rapport-fm.md`).

### Changed
- Les boutons Subscribe et Dismiss partagent un utilitaire `btn` au lieu de répéter leurs classes (R1).

### Fixed
- Les liens du pied de page perdent leur soulignement au survol et ont un contour au focus clavier (R2).
- Le champ email montre un contour de 2 px au focus clavier, en plus du changement de couleur de la bordure (R3).

## [1.0.0] — 2026-11-04

Première version, soumise sur Frontend Mentor.

### Added
- Formulaire d'inscription : titre, accroche, liste, champ email et bouton « Subscribe to monthly newsletter ».
- Validation de l'email (vide ou mal formé) avec le message « Valid email required », effacé dès que la saisie devient valide.
- Message de succès reprenant l'email saisi, et bouton « Dismiss message » pour revenir au formulaire.
- Mises en page mobile (< 640 px), tablette (640–1023 px, proposition faute de maquette FM) et desktop (≥ 1024 px), illustration adaptée à chaque largeur.
- États de survol et de focus : dégradé et ombre sur les boutons, bordure foncée sur le champ, contour au focus clavier.
- Accessibilité : libellé relié, erreur annoncée (`aria-live`, `aria-invalid`), focus géré, texte d'erreur au contraste AA, pas d'animation avec `prefers-reduced-motion`.
- 31 tests automatiques (Playwright, axe-core, W3C Nu) dérivés de la spec.
- Déploiement sur GitHub Pages depuis la branche `gh-pages` (`npm run deploy`).

### Known issues
- Contrastes du design FM conservés : texte blanc sur le dégradé de survol (2,8 à 3,1:1) et bordure du champ (1,6:1).
- Formulaire mobile à 5,8 % de pixels différents de l'image FM (seuil accepté : 6 %).
