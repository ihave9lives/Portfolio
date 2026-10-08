# Portfolio - Sashankar J

A cyberpunk-themed portfolio built with Next.js 15, Framer Motion, and Tailwind CSS v4.

## Features

- **Cyberpunk Aesthetic** - Neon colors, glitch effects, and futuristic UI
- **Japanese Character Glitch** - Hover/click name for Katakana glitch overlay
- **Multiple Themes** - Cyberpunk, Light, Synthwave, Matrix, Tokyo Night, Amber CRT
- **Easter Eggs** - Konami code, hidden terminal, ghost mode, matrix rain, and more
- **Reduced Motion** - Respects `prefers-reduced-motion` for accessibility
- **Smooth Animations** - Framer Motion with spring physics
- **Custom Cursor** - Interactive cursor with hover states
- **Responsive** - Mobile-first design

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with CSS variables
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx       # Hero section with name glitch
│   │   ├── Projects.tsx   # Projects (Fun/Pro split)
│   │   └── TechStack.tsx  # Technology stack
│   ├── ui/                # Reusable UI components
│   │   ├── Modal.tsx      # Modal dialog
│   │   └── ProjectCard.tsx # Project card with 3D tilt
│   ├── CustomCursor.tsx   # Custom cursor
│   ├── InteractiveBackground.tsx # Canvas particle background
│   ├── ThemeProvider.tsx  # Theme context provider
│   ├── ThemeToggle.tsx    # Theme switcher
│   └── EasterEggs.tsx     # Hidden easter eggs
├── data/
│   └── projects.ts        # Project data
└── lib/                   # Utility functions
```

## Themes

| Theme | Description |
|-------|-------------|
| Cyberpunk | Default dark neon theme |
| Light | Clean light mode |
| Synthwave | Retro 80s sunset vibes |
| Matrix | Green terminal aesthetic |
| Tokyo Night | Popular VS Code theme |
| Amber CRT | Vintage amber monitor |

## Easter Eggs

1. **Konami Code** - ↑↑↓↓←→←→BA triggers Matrix rain
2. **Name Clicker** - Click name 7 times for glitch overload
3. **Theme Cycler** - Switch themes 10 times for secret mode
4. **Logo Clicker** - Triple-click logo for ghost mode
5. **Hidden Terminal** - Ctrl+Shift+G or type in console
6. **Console Commands** - Open dev tools and type `help`

## Terminal Commands

```
help      - Show available commands
easter    - List discovered easter eggs
themes    - List available themes
theme <name> - Switch theme
clear     - Clear terminal
whoami    - Show user info
matrix    - Toggle matrix rain
glitch    - Trigger glitch effect
coffee    - Spawn coffee
```

## Deployment

Deployed on Vercel with static export (`output: "export"` in next.config.ts).

## License

MIT