# 2026-11-04 — Rapport Frontend Mentor (code review IA) sur la v1.0.0

> SDL-FM Phase 13, boucle des retours. Rapport : https://www.frontendmentor.io/solutions/newsletter-form-with-tailwind-v4-native-validation-and-playwright-zqE-xVEsyZ/report

## Notes

| Axe | Note |
|---|---|
| **Global** | **8,9 / 10 — Exceptional** |
| Code Quality (Best Practices 9,1 · File Organization 9,4) | 9,2 |
| Design & UX (Accessibility 7,8) | 7,8 |
| Documentation (README 9,4 · Commits 9,1) | 9,3 |

## Remarques à traiter

| # | Remarque FM | Analyse | Proposition |
|---|---|---|---|
| R1 | Les deux boutons répètent la même longue liste de classes (DRY) | Juste | Une classe partagée `btn` dans `src/style.css` (`@utility`), seules les différences restent dans le HTML |
| R2 | Les liens du pied de page n'ont aucun effet au survol (le brief demande un survol sur tous les éléments interactifs) | Juste | Effet de survol et de focus sur les liens (ex. soulignement retiré + couleur) |
| R3 | Le champ indique le focus seulement par un changement de couleur de bordure (`focus:outline-none`) | Juste (WCAG 1.4.1 : pas d'information par la couleur seule) | Garder la bordure Blue 800 et ajouter un contour au focus clavier, comme sur les boutons |
| R4 | Les commits regroupent toute la fonctionnalité dans `e307f67` | Juste, pour la suite | Prochains challenges : un commit par partie (HTML, CSS, JS) |

## Remarques déjà réglées ou non retenues

| Remarque FM | Statut |
|---|---|
| Le README n'a pas encore le lien de la solution | Réglé juste après la soumission (`d2321c8`) |
| `novalidate` : « exposer l'erreur avec `aria-invalid` et `aria-describedby` » | Faux positif : le champ a déjà `aria-describedby="email-error"` dans le HTML, et `src/main.js` pose `aria-invalid="true"` en cas d'erreur (tests S4, S5, S6) |

## Points positifs relevés

`picture` responsive avec dimensions, tokens centralisés dans `@theme`, organisation des dossiers (assets, src, tests, scripts), formulaire accessible (libellé, `autocomplete`, erreur reliée), gestion du focus au succès, README très documenté, messages de commits explicites.

## Suite donnée : v1.0.1 (2026-11-04)

R1, R2 et R3 corrigés en commits séparés (`39aa593`, `e31bfa1`, `d76ca4d`), tests S15 et S16 ajoutés. **33 / 33 tests au vert**, en local et sur le site en ligne après déploiement. R4 appliqué à cette version : un commit par correctif. Le rapport FM n'est pas regénéré automatiquement.

## Regénération du rapport (SDL-FM 1.4.0)

| Date | Version relue par FM | Résultat |
|---|---|---|
| 2026-11-04 | v1.0.0 (soumission) | Rapport IA 8,9 / 10 |
| 2026-11-05 | — | v1.0.1 poussée et déployée, mais pas encore relue : « Regenerate report » est grisé (il faut un crédit de rapport IA). Attendus réglés : R1 à R3 et le lien de la solution. En attente dans `specs/TASKS.md` du dossier racine, après le Multi-step form |
| 2026-11-05 | v1.0.1 + tests « Règles FM » (html-validate, eslint) | Verts en local : rien à corriger. Pas relue par FM : « Regenerate report » = 1 crédit IA (bouton grisé) → avec Pro ou le crédit mensuel |

Capture FM juste ; la v1.0.1 ne change pas l'apparence : pas de « Regenerate screenshot ».
