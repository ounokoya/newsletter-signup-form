# ADR-0004 : États de la page et validation de l'email

## Statut
Accepté (2026-11-04)

## Contexte
La spec définit trois états (FORMULAIRE, ERREUR, SUCCÈS), un seul message d'erreur (« Valid email required ») pour un champ vide ou mal formé, la disparition de l'erreur pendant la correction, et une gestion du focus. Plusieurs approches sont possibles : regex maison, librairie de validation, validation native du navigateur.

## Décision
- Un seul `<form novalidate>` : la validation native reste disponible en JavaScript, mais ce sont nos messages qui s'affichent, pas les bulles du navigateur.
- Validité = `input.checkValidity()` sur un champ `type="email"` `required`, après suppression des espaces autour. C'est la règle email du HTML (celle de l'analyse 2B) ; pas de regex maison.
- État porté par le DOM, sans variable globale :
  - ERREUR = `aria-invalid="true"` sur le champ + texte du message ; le style d'erreur vient des variantes Tailwind `aria-invalid:` ;
  - SUCCÈS = attribut `hidden` sur le formulaire et retiré de la section de succès.
- L'email affiché dans le succès est écrit avec `textContent` (jamais `innerHTML`).
- Focus : sur le champ en cas d'erreur, sur le titre du succès (`tabindex="-1"`) à l'affichage du succès, sur le champ après Dismiss.
- Après une erreur, un écouteur `input` efface l'erreur dès que la saisie devient valide ; il ne montre jamais d'erreur pendant la frappe.

## Conséquences
- Pas de dépendance JS ; le comportement suit la norme HTML (ex. `ash@loremcompany` sans point est accepté, comme par le navigateur).
- Les tests lisent l'état directement dans le DOM (`aria-invalid`, `hidden`), ce qui colle aux contrats A2, A3 et A6 de la spec.
- Sans JavaScript, le formulaire ne peut pas afficher le succès (aucun serveur derrière) : limite acceptée pour un challenge front-end.
