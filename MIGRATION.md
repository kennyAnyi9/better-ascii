# Migration Guide: react-ascii-text → better-ascii-react

This guide will help you migrate from `react-ascii-text` to `better-ascii-react`.

## Why Migrate?

**better-ascii-react** provides a significantly improved developer experience:

- ✅ **Component-based API** instead of hook-based
- ✅ **289 fonts** with TypeScript autocomplete
- ✅ **Simpler API** - fewer props, more intuitive
- ✅ **Better TypeScript support**
- ✅ **CSS-based animations** (smoother performance)
- ✅ **Full HTML attribute support**
- ✅ **Accessibility built-in**

## Quick Comparison

### Before (react-ascii-text)
```tsx
import { useAsciiText } from 'react-ascii-text';
import { alligator } from 'react-ascii-text/lib/fonts';

function App() {
  const asciiRef = useAsciiText({
    text: "Hello",
    font: alligator,
    animationSpeed: 30,
    animationDelay: 2000,
    animationDirection: "horizontal",
    animationCharacters: "/*+#",
    isAnimated: true,
  });

  return <pre ref={asciiRef}></pre>;
}
```

### After (better-ascii-react)
```tsx
import { Ascii, fonts } from 'better-ascii-react';

function App() {
  return (
    <Ascii font={fonts.alligator} animate>
      Hello
    </Ascii>
  );
}
```

## Step-by-Step Migration

### 1. Install the new package

```bash
npm uninstall react-ascii-text
npm install better-ascii-react
```

### 2. Update imports

**Before:**
```tsx
import { useAsciiText } from 'react-ascii-text';
import { doom, slant } from 'react-ascii-text/lib/fonts';
```

**After:**
```tsx
import { Ascii, fonts } from 'better-ascii-react';
```

### 3. Replace hook usage with component

**Before:**
```tsx
const asciiRef = useAsciiText({
  text: "Hello World",
  font: doom,
  isAnimated: false,
});

return <pre ref={asciiRef}></pre>;
```

**After:**
```tsx
return (
  <Ascii font={fonts.doom}>
    Hello World
  </Ascii>
);
```

### 4. Update font imports

Font names are now camelCased in the `fonts` namespace:

| Old | New |
|-----|-----|
| `doom` | `fonts.doom` |
| `slant` | `fonts.slant` |
| `starWars` | `fonts.starWars` |
| `bigChief` | `fonts.bigChief` |
| `threeD` | `fonts.threeD` |

All 289 fonts are available with autocomplete!

### 5. Update animations

**Before:**
```tsx
const asciiRef = useAsciiText({
  text: "Hello",
  font: doom,
  isAnimated: true,
  animationSpeed: 30,
  animationDelay: 2000,
  animationDirection: "horizontal",
  animationCharacters: "/*+#",
  fadeInOnly: true,
});
```

**After:**
```tsx
<Ascii
  font={fonts.doom}
  animate="fade"
  onAnimationComplete={() => console.log('Done!')}
>
  Hello
</Ascii>
```

Animation presets available:
- `animate` or `animate="fade"` - Fade in effect
- `animate="typewriter"` - Typewriter effect
- `animate="slide"` - Slide in effect

### 6. Add styling

**Before:**
```tsx
return (
  <pre ref={asciiRef} className="my-class" style={{ color: 'green' }}>
  </pre>
);
```

**After:**
```tsx
<Ascii
  font={fonts.doom}
  className="my-class"
  style={{ color: 'green' }}
>
  Hello
</Ascii>
```

### 7. Custom element rendering

**Before:**
```tsx
const asciiRef = useAsciiText({ text: "Hello" });
return <div ref={asciiRef}></div>; // Doesn't work well
```

**After:**
```tsx
<Ascii as="div">Hello</Ascii> // Works perfectly!
```

## Prop Mapping

