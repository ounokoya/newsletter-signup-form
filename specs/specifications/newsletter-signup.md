# Spec — Newsletter sign-up form with success message

> SDL-FM Phase 4. Sources : analyse validée (G2) `specs/visuel/newsletter-signup-analyse.*`, maquette validée (G3) `specs/visuel/penpot/maquette.md`, décisions dans `specs/brainstorming/2026-11-04-newsletter-signup.md`.
> Cette spec dit **quoi** et **pourquoi**, jamais **comment**.

## 1. Objectif

Une page d'inscription à une newsletter mensuelle. Le visiteur saisit son email et l'envoie. Si l'email est vide ou mal formé, un message d'erreur s'affiche ; sinon un message de succès remplace le formulaire et reprend l'email saisi. Le visiteur peut fermer ce message et revenir au formulaire vide.

## 2. Composants et contenu

| Composant | Contenu | Élément HTML attendu |
|---|---|---|
| Illustration | `illustration-sign-up-{mobile,tablet,desktop}.svg` selon la largeur | `picture` + `img` décorative (`alt=""`) |
| Titre | « Stay updated! » | `h1` |
| Accroche | « Join 60,000+ product managers receiving monthly updates on: » | `p` |
| Liste | « Product discovery and building what matters », « Measuring to ensure updates are a success », « And much more! » ; icône `icon-list.svg` décorative | `ul` / `li` |
| Formulaire | libellé « Email address », champ email (placeholder « email@company.com »), message d'erreur, bouton « Subscribe to monthly newsletter » | `form`, `label`, `input type=email`, `button type=submit` |
| Succès | icône `icon-success.svg` décorative, titre « Thanks for subscribing! », texte « A confirmation email has been sent to **{email}**. Please open it and click the button inside to confirm your subscription. », bouton « Dismiss message » | `section`, `h1`, `p` + `strong`, `button type=button` |
| Pied de page | « Challenge by Frontend Mentor. Coded by Koya Esdras. » (liens) | `footer` |

## 3. Tokens

Couleurs, typographies, espacements et rayons : `specs/reference/tokens.md` (FM) et la bibliothèque Penpot (jeu de tokens « newsletter »). Valeurs dérivées retenues :

| Token | Valeur | Usage |
|---|---|---|
| Red texte | `hsl(4, 100%, 42%)` | texte d'erreur (message et valeur saisie) — Q1 |
| Red 15 % | Red à 15 % | fond du champ en erreur |
| Grey 50 % | Grey à 50 % | bordure du champ |
| Blue 800 50 % | Blue 800 à 50 % | placeholder |
| Dégradé | `#FF527B → #FF6A3A`, de gauche à droite | bouton survolé ou en focus |
| Ombre carte | `0 15px 60px`, noir 25 % | cartes (tablette, desktop) |
| Ombre bouton | `0 16px 32px`, Red 50 % | bouton survolé ou en focus |

## 4. Responsive

| Largeur | Formulaire | Succès |
|---|---|---|
| < 640 px (mobile) | Page blanche ; illustration mobile en haut, pleine largeur ; contenu à 24 px des bords, 40 px sous l'illustration et au-dessus du bas | Page blanche pleine hauteur ; bloc icône + textes à 149 px du haut (Q3) ; bouton collé en bas, à 40 px du bord |
| 640 – 1023 px (tablette) | Fond Blue 700 ; carte blanche de 576 px centrée, rayon 36, padding 24 ; illustration tablette 528 × 360 en haut ; contenu de 480 px | Fond Blue 700 ; carte de succès desktop centrée |
| ≥ 1024 px (desktop) | Fond Blue 700 ; carte 928 × 641 centrée ; 2 colonnes : texte 376 px (à 64 px du bord gauche) puis, à 64 px, l'illustration desktop 400 × 593 | Carte 504 × 520 centrée, padding 48 en haut et 64 ailleurs |

Rythme vertical du formulaire : titre → accroche 24 ; accroche → liste 24 ; 10 entre éléments de liste ; liste → libellé 40 ; libellé → champ 8 ; champ → bouton 24. Succès : icône → titre 40 ; titre → texte 24 ; texte → bouton 40.

Titres : 40 px en mobile, 56 px dès 640 px.

La page reste utilisable de 320 px aux grands écrans, sans défilement horizontal.

## 5. États et interactions

### États de la page

| État | Visible | Entrée |
|---|---|---|
| `FORMULAIRE` | formulaire, champ normal | chargement ; Dismiss ; erreur corrigée |
| `ERREUR` | formulaire, champ et message en erreur | Subscribe avec un email vide ou mal formé |
| `SUCCÈS` | message de succès seul | Subscribe avec un email valide |

### Événements

