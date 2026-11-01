<h3><strong>Portfolio</strong></h3>
A portfolio website containing the key information that highlights me as a Front-End Developer and encourages others to collaborate with me. The site is built using React, with Redux used for state management. Material UI was used for faster development of certain components. The app does not interact with a backend.

## Local setup

Requires Node.js 22.12 or newer and npm 10 or newer. The migration was verified with Node.js 26.13.0 and npm 11.20.0. React and React DOM are pinned to 19.3.1.

```sh
npm ci
npm start
```

Use **npm** for this checkout, including the package manager selected in IntelliJ. Mixing npm and pnpm in the same `node_modules` caused duplicate React instances (`Invalid hook call`) and conflicting ESLint plugins. If that happens, stop the server and run `npm ci` to recreate the dependencies. Previous pnpm/Yarn metadata is preserved under `output/dependency-repair-2026-10-31/`; `package-lock.json` is the active lockfile.

The development server opens at **http://127.0.0.1:3000**. Keep its terminal running while browsing. The old temporary preview address on port 3001 only works when a server is explicitly started on that port.

The startup script prints the exact address and reuses an already running portfolio at that address. If another process occupies the port or the server does not respond, it reports the problem instead of silently finishing. To select another port in PowerShell:

```powershell
$env:PORT = '3001'
npm start
```

```sh
npm test -- --watchAll=false --runInBand
npm run build
```

The production output is written to `build/`. Configure the static host to serve `index.html` for client-side routes `/skills` and `/projects`. There is no backend or required `.env` file. Images and both language versions of the CV are included in the repository; the Lato and Roboto fonts load from Google Fonts, with local fallback fonts available offline.

The React 19 migration replaces Material UI 4 with `@mui/material`, updates React Redux and the test utilities, and gives animated transitions explicit DOM refs. Use npm and the committed `package-lock.json` to reproduce the installed dependency versions.

Create React App (`react-scripts` 5) remains the build/test tool. `npm audit fix` has applied available compatible fixes; the remaining audit findings include its development dependencies and React Router 6. Removing all findings requires a separate build/test tool and router migration. Do not use `npm audit fix --force`: its proposed `react-scripts@0.0.0` replacement removes the working toolchain.

