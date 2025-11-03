# SimpleChatBot

> A minimal single-page chatbot application implemented in React + TypeScript.

This repository was originally scaffolded as an Angular example but has been converted to a small React app that demonstrates a simple chat UI and a simulated bot reply. It's intended as a starting point for integrating a real AI agent/backend later.

## Quick start

Prerequisites:
- Node.js (LTS recommended, e.g. 18.x or 20.x)
- npm (bundled with Node)

Install dependencies and start the dev server:

```powershell
npm install
npm start
```

Open http://localhost:3000 in your browser.

Build for production:

```powershell
npm run build
```

## Project layout

- `public/` — static HTML (`public/index.html`)
- `src/index.tsx` — React entry point
- `src/App.tsx` — App shell that mounts the chatbot
- `src/components/ChatBot.tsx` — Chat UI and simple simulated bot logic
- `src/index.css` — global styles
- `package.json` — dependencies and scripts
- `tsconfig.json` — TypeScript configuration

## Notes / Troubleshooting

- If `react-scripts` is not found when running `npm start`, run `npm install` again. If you hit peer dependency issues, try cleaning `node_modules` and `package-lock.json` and reinstalling:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue; Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
```

- This repo previously included Angular config files. Those are no longer required for running the React app. You can safely remove files like `angular.json`, `src/main.ts`, `src/polyfills.ts`, and the `src/app` folder if you want a cleaner tree.

## Next steps

- Replace the simulated reply in `ChatBot.tsx` with calls to a backend or AI service.
- Add unit tests and CI configuration.

If you want, I can remove the leftover Angular files and add a short `README` section describing how to wire a backend. Say "Remove Angular files" or "Add backend wiring".
