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
- `AGENTS.md` et `CLAUDE.md` du starter (consignes FM pour les assistants IA) demandent à l'IA de jouer le rôle de tuteur et de ne pas écrire le code, ce qui contredit la Phase 6 du plan. Décision (2026-11-04) : conservés comme référence sous `specs/reference/starter-AGENTS.md` et `starter-CLAUDE.md`, pour qu'aucun outil IA ne les charge automatiquement.

## Validation G2 — analyse Excalidraw (2026-11-04)

Analyse validée telle quelle (`specs/visuel/newsletter-signup-analyse.*`). Décisions retenues :

| # | Sujet | Décision |
|---|---|---|
| Q1 | Contraste du texte d'erreur (Red 2,9:1) | Texte d'erreur en `hsl(4, 100%, 42%)` = `#D60E00` (5,4:1) ; Red FM gardé pour la bordure et le fond du champ |
| Q2 | Tablette sans maquette | 640 à 1023 px : carte centrée sur Blue 700, 1 colonne, illustration tablette 528 × 360 en haut |
| Q3 | Succès mobile | Le bloc commence à 149 px du haut ; bouton collé en bas, à 40 px |
| Q4 | Survol du champ | Bordure Blue 800, comme le focus |
| Q5 | Contrastes FM sous les seuils (bouton survolé 2,8:1, bordure du champ 1,6:1) | Design FM conservé, écart noté dans le README |
| Q6 | Coins carrés de l'illustration sur `etat-survol-focus.jpg` | On suit `desktop.jpg` : rayon 16 |
| Q7 | Pied de page « Challenge by Frontend Mentor » | Gardé, petit, en bas de page |

Points de rupture retenus : mobile < 640 px, tablette 640–1023 px, desktop ≥ 1024 px.

## Validation G3 — maquette Penpot (2026-11-04)

Maquette validée telle quelle (`specs/visuel/penpot/maquette.md`), avec les choix faits pendant la Phase 3 :

1. Le texte saisi dans le champ en erreur utilise aussi `#D60E00` (logique de Q1).
2. Focus clavier des boutons : dégradé du survol + contour 2 px Blue 800, décalé de 2 px.
3. Tablette : carte de 576 px, padding 24, illustration 528 × 360 en haut, contenu de 480 px, titre 56.
4. Ombre des cartes : `0 15px 60px` noir à 25 %.
5. Le survol est simulé dans le prototype par des écrans dédiés (limite de Penpot).

Le verrou code est levé : Phases 4 à 12 enchaînées par l'agent, arrêt avant la soumission FM (Phase 13).

## Décision après la Phase 8 (2026-11-04)

Le formulaire mobile s'écarte de 5,84 % de `mobile.jpg` (seuil du plan : 5 %), à cause du rendu de l'image FM (illustration, lissage des polices) ; positions à ± 1 px. Décision humaine : **seuil de 6 % pour ce seul écran**, documenté dans le README (`specs/analyse/2026-11-04-newsletter-signup.md`).

## Changement de déploiement (Phase 11, 2026-11-04)

Le push du workflow GitHub Actions a été refusé : le jeton GitHub CLI n'a pas l'autorisation `workflow`. Pour ne pas demander une autorisation de plus, le site est publié depuis la branche `gh-pages` (`npm run deploy`, script `scripts/deploy-gh-pages.sh`). Retour possible à GitHub Actions après `gh auth refresh -s workflow`.