| Événement | Condition | Effet |
|---|---|---|
| Envoi du formulaire (clic sur Subscribe ou Entrée) | email vide (après suppression des espaces autour) | état `ERREUR` ; le focus reste sur le champ |
| Envoi du formulaire | email mal formé (règle email du navigateur) | état `ERREUR` |
| Envoi du formulaire | email valide | état `SUCCÈS` ; l'email (sans espaces autour) apparaît en gras dans le texte ; focus sur le titre du succès |
| Saisie dans le champ | état `ERREUR` et l'email devient valide | retour à `FORMULAIRE` (message effacé) |
| Clic sur Dismiss | état `SUCCÈS` | état `FORMULAIRE` ; champ vide ; focus sur le champ |

### États des éléments

| Élément | Normal | Survol | Focus | Erreur |
|---|---|---|---|---|
| Champ | bordure Grey 50 % | bordure Blue 800 | bordure Blue 800 | bordure Red, fond Red 15 %, texte Red texte |
| Boutons | fond Blue 800 | dégradé + ombre bouton | dégradé + ombre bouton + contour 2 px Blue 800 décalé de 2 px (clavier) | — |

Transitions courtes (≈ 200 ms) sur les couleurs et l'ombre, supprimées si `prefers-reduced-motion: reduce`.

## 6. Accessibilité (contrats)

| # | Contrat |
|---|---|
| A1 | Le champ a un libellé visible relié (`label for`). |
| A2 | Le message d'erreur est relié au champ (`aria-describedby`) et annoncé par les lecteurs d'écran (`aria-live="polite"`). |
| A3 | En erreur, le champ porte `aria-invalid="true"` ; l'attribut disparaît quand l'erreur est corrigée. |
| A4 | Ordre clavier : champ, puis bouton Subscribe ; Entrée dans le champ envoie le formulaire. |
| A5 | Focus visible sur tous les éléments interactifs. |
| A6 | Focus géré : titre du succès à l'affichage du succès ; champ email après Dismiss. |
| A7 | Illustration et icônes décoratives : ignorées par les lecteurs d'écran (`alt=""`). |
| A8 | Textes contrastés à 4,5:1 au moins dans les états normal et erreur (exception documentée : texte blanc sur le dégradé de survol, décision Q5). |
| A9 | Pas d'animation si `prefers-reduced-motion: reduce`. |
| A10 | L'email saisi est affiché comme du texte (aucun HTML interprété). |

## 7. Critères d'acceptation (Given / When / Then)

```
S1  Given une fenêtre de 375 px
    When  la page se charge
    Then  l'illustration mobile occupe toute la largeur en haut, sans carte ni fond foncé

S2  Given une fenêtre de 768 px
    When  la page se charge
    Then  une carte de 576 px est centrée sur fond Blue 700, illustration tablette en haut

S3  Given une fenêtre de 1440 × 1080 px
    When  la page se charge
    Then  la carte de 928 × 641 px est centrée, texte à gauche et illustration desktop à droite

S4  Given un champ vide
    When  je clique sur « Subscribe to monthly newsletter »
    Then  « Valid email required » s'affiche, le champ porte aria-invalid="true", le focus est sur le champ
    And   le message de succès n'est pas affiché

S5  Given le champ contient « ash#loremcompany.com »
    When  j'envoie le formulaire
    Then  l'état ERREUR s'affiche

S6  Given l'état ERREUR
    When  je corrige la saisie en « ash@loremcompany.com »
    Then  le message d'erreur disparaît et aria-invalid est retiré, sans envoyer le formulaire

S7  Given le champ contient «  ash@loremcompany.com  » (espaces autour)
    When  j'appuie sur Entrée
    Then  le formulaire est masqué, le succès affiche « ash@loremcompany.com » en gras
    And   le focus est sur « Thanks for subscribing! »

S8  Given l'état SUCCÈS
    When  je clique sur « Dismiss message »
    Then  le formulaire réapparaît, le champ est vide et reçoit le focus

S9  Given la page chargée
    When  j'appuie sur Tab deux fois
    Then  le focus passe du champ email au bouton Subscribe

S10 Given chacun des états FORMULAIRE, ERREUR et SUCCÈS, à 375 et 1440 px
    When  axe-core analyse la page
    Then  aucune violation sérieuse ou critique

S11 Given les écrans FORMULAIRE, ERREUR, focus + survol, SUCCÈS et SUCCÈS survolé (1440 × 1080)
      et FORMULAIRE (375 × 842), SUCCÈS (375 × 812)
    When  on compare la capture à l'image FM correspondante
    Then  au plus 5 % des pixels diffèrent (un canal à plus de 40 sur 255)

S12 Given le code HTML de la page
    When  le validateur W3C (Nu) l'analyse
    Then  aucune erreur

S13 Given prefers-reduced-motion: reduce
    When  je survole le bouton
    Then  aucune transition n'est jouée

S14 Given des largeurs de 320, 640, 1023 et 1024 px
    When  la page se charge
    Then  pas de défilement horizontal
```
