import { test, expect } from '@playwright/test'
import { open } from './helpers.js'

// Spec §4 — scénarios S1 à S3 et S14

const box = (page, selector) => page.locator(selector).boundingBox()

test('S1 — 375 px : illustration mobile pleine largeur en haut, pas de carte', async ({ page }) => {
  await open(page, 375, 842)
  const img = page.locator('#signup picture img')

  expect(await img.evaluate((el) => el.currentSrc)).toContain('illustration-sign-up-mobile')
  expect(await box(page, '#signup picture img')).toEqual({ x: 0, y: 0, width: 375, height: 284 })
  expect(await page.locator('#signup').evaluate((el) => getComputedStyle(el).boxShadow)).toBe('none')
})

test('S2 — 768 px : carte de 576 px centrée, illustration tablette en haut', async ({ page }) => {
  await open(page, 768, 1024)
  const card = await box(page, '#signup')

  expect(await page.locator('#signup picture img').evaluate((el) => el.currentSrc)).toContain('illustration-sign-up-tablet')
  expect(card.width).toBe(576)
  expect(card.x).toBe((768 - 576) / 2)
  const img = await box(page, '#signup picture img')
  expect(img).toMatchObject({ x: card.x + 24, y: card.y + 24, width: 528, height: 360 })
})

test('S3 — 1440 × 1080 : carte 928 × 641 centrée, texte à gauche, illustration à droite', async ({ page }) => {
  await open(page, 1440, 1080)
  const card = await box(page, '#signup')
  const img = await box(page, '#signup picture img')
  const title = await box(page, '#signup-title')

  expect(await page.locator('#signup picture img').evaluate((el) => el.currentSrc)).toContain('illustration-sign-up-desktop')
  expect(card).toMatchObject({ x: 256, width: 928, height: 641 })
  expect(Math.abs(card.y - 219.5)).toBeLessThanOrEqual(0.5)
  expect(img).toMatchObject({ x: 760, width: 400, height: 593 })
  expect(title.x).toBe(320)
})

for (const width of [320, 640, 1023, 1024]) {
  test(`S14 — ${width} px : pas de défilement horizontal`, async ({ page }) => {
    await open(page, width, 900)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBe(0)
  })
}
