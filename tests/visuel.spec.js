import { test, expect } from '@playwright/test'
import { open, submit, diffRatio } from './helpers.js'

// Spec §7 — scénario S11 : au plus 5 % de pixels différents des images FM
// (6 % pour le formulaire mobile : rendu de l'image FM, décision du 2026-11-04)

const MAX_RATIO = 0.05
const button = (page, name) => page.getByRole('button', { name })

const screens = [
  { name: 'formulaire', size: [1440, 1080], ref: 'desktop.jpg', reach: async () => {} },
  { name: 'erreur', size: [1440, 1080], ref: 'etat-erreur.jpg', reach: (page) => submit(page, 'ash#loremcompany.com') },
  {
    name: 'focus + survol', size: [1440, 1080], ref: 'etat-survol-focus.jpg',
    reach: async (page) => {
      await page.getByLabel('Email address').fill('ash@loremcompany.com')
      await button(page, 'Subscribe to monthly newsletter').hover()
    },
  },
  { name: 'succès', size: [1440, 1080], ref: 'etat-succes-desktop.jpg', reach: (page) => submit(page, 'ash@loremcompany.com') },
  {
    name: 'succès survolé', size: [1440, 1080], ref: 'etat-succes-desktop-survol.jpg',
    reach: async (page) => {
      await submit(page, 'ash@loremcompany.com')
      await button(page, 'Dismiss message').hover()
    },
  },
  { name: 'formulaire mobile', size: [375, 842], ref: 'mobile.jpg', max: 0.06, reach: async () => {} },
  { name: 'succès mobile', size: [375, 812], ref: 'etat-succes-mobile.jpg', reach: (page) => submit(page, 'ash@loremcompany.com') },
]

for (const { name, size, ref, reach, max = MAX_RATIO } of screens) {
  test(`S11 — ${name} (${size.join(' × ')}) proche de ${ref}`, async ({ page }, testInfo) => {
    await open(page, ...size)
    await page.emulateMedia({ reducedMotion: 'reduce' }) // pas de transition en cours pendant la capture
    await reach(page)

    const shot = await page.screenshot({ caret: 'hide', animations: 'disabled' })
    await testInfo.attach(`${name}.png`, { body: shot, contentType: 'image/png' })
    const ratio = diffRatio(shot, ref)
    testInfo.annotations.push({ type: 'pixels différents', description: `${(ratio * 100).toFixed(2)} %` })

    expect(ratio).toBeLessThanOrEqual(max)
  })
}
