import { mkdir, readFile, stat } from 'node:fs/promises'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

/**
 * esbuild is a build-time tool only; it must never be shipped or resolved at
 * runtime by the Host. Prefer a local devDependency, and fall back to a sibling
 * checkout that already has one so a linked-profile install needs no network.
 */
function resolveEsbuild() {
  try {
    const local = require('esbuild')
    if (local?.build) return local
  } catch {
    /* no local devDependency */
  }
  // Dev-only fallback for a checkout without a local devDependency. Set
  // ESBUILD_PACKAGE_DIR to any directory whose node_modules contains esbuild.
  const siblings = [process.env.ESBUILD_PACKAGE_DIR, '/Users/wilson/Documents/Code/dsh-investment-workbench'].filter(Boolean)
  for (const sibling of siblings) {
    try {
      const fromSibling = createRequire(sibling + '/package.json')
      const mod = fromSibling('esbuild')
      if (mod?.build) return mod
    } catch {
      /* try the next sibling */
    }
  }
  throw new Error('esbuild is required to build lib/client.js; install it or point the fallback at a checkout that has it')
}

const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
const esbuild = resolveEsbuild()

await mkdir('lib', { recursive: true })
await esbuild.build({
  entryPoints: ['src/client/index.jsx'],
  outfile: 'lib/client.js',
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: ['es2022'],
  jsx: 'transform',
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
  loader: { '.css': 'text' },
  sourcemap: true,
  minify: false,
  logLevel: 'info',
  banner: {
    js: `window.__ModuleLoader__.load({id:'${pkg.name}',factory(require){var module={exports:{}};var exports=module.exports;`,
  },
  footer: { js: 'return module.exports;\n}});' },
})

const { size } = await stat('lib/client.js')
console.log('lib/client.js', size, 'bytes')
