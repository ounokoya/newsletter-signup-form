import { readFileSync } from 'node:fs'
import { PNG } from 'pngjs'
import jpeg from 'jpeg-js'

export const REFERENCE = new URL('../specs/reference/', import.meta.url)

// Ouvre la page à une taille donnée, polices chargées
export async function open(page, width, height) {
  await page.setViewportSize({ width, height })
  await page.goto('./')
  await page.evaluate(() => document.fonts.ready)
}

export async function submit(page, value) {
  await page.getByLabel('Email address').fill(value)
  await page.getByRole('button', { name: 'Subscribe to monthly newsletter' }).click()
}

// Part des pixels dont un canal diffère de plus de 40 (même mesure que pour la maquette Penpot)
export function diffRatio(screenshot, referenceFile) {
  const actual = PNG.sync.read(screenshot)
  const expected = jpeg.decode(readFileSync(new URL(referenceFile, REFERENCE)), { useTArray: true })
  if (actual.width !== expected.width || actual.height !== expected.height) {
    throw new Error(`taille ${actual.width}×${actual.height} ≠ référence ${expected.width}×${expected.height}`)
  }
  let different = 0
  for (let i = 0; i < actual.data.length; i += 4) {
    const delta = Math.max(
      Math.abs(actual.data[i] - expected.data[i]),
      Math.abs(actual.data[i + 1] - expected.data[i + 1]),
      Math.abs(actual.data[i + 2] - expected.data[i + 2]),
    )
    if (delta > 40) different++
  }
  return different / (actual.width * actual.height)
}
