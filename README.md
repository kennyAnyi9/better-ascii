# Better-ascii

![image](./public/better-ascii.png)

A React component for rendering ASCII text art.

## Installation

```bash
npm install better-ascii
```

## Usage

```tsx
import { Ascii } from 'better-ascii';

function App() {
  return <Ascii>Hello World</Ascii>;
}
```

### With Font Selection

```tsx
import { Ascii, fonts } from 'better-ascii';

function App() {
  return (
    <div>
      <Ascii font={fonts.ansiShadow}>Shadow</Ascii>
      <Ascii font={fonts.alpha}>Alpha</Ascii>
      <Ascii font={fonts.deltaCorpsPriest1}>Delta</Ascii>
    </div>
  );
}
```

### With Styling

```tsx
import { Ascii, fonts } from 'better-ascii';

function App() {
  return (
    <Ascii
      font={fonts.ansiShadow}
      className="text-green-400 bg-black p-4"
    >
      Styled
    </Ascii>
  );
}
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | required | The text to render as ASCII art |
| `font` | `Font` | Delta Corps Priest 1 | Font to use (import from `fonts`) |
| `className` | `string` | `undefined` | CSS classes to apply |
| `style` | `CSSProperties` | `undefined` | Inline styles (merged with defaults) |
| `...props` | `HTMLAttributes<HTMLPreElement>` | - | All standard `<pre>` attributes |

### Available Fonts

- `fonts.ansiShadow`
- `fonts.deltaCorpsPriest1` (default)
- `fonts.alpha`

### Accessibility

- `role="img"` with `aria-label` on rendered output
- `aria-busy="true"` during loading
- `role="alert"` for errors

### Next.js

Works with the App Router out of the box — `"use client"` is included in the bundle.

## Development

```bash
npm install
npm run build
npm run dev   # watch mode
```

## License

MIT
