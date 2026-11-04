# Soumission Frontend Mentor — brouillon

> SDL-FM Phase 13. Textes préparés pour le formulaire « Submit solution » du challenge. La soumission est publique et faite au nom de l'humain : elle n'est envoyée qu'avec son accord.

## Informations générales

| Champ | Valeur |
|---|---|
| Solution title (70 caractères max) | Newsletter form with Tailwind v4, native validation & Playwright |
| Repository URL | https://github.com/ounokoya/newsletter-signup-form |
| Live site URL | https://ounokoya.github.io/newsletter-signup-form/ |
| Tags (5 max, hors HTML/CSS/JS) | `tailwind-css`, `vite`, `accessibility`, `playwright` (si le tag existe) |
| Visibilité | Public |

FM précise que la soumission déclenche une code review IA (1 des 2 rapports gratuits du mois).

## What are you most proud of, and what would you do differently next time?

I'm most proud of the workflow. Before writing any code, I measured the JPG designs in Excalidraw, rebuilt them in Penpot with a click-through prototype, and wrote a spec with 14 Given/When/Then scenarios. The first build matched the design within 1 px, and 31 automated tests (Playwright, axe-core, the W3C validator and a pixel comparison with the design JPGs) also pass on the live site.

Next time, I'd set up the GitHub Actions deployment with the right token permissions from the start, and define the visual-comparison threshold per screen instead of one global number.

## What challenges did you encounter, and how did you overcome them?

- **Contrast**: the design's error red is 2.9:1 on white, below WCAG AA. I kept that red for the input border and background, and used a darker red, `hsl(4, 100%, 42%)` (5.4:1), for the error text.
- **No tablet design**: I designed a single-column card using the tablet illustration from the starter, and checked it in the Penpot prototype before coding.
- **Pixel comparison on mobile**: the mobile form differs from the JPG by 5.8 % even though every line of text is within 1 px. The JPG uses a slightly different illustration and font smoothing, so I documented it and accepted a 6 % threshold for that screen only.
- **Error timing**: the error only appears after submitting, then clears as soon as the email becomes valid, using `aria-invalid` and an `aria-live` message.

## What specific areas of your project would you like help with?

1. I style the error state with Tailwind's `aria-invalid:` variants. Is styling from ARIA attributes a good practice, or would you use a separate class or `data-` attribute?
2. The white text on the hover gradient is only about 3:1. How would you keep the design's look and still reach AA on hover?
3. On success, I move focus to the heading (`tabindex="-1"`). Would you rather announce the message with a live region and focus the Dismiss button?
