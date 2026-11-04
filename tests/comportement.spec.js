import { test, expect } from '@playwright/test'
import { open, submit } from './helpers.js'

// Spec §5 et §6 — scénarios S4 à S9 et S13

test.beforeEach(async ({ page }) => {
  await open(page, 1440, 1080)
})

test('S4 — champ vide : erreur, aria-invalid, focus sur le champ, pas de succès', async ({ page }) => {
  const email = page.getByLabel('Email address')
  await page.getByRole('button', { name: 'Subscribe to monthly newsletter' }).click()

  await expect(page.locator('#email-error')).toHaveText('Valid email required')
  await expect(email).toHaveAttribute('aria-invalid', 'true')
  await expect(email).toBeFocused()
  await expect(page.locator('#success')).toBeHidden()
})

test('S5 — email mal formé : erreur', async ({ page }) => {
  await submit(page, 'ash#loremcompany.com')

  await expect(page.locator('#email-error')).toHaveText('Valid email required')
  await expect(page.getByLabel('Email address')).toHaveAttribute('aria-invalid', 'true')
})

test('S6 — la correction efface l\'erreur sans envoyer le formulaire', async ({ page }) => {
  await submit(page, 'ash#loremcompany.com')
  const email = page.getByLabel('Email address')

  await email.fill('ash@loremcompany.com')

  await expect(page.locator('#email-error')).toHaveText('')
  await expect(email).not.toHaveAttribute('aria-invalid')
  await expect(page.locator('#success')).toBeHidden()
})

test('S6b — pas d\'erreur affichée pendant la frappe avant un envoi', async ({ page }) => {
  await page.getByLabel('Email address').fill('ash#')

  await expect(page.locator('#email-error')).toHaveText('')
  await expect(page.getByLabel('Email address')).not.toHaveAttribute('aria-invalid')
})

test('S7 — Entrée avec un email valide (espaces autour) : succès, email en gras, focus sur le titre', async ({ page }) => {
  const email = page.getByLabel('Email address')
  await email.fill('  ash@loremcompany.com  ')
  await email.press('Enter')

  await expect(page.locator('#signup')).toBeHidden()
  await expect(page.locator('#success')).toBeVisible()
  await expect(page.locator('#success strong')).toHaveText('ash@loremcompany.com')
  await expect(page.getByRole('heading', { name: 'Thanks for subscribing!' })).toBeFocused()
})

test('S7b — l\'email est affiché comme du texte (contrat A10)', async ({ page }) => {
  await submit(page, 'ash@loremcompany.com')

  await expect(page.locator('#success strong > *')).toHaveCount(0)
})

test('S8 — Dismiss : formulaire vide et focus sur le champ', async ({ page }) => {
  await submit(page, 'ash@loremcompany.com')
  await page.getByRole('button', { name: 'Dismiss message' }).click()

  const email = page.getByLabel('Email address')
  await expect(page.locator('#signup')).toBeVisible()
  await expect(page.locator('#success')).toBeHidden()
  await expect(email).toHaveValue('')
  await expect(email).toBeFocused()
})

test('S9 — ordre clavier : champ puis bouton', async ({ page }) => {
  await page.keyboard.press('Tab')
  await expect(page.getByLabel('Email address')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Subscribe to monthly newsletter' })).toBeFocused()
})

test('S13 — prefers-reduced-motion : aucune transition sur le bouton et le champ', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const properties = await page.evaluate(() => ['button[type=submit]', '#email']
    .map((s) => getComputedStyle(document.querySelector(s)).transitionProperty))

  expect(properties).toEqual(['none', 'none'])
})