| react-ascii-text | better-ascii-react | Notes |
|------------------|-------------------|-------|
| `text` | `children` | Now uses children prop |
| `font` | `font` | Now from `fonts` namespace |
| `isAnimated` | `animate` | Simpler boolean or preset name |
| `animationSpeed` | N/A | Fixed presets |
| `animationDelay` | N/A | Fixed presets |
| `animationDirection` | N/A | CSS-based animations |
| `animationCharacters` | N/A | CSS-based animations |
| `animationInterval` | N/A | CSS-based animations |
| `animationIteration` | N/A | CSS-based animations |
| `animationLoop` | N/A | CSS-based animations |
| `fadeInOnly` | `animate="fade"` | Use fade preset |
| `fadeOutOnly` | N/A | Use CSS if needed |
| `isPaused` | N/A | Control with state/conditional rendering |
| N/A | `as` | NEW: Custom element rendering |
| N/A | `className` | NEW: Direct className support |
| N/A | `style` | NEW: Direct style support |
| N/A | `onAnimationComplete` | NEW: Animation callback |
| N/A | `...props` | NEW: All HTML attributes supported |

## Breaking Changes

### 1. Animations are simplified

The old library had complex animation configuration with many props. The new library uses CSS-based presets for better performance and simplicity.

**If you need custom animations**, use CSS:
```tsx
<Ascii
  font={fonts.doom}
  style={{
    animation: 'my-custom-animation 2s ease-in',
  }}
>
  Hello
</Ascii>
```

### 2. No ref-based API

The new library doesn't use refs. The component manages everything internally.

**Before:**
```tsx
const asciiRef = useAsciiText({ text: "Hello" });
// Access ref: asciiRef.current?.textContent
```

**After:**
```tsx
// State is managed internally
// Use onAnimationComplete for callbacks
<Ascii onAnimationComplete={() => console.log('Done!')}>
  Hello
</Ascii>
```

### 3. Static by default

**Before:** Animations were enabled by default
**After:** Static by default, opt-in to animations with `animate` prop

### 4. Font imports

Fonts are now in a centralized `fonts` namespace instead of individual imports.

## Common Patterns

### Multiple texts transitioning

**Before:**
```tsx
const asciiRef = useAsciiText({
  text: ["React", "ASCII", "Text"],
  isAnimated: true,
});
```

**After:**
```tsx
// Use state and key prop for transitions
const [index, setIndex] = useState(0);
const texts = ["React", "ASCII", "Text"];

<Ascii
  key={texts[index]}
  animate="fade"
  onAnimationComplete={() => setIndex((i) => (i + 1) % texts.length)}
>
  {texts[index]}
</Ascii>
```

### Conditional rendering

**Before:**
```tsx
const asciiRef = useAsciiText({
  text: showAscii ? "Hello" : "",
});
```

**After:**
```tsx
{showAscii && <Ascii>Hello</Ascii>}
```

### Pausing animations

**Before:**
```tsx
const asciiRef = useAsciiText({
  text: "Hello",
  isPaused: isPaused,
});
```

**After:**
```tsx
// Control with conditional rendering or CSS
<Ascii
  animate={!isPaused}
  style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
>
  Hello
</Ascii>
```

## Full Example Migration

### Before
```tsx
import { useAsciiText } from 'react-ascii-text';
import { doom, starWars, slant } from 'react-ascii-text/lib/fonts';

function Hero() {
  const asciiRef1 = useAsciiText({
    text: "Welcome",
    font: doom,
    isAnimated: true,
    animationSpeed: 30,
    fadeInOnly: true,
  });

  const asciiRef2 = useAsciiText({
    text: "Hello",
    font: starWars,
    isAnimated: false,
  });

  return (
    <div>
      <pre ref={asciiRef1} className="hero-text"></pre>
      <pre ref={asciiRef2} style={{ color: 'green' }}></pre>
    </div>
  );
}
```

### After
```tsx
import { Ascii, fonts } from 'better-ascii-react';

function Hero() {
  return (
    <div>
      <Ascii
        font={fonts.doom}
        animate="fade"
        className="hero-text"
      >
        Welcome
      </Ascii>

      <Ascii
        font={fonts.starWars}
        style={{ color: 'green' }}
      >
        Hello
      </Ascii>
    </div>
  );
}
```

## Need Help?

- Check the [README](./README.md) for full API documentation
- See the [demo app](./demo) for interactive examples
- Report issues on [GitHub](https://github.com/kennyAnyi9/better-ascii-react/issues)

## Summary

The migration is straightforward:
1. Change from hook → component
2. Use `children` instead of `text` prop
3. Import fonts from `fonts` namespace
4. Simplify animation props
5. Enjoy better DX! 🎉
