# 2026-11-04 — Exploration : Newsletter sign-up form with success message

> SDL-FM Phase 0 — trace de l'exploration (Pré-dev 1) et du plan validé (Pré-dev 2).

## Contexte

- Profil FM `@ounokoya` : niveau 1, 70 points, 7 challenges Newbie soumis (Vite + Tailwind).
- Objectif : passer au **niveau 2**, ce qui demande de soumettre un challenge **Junior**.
- Premier challenge mené avec la méthode SDL-FM 1.0.0 (`../../spec_driven_lifecycle.md`).

## Question explorée

Quel challenge Junior gratuit permet de valider toutes les phases du nouveau cycle sans être trop gros ?

## Options envisagées

| Challenge | Pour | Contre |
|---|---|---|
| **Newsletter sign-up form** | Petit ; 3 états (formulaire, erreur, succès) ; survol et focus demandés ; JS de formulaire nouveau pour moi ; utilise les 2 groupes de l'analyse Excalidraw et le prototype Penpot | — |
| Testimonials grid section | Le plus simple, CSS Grid | Pas d'interaction : le prototype Penpot et le groupe « comportement » de l'analyse restent vides |
| Tip calculator app | Plus de logique JS | Plus gros ; Penpot ne peut pas simuler les calculs |

**Décision** : Newsletter sign-up form with success message.

## Points flous du design et réponses retenues

1. **Moment de la validation** : au clic sur « Subscribe ». Une fois l'erreur affichée, elle disparaît dès que l'email devient valide pendant la saisie.
2. **Champ vide ou email mal formé** : un seul message, « Valid email required » (le design n'en montre qu'un).
3. **« Dismiss message »** : retour au formulaire vide, focus dans le champ email.
4. **Survol et focus du bouton** : à relever dans les images d'états du starter (`active-states.jpg`, `desktop-success-active.jpg`) ; à défaut, dégradé de l'illustration + ombre douce.
5. **Succès sur mobile** : à relever dans `mobile-success.jpg`.
6. **Tablette** : aucun design fourni ; largeurs de bascule fixées dans l'analyse Excalidraw. Proposition : disposition mobile tant que la carte desktop ne tient pas.
7. **Image d'erreur** : sur l'aperçu FM, la carte y semblait un peu plus grande que sur l'image desktop ; les mesures se prennent sur `desktop-design.jpg`.
8. **Accessibilité** : erreur annoncée aux lecteurs d'écran ; l'email affiché dans le message de succès est inséré comme texte (pas de HTML injecté).

## Décisions de plan

| Sujet | Décision | Écarté |
|---|---|---|
| Dépôts | Un dépôt par challenge ; `frontmentor/` garde la méthode et les ADR communs | Dépôt unique (déploiement Pages plus compliqué) |
| Starter | Téléchargé par l'agent dans Chrome (« Start challenge » puis « Download starter ») | — |
| Stack | Vite + Tailwind v4 ; tests Playwright + axe-core + validateur W3C Nu | Vite + CSS pur ; sans outil |

- Dépôt GitHub : `ounokoya/newsletter-signup-form` (public).
- Site : `https://ounokoya.github.io/newsletter-signup-form/` (GitHub Pages via GitHub Actions).

## Plan validé (Pré-dev 2)

| Phase | Livrable |
|---|---|
| 0 · Import & init | Starter copié, git + Vite + Tailwind v4, ce fichier, `roadmap.md` et `TASKS.md` à la racine |
| 1 · Référence | `specs/reference/` : images + `tokens.md` |
| 2 · Analyse Excalidraw ✋ | `specs/visuel/newsletter-signup-analyse.excalidraw` + `.png` (structure + comportement) |
| 3 · Maquette Penpot ✋ | Bibliothèque, composants bouton/champ, écrans 375 et 1440 (formulaire, erreur, succès), prototype ; exports `specs/visuel/penpot/` |
| 4 · Spec | `specs/specifications/newsletter-signup.md` (~10 scénarios Given/When/Then) |
| 5 · Design | ADR-0001 (dépôts) et ADR-0002 (stack) communs ; ADR-0003 (tokens → thème), ADR-0004 (états et validation), ADR-0005 (illustration responsive) |
| 🔒 | Verrou code |
| 6 · Build | HTML → CSS mobile-first → JS |
| 7 · Validate | Diff visuel, axe, W3C, Given/When/Then, fitness « pas de couleur en dur » |
| 8 · Execute | Scénario ci-dessous, rapport `specs/analyse/` |
| 9 · Document | `README.md` depuis le modèle FM |
| 10 · Ship | v1.0.0 + CHANGELOG |
| 11 · Commit & push | Dépôt public créé, push, tag `v1.0.0` |
| 12 · Deploy | GitHub Pages, vérification en ligne 375 / 1440 |
| 13 · Soumettre | Préparé par l'agent, soumis seulement avec l'accord de l'humain au moment voulu |

### Scénario de vérification (Phases 7 et 8)

- **Largeurs** : 375, 768, 1440 px.
- **Parcours** :
  1. Subscribe avec le champ vide → erreur.
  2. `ash#loremcompany.com` → erreur.
  3. Correction en `ash@loremcompany.com` → l'erreur disparaît pendant la saisie.
  4. Subscribe → écran de succès avec l'email en gras.
  5. Dismiss → formulaire vide, focus dans le champ.
  6. Tout le parcours au clavier (Tab, Entrée).
  7. Survol et focus visibles.
- **Attendu** : au plus 5 % de pixels différents des images FM à 375 et 1440 ; aucune violation axe sérieuse ou critique ; aucune erreur W3C ; tous les scénarios Given/When/Then au vert.

## Notes d'import (Phase 0)

- Le starter contient 7 images de design (et non 4 comme l'aperçu du site) : `desktop-design`, `active-states`, `error-states`, `desktop-success`, `desktop-success-active` (1440 × 1080), `mobile-design` (375 × 842), `mobile-success` (375 × 812).
- Il fournit aussi une **illustration tablette** (`illustration-sign-up-tablet.svg`) : une disposition tablette est donc attendue (point flou 6).
- Polices Roboto 400 et 700 fournies en local (`assets/fonts/`).
- `AGENTS.md` et `CLAUDE.md` du starter (consignes FM pour les assistants IA) ont été **mis de côté**, en attente de décision : ils demandent à l'IA de jouer le rôle de tuteur et de ne pas écrire le code, ce qui contredit la Phase 6 du plan.
