// scripts/setup-create-spicetime-react-app.js
const fs = require('fs');
const path = require('path');

// Previous code remains the same until the end...

// Create README.md content
const readmeContent = `# Create Spicetime React App

A CLI tool for creating React applications with pre-configured settings and common components for Spicetime projects.

## Quick Start

Create a new React app with:

\`\`\`bash
npx create-spicetime-react-app my-app
cd my-app
npm start
\`\`\`

## Features

- 🚀 Vite for lightning-fast development
- 💅 Emotion for styled components
- 🎨 Pre-configured theme provider
- 📦 Modern React setup with best practices
- ⚡️ Optimized production builds
- 🛠 Common UI components included

## Project Structure

\`\`\`
my-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Button.js
│   ├── theme/
│   │   └── ThemeProvider.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
\`\`\`

## Available Scripts

In the project directory, you can run:

### \`npm start\`

Runs the app in development mode using Vite.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### \`npm run build\`

Builds the app for production to the \`dist\` folder.
The build is minified and optimized for best performance.

### \`npm run preview\`

Previews the production build locally.

## Styling

This template uses Emotion for styling. Components can be styled using the \`css\` prop or styled components:

\`\`\`jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const MyComponent = () => (
  <div
    css={css\`
      color: blue;
      background: white;
    \`}
  >
    Hello World
  </div>
);
\`\`\`

## Theme

The template includes a pre-configured theme provider with common design tokens:

\`\`\`javascript
const theme = {
  colors: {
    primary: '#0070f3',
    background: '#f4f4f4',
    text: '#333',
  },
  spacing: (factor) => \`\${factor * 8}px\`,
};
\`\`\`

Access theme values in your components:

\`\`\`jsx
import { useTheme } from '@emotion/react';

const MyComponent = () => {
  const theme = useTheme();
  return (
    <div css={css\`color: \${theme.colors.primary};\`}>
      Themed Component
    </div>
  );
};
\`\`\`

## Common Components

### Button

A themed button component is included as an example:

\`\`\`jsx
import Button from './components/Button';

const MyComponent = () => (
  <Button onClick={() => console.log('Clicked!')}>
    Click Me
  </Button>
);
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

MIT

## Support

For support, issues, or feature requests, please file an issue in the GitHub repository.`;

// Add this to the file creation section:
createFile(path.join(BASE_PATH, 'README.md'), readmeContent);

// Rest of the code remains the same...
