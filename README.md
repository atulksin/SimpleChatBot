# SimpleChatBot
A rudimentary chatbot built with Angular

## Overview
A simple Angular chatbot application with a clean UI. Currently uses predefined responses and is not connected to any AI source, but is designed to be easily extended in the future.

## Features
- Interactive chatbot interface
- Message history display
- Real-time user input
- Predefined bot responses
- Clean, responsive design
- Enter key support for sending messages

## Prerequisites
- Node.js (v20 or higher)
- npm (v10 or higher)

## Installation
```bash
npm install
```

## Running the Application
```bash
npm start
```
Then navigate to http://localhost:4200/

## Building for Production
```bash
npm run build
```
Build artifacts will be stored in the `dist/` directory.

## Running Tests
```bash
npm test
```

## Project Structure
```
src/
├── app/
│   ├── chatbot/          # Chatbot component
│   │   ├── chatbot.ts    # Component logic
│   │   ├── chatbot.html  # Template
│   │   ├── chatbot.css   # Styles
│   │   └── chatbot.spec.ts # Tests
│   ├── app.ts            # Main app component
│   ├── app.html          # Main template
│   └── app.css           # Main styles
├── index.html            # Entry HTML
└── styles.css            # Global styles
```

## Future Enhancements
The chatbot is ready to be connected to AI agents or backend services. The `generateBotResponse()` method in `chatbot.ts` can be replaced with API calls to external services.

