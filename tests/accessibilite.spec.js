import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { open, submit } from './helpers.js'

// Spec §6 — scénario S10 : aucune violation sérieuse ou critique

const states = {
  FORMULAIRE: async () => {},
  ERREUR: (page) => submit(page, 'ash#loremcompany.com'),
  SUCCÈS: (page) => submit(page, 'ash@loremcompany.com'),
}

for (const [width, height] of [[375, 842], [1440, 1080]]) {
  for (const [name, reach] of Object.entries(states)) {
    test(`S10 — ${name} à ${width} px`, async ({ page }) => {
      await open(page, width, height)
      await reach(page)

      const { violations } = await new AxeBuilder({ page }).analyze()
      const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact))

      expect(serious.map((v) => `${v.id} : ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([])
    })
  }
}
