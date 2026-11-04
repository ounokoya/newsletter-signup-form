import { test, expect } from '@playwright/test'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

// S12 (validateur W3C Nu) et fitness function de l'ADR-0003

const root = (path) => new URL(`../${path}`, import.meta.url)
const COLOR = /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(/i

test('S12 — le HTML construit passe le validateur W3C Nu sans erreur', () => {
  const vnu = root('node_modules/vnu-jar/build/dist/vnu.jar').pathname
  let output = ''
  try {
    execFileSync('java', ['-jar', vnu, '--errors-only', '--format', 'text', root('dist/index.html').pathname], { encoding: 'utf8', stdio: 'pipe' })
  } catch (error) {
    output = `${error.stdout}${error.stderr}`
  }
  expect(output).toBe('')
})

test('ADR-0003 — aucune couleur écrite en dur hors du bloc @theme', () => {
  const css = readFileSync(root('src/style.css'), 'utf8').replace(/@theme\s*{[^}]*}/, '')
  const sources = {
    'index.html': readFileSync(root('index.html'), 'utf8'),
    'src/main.js': readFileSync(root('src/main.js'), 'utf8'),
    'src/style.css (hors @theme)': css,
  }

  const found = Object.entries(sources).filter(([, text]) => COLOR.test(text)).map(([file]) => file)
  expect(found).toEqual([])
})
