import { test, expect } from '@playwright/test'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { HtmlValidate } from 'html-validate'
import { ESLint } from 'eslint'

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

// Vérifications automatiques de FM : préréglage recommandé, sans les règles de style que FM n'applique pas ;
// aucune exception (les règles de la plateforme s'imposent)
test('Règles FM — html-validate : aucune erreur sur le HTML servi', async ({ request }) => {
  const html = await (await request.get('./')).text()
  const validator = new HtmlValidate({
    extends: ['html-validate:recommended'],
    rules: { 'doctype-style': 'off', 'void-style': 'off' },
  })
  const report = await validator.validateString(html)
  const errors = report.results.flatMap((r) => r.messages).map((m) => `${m.line}:${m.column} ${m.ruleId} — ${m.message}`)
  expect(errors).toEqual([])
})

// FM passe tout le JavaScript du dépôt (code et tests) à eslint : préréglage recommandé (eslint.config.js)
test('Règles FM — eslint : aucune erreur dans le JavaScript du dépôt', async () => {
  const eslint = new ESLint({ cwd: new URL('..', import.meta.url).pathname })
  const results = await eslint.lintFiles(['src', 'tests', '*.js'])
  const errors = results.flatMap((r) => r.messages.map((m) => `${r.filePath.split('/').slice(-2).join('/')}:${m.line} ${m.ruleId} — ${m.message}`))
  expect(errors).toEqual([])
})
