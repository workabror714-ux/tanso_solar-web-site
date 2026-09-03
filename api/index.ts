// IMPORTANT: this imports the esbuild-bundled output (dist/server.cjs), not
// ../server.ts source directly.
//
// Every previous attempt (see git history) had this file import '../server.js',
// which TypeScript's `allowImportingTsExtensions`/`moduleResolution: "bundler"`
// settings resolve locally to ./server.ts. That works fine with `tsx`/Vite in
// dev, but Vercel's own Node.js Function builder independently traces and
// bundles each /api/*.ts entry from source (separately from this repo's own
// `npm run build` esbuild step) -- and it was never able to correctly include
// server.ts's local relative imports in the deployed function, no matter how
// many of them we removed (store.ts, then db.ts, then even the long-standing
// packages/shared/data/initialData.ts import): it kept crashing at runtime
// with ERR_MODULE_NOT_FOUND for whatever the last-resolved relative import
// had been -- including one already-removed import, on a freshly built,
// uniquely-URLed deployment -- which points at Vercel's function bundler
// reusing a stale/incomplete dependency trace for server.ts rather than
// genuinely re-tracing it on every deploy.
//
// The `npm run build` script already produces a single, fully self-contained
// CommonJS bundle at dist/server.cjs via:
//   esbuild server.ts --bundle --platform=node --format=cjs --packages=external
// That bundle has ZERO local relative imports left (esbuild inlined them
// all) -- the only remaining `require(...)` calls are for npm packages
// (express, vite, @neondatabase/serverless), which Vercel's function tracer
// resolves reliably via normal node_modules resolution.
//
// So instead of asking Vercel's function builder to re-derive that same
// bundle (badly) from server.ts source, we just point the function entry at
// the artifact our own build already produced.
//
// Node's ESM/CJS interop does NOT unwrap esbuild's `exports.default` getter
// automatically for a plain `import app from '...cjs'` (it hands back the
// whole CJS module.exports object, not the value esbuild put on `.default`)
// -- verified locally with a minimal esbuild repro before relying on this.
// So we take the default import (the raw module.exports namespace) and pull
// `.default` off it ourselves.
// @ts-ignore -- dist/server.cjs only exists after `npm run build` has run;
// there's no .ts source/type declaration for tsc to resolve here.
import serverModule from '../dist/server.cjs';

const app = (serverModule as any).default ?? serverModule;

export default app;
