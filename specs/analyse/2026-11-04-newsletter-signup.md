# 2026-11-04 — Rapport d'exécution : Newsletter sign-up form

> SDL-FM Phase 8. Scénario défini dans le plan validé (G1), exécuté sur le build de production (`vite build` + `vite preview`).

## 1. Tests automatiques (Phase 7)

`npm test` : **30 réussis, 1 échec** sur 31 (5,6 s).

| Groupe | Scénarios | Résultat |
|---|---|---|
| Comportement | S4 à S9, S13 (+ S6b, S7b) | ✅ 9 / 9 |
| Responsive | S1, S2, S3, S14 (320, 640, 1023, 1024 px) | ✅ 7 / 7 |
| Accessibilité (axe-core) | S10 : FORMULAIRE, ERREUR, SUCCÈS × 375 et 1440 px | ✅ 6 / 6, aucune violation sérieuse ou critique |
| HTML (W3C Nu, local) | S12 | ✅ aucune erreur |
| Fitness ADR-0003 | aucune couleur hors `@theme` | ✅ |
| Visuel | S11, seuil 5 % | ⚠️ 6 / 7 |

### Comparaison visuelle (S11)

| Écran | Image FM | Pixels différents |
|---|---|---|
| Formulaire 1440 × 1080 | `desktop.jpg` | 1,73 % |
| Erreur 1440 × 1080 | `etat-erreur.jpg` | 3,16 % (rouge AA plus foncé, décision Q1) |
| Focus + survol 1440 × 1080 | `etat-survol-focus.jpg` | 1,50 % |
| Succès 1440 × 1080 | `etat-succes-desktop.jpg` | 0,68 % |
| Succès survolé 1440 × 1080 | `etat-succes-desktop-survol.jpg` | 0,69 % |
| Succès mobile 375 × 812 | `etat-succes-mobile.jpg` | 3,70 % |
| **Formulaire mobile 375 × 842** | `mobile.jpg` | **5,84 %** ❌ |

## 2. Parcours réel (navigateur, aux largeurs du plan)

| Étape du plan | 375 px | 768 px | 1440 px |
|---|---|---|---|
| Disposition (mobile / tablette / desktop) | ✅ | ✅ | ✅ |
| 1. Subscribe, champ vide → erreur | ✅ message, `aria-invalid`, focus sur le champ | — | ✅ (tests) |
| 2. `ash#loremcompany.com` → erreur | ✅ | — | ✅ (tests) |
| 3. Correction en `ash@loremcompany.com` → erreur effacée pendant la saisie | ✅ | — | ✅ (tests) |
| 4. Entrée → succès, email en gras, focus sur le titre | ✅ | — | ✅ (tests) |
| 5. Dismiss (Tab + Entrée) → formulaire vide, focus sur le champ | ✅ | — | ✅ (tests) |
| 6. Parcours au clavier | ✅ | — | ✅ (S9) |
| 7. Survol et focus visibles | — | — | ✅ dégradé + ombre au survol ; contour 2 px au focus clavier |

Le comportement correspond au prototype Penpot (validé G3). Les transitions durent 200 ms et sont coupées avec `prefers-reduced-motion`.

## 3. Écarts relevés

### 3.1 Formulaire mobile à 5,84 % (seuil 5 %)

Corrections déjà faites pendant cette phase :
- le pied de page passait dans la zone capturée sur mobile : il est maintenant placé sous le contenu (hors de l'écran à 375 × 842) ;
- le texte des boutons était 2 px trop haut par rapport aux images FM : décalé de 3 px.

Écart restant, réparti par zone :

| Zone | Part de l'écart |
|---|---|
| Illustration | 34 % |
| Paragraphe et liste | 38 % |
| Titre | 15 % |
| Libellé, champ, bouton | 13 % |

Analyse :
- **Positions** : toutes les lignes de texte sont à ± 1 px verticalement et ± 3 px en largeur de l'image FM. Ce n'est pas une erreur de mise en page.
- **Illustration** : l'image FM a été rendue à partir d'une version de l'illustration un peu différente du SVG fourni dans le starter (formes orange du fond). Le code affiche le SVG du starter, sans modification possible.
- **Texte** : l'image FM vient de l'outil de design de FM, avec un lissage des polices différent de Chrome. Sur mobile, le texte occupe une plus grande part de l'image, d'où un pourcentage plus élevé que sur desktop.

### 3.2 Hauteur de page en succès mobile

À 375 × 812, la page fait 861 px : le pied de page (décision Q7) est sous l'écran de succès. Conforme à la maquette, rien à corriger.

## 4. Verdict

**Conforme, sauf S11 « formulaire mobile »** (5,84 % pour un seuil de 5 %). La cause est le rendu de l'image FM (illustration et lissage des polices), pas la mise en page.

Décision demandée à l'humain avant SHIP :
- accepter l'écart et fixer le seuil de ce seul écran à 6 %, en le documentant dans le README ;
- ou garder 5 % et chercher à imiter le rendu de l'outil FM (réglages de police), sans garantie de résultat.

**Décision (2026-11-04)** : seuil de 6 % accepté pour le seul formulaire mobile, documenté dans le README. Après mise à jour du test : **31 / 31 tests au vert**. Verdict final : **conforme**, passage à DOCUMENT et SHIP.
