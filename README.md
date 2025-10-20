# better-ascii-react

A better React component for rendering ASCII text art with excellent developer experience.

## Current Status: All Phases Complete ✅

**Better ASCII React is production-ready!**

Complete feature set:
- ✅ Static ASCII text rendering
- ✅ TypeScript support with full type definitions
- ✅ ESM and CJS builds
- ✅ Default font: Delta Corps Priest 1
- ✅ **289 fonts available with autocomplete**
- ✅ **Font selection with `font` prop**
- ✅ **Custom element rendering with `as` prop**
- ✅ **Full HTML attribute support**
- ✅ **Accessibility defaults (ARIA)**
- ✅ **Protected styles** (monospace enforced)
- ✅ **Animation support** (fade, typewriter, slide)
- ✅ **Animation callbacks** (onAnimationComplete)
- ✅ **Respects prefers-reduced-motion**
- ✅ **Comprehensive documentation**
- ✅ **Migration guide from react-ascii-text**

## Installation

```bash
npm install better-ascii-react
```

**Migrating from react-ascii-text?** Check out the [Migration Guide](./MIGRATION.md) for a step-by-step walkthrough.

## Usage

### Basic Usage

```tsx
import { Ascii } from 'better-ascii-react';

function App() {
  return <Ascii>Hello World</Ascii>;
}
```

### With Font Selection

```tsx
import { Ascii, fonts } from 'better-ascii-react';

function App() {
  return (
    <div>
      <Ascii font={fonts.doom}>DOOM</Ascii>
      <Ascii font={fonts.starWars}>Star Wars</Ascii>
      <Ascii font={fonts.slant}>Slant</Ascii>
    </div>
  );
}
```

**289 fonts available** with full TypeScript autocomplete! Try `fonts.` in your IDE to see all available fonts.

### Advanced Usage

```tsx
import { Ascii, fonts } from 'better-ascii-react';

function App() {
  return (
    <div>
      {/* Custom element */}
      <Ascii as="div" font={fonts.doom}>DOOM</Ascii>

      {/* With Tailwind classes */}
      <Ascii
        font={fonts.starWars}
        className="text-green-400 bg-black p-4"
      >
        Star Wars
      </Ascii>

      {/* With animations */}
      <Ascii animate font={fonts.doom}>
        Animated Fade
      </Ascii>

      <Ascii
        animate="typewriter"
        onAnimationComplete={() => console.log('Animation complete!')}
      >
        Typewriter Effect
      </Ascii>

      {/* With HTML attributes */}
      <Ascii
        font={fonts.slant}
        id="my-ascii"
        data-testid="ascii-art"
        onClick={() => console.log('Clicked!')}
      >
        Interactive
      </Ascii>

      {/* Overflow handling */}
      <Ascii
        font={fonts.banner}
        className="max-w-md overflow-auto"
      >
        Very Long Text
      </Ascii>
    </div>
  );
}
```

## Features

- ✅ Simple component-based API
- ✅ TypeScript support with full autocomplete
- ✅ Loading and error states
- ✅ Customizable with className and style props
- ✅ **289 fonts** with autocomplete
- ✅ Tree-shakeable font imports
- ✅ **Custom element rendering** (`as` prop)
- ✅ **Full HTML attribute support** (id, data-*, onClick, etc.)
- ✅ **Protected styles** - monospace enforced, prevents breaking
- ✅ **Accessible by default** - proper ARIA attributes
- ✅ **Animation support** - fade, typewriter, slide presets
- ✅ **Animation callbacks** - onAnimationComplete
- ✅ **Respects prefers-reduced-motion** - accessibility first

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Development mode (watch)
npm run dev
```

## Project Structure

```
better-ascii-react/
├── src/
│   ├── components/
│   │   └── ascii.tsx                # Main component
│   ├── fonts/
│   │   ├── index.ts                 # Font exports (289 fonts)
│   │   ├── delta-corps-priest-1.ts  # Default font
│   │   ├── doom.ts
│   │   ├── star-wars.ts
│   │   └── ... (286 more fonts)
│   ├── utils/
│   │   ├── figlet.ts                # Figlet integration
│   │   └── animation.ts             # Animation utilities
│   ├── types.ts                     # Type definitions
│   └── index.tsx                    # Public API
├── docs/
│   └── reverse_engineering/         # Design documentation
├── MIGRATION.md                     # Migration guide
└── README.md                        # You are here
```

## Roadmap

- [x] Phase 1: Core functionality
- [x] Phase 2: Font system (289 fonts!)
- [x] Phase 3: Styling & control
- [x] Phase 4: Animation system
- [x] Phase 5: Demo & documentation

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | required | The text to render as ASCII art |
| `font` | `Font` | Delta Corps Priest 1 | Font to use (import from `fonts`) |
| `as` | `ElementType` | `"pre"` | HTML element to render as |
| `animate` | `boolean \| 'fade' \| 'typewriter' \| 'slide'` | `false` | Enable animation with preset |
| `onAnimationComplete` | `() => void` | `undefined` | Called when animation finishes |
| `className` | `string` | `undefined` | CSS classes to apply |
| `style` | `CSSProperties` | `undefined` | Inline styles (merged with defaults) |
| `...props` | `HTMLAttributes` | - | All standard HTML attributes |

### Default Styles

The component applies these default styles to ensure ASCII art renders correctly:

```tsx
{
  fontFamily: 'monospace',  // Required for alignment
  whiteSpace: 'pre',        // Preserves spaces and line breaks
  margin: 0,                // No default margin
}
```

You can override these with the `style` prop if needed.

### Accessibility

Default ARIA attributes:
- `role="img"` - Identifies ASCII art as an image
- `aria-label="ASCII art: {text}"` - Provides text alternative
- `aria-busy="true"` during loading
- `role="alert"` for errors

**Respects user preferences:**
- Automatically disables animations if user has `prefers-reduced-motion` enabled
- All animations are CSS-based for smooth performance

### Animations

Available animation presets:
- `animate` or `animate="fade"` - Fade in with slight upward movement (0.8s)
- `animate="typewriter"` - Typewriter effect revealing text (1.2s)
- `animate="slide"` - Slide in from left (0.6s)

```tsx
// Simple fade animation
<Ascii animate>Hello</Ascii>

// Typewriter with callback
<Ascii
  animate="typewriter"
  onAnimationComplete={() => console.log('Done!')}
>
  Hello World
</Ascii>
```

## Why better-ascii-react?

This library was built from the ground up as a better alternative to `react-ascii-text`:

- **Component-based API** - No more ref management, just use `<Ascii>` like any React component
- **289 fonts with autocomplete** - Full TypeScript support makes font selection a breeze
- **Simpler API** - Fewer props, more intuitive, easier to learn
- **Better performance** - CSS-based animations instead of JavaScript
- **Modern React** - Built for React 18+ with latest best practices
- **Developer experience first** - Every decision prioritizes DX

**Migrating?** See the [Migration Guide](./MIGRATION.md).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Links

- [GitHub Repository](https://github.com/kennyAnyi9/better-ascii-react)
- [Migration Guide](./MIGRATION.md)
- [NPM Package](https://www.npmjs.com/package/better-ascii-react) (coming soon)

---

Built with ❤️ by [Kennedy Anyi](https://github.com/kennyAnyi9)
