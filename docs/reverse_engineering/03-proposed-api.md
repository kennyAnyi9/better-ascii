# Proposed API Design

## Component-Based API

### Basic Usage

#### Static Text (Default)
```jsx
import { Ascii } from 'react-ascii-text'

function App() {
  return <Ascii>Hello World</Ascii>
}
```

**Behavior:**
- Renders static ASCII text
- Uses default font (Slant)
- Renders as `<pre>` element
- No animation

---

### With Styling

#### Using className
```jsx
<Ascii className="text-sm text-blue-500">
  Hello World
</Ascii>
```

**Behavior:**
- Full CSS control
- Works with Tailwind, CSS modules, etc.
- className applied to underlying element

#### Handling Overflow
```jsx
<Ascii className="max-w-md overflow-auto">
  Very Long Text That Might Overflow
</Ascii>
```

---

### Font Selection

```jsx
import { Ascii, fonts } from 'react-ascii-text'

<Ascii font={fonts.alligator}>Hello</Ascii>
<Ascii font={fonts.doom}>World</Ascii>
<Ascii font={fonts.starWars}>React</Ascii>
```

**Behavior:**
- TypeScript autocomplete for all fonts
- Tree-shakeable (only import fonts you use)
- Type-safe font names

---

### Animation (Opt-In)

#### Simple Animation
```jsx
<Ascii animate>Hello World</Ascii>
```

**Behavior:**
- Enables default animation (fade)
- Single text, animates in once

#### With Transition Between Multiple Texts
```jsx
<Ascii animate transition={["React", "ASCII", "Text"]}>
  React
</Ascii>
```

**Behavior:**
- Animates between multiple strings
- Loops by default
- Children shows initial text

#### Custom Animation Preset
```jsx
<Ascii animate="typewriter">Hello</Ascii>
<Ascii animate="fade">Hello</Ascii>
<Ascii animate="reveal">Hello</Ascii>
```

**Behavior:**
- Predefined animation presets
- Sensible defaults for each type

#### Advanced Animation Control
```jsx
<Ascii
  animate="fade"
  speed={50}
  duration={1000}
  loop={true}
  onComplete={() => console.log('Animation done')}
>
  Hello
</Ascii>
```

---

### Element Customization

#### Change Underlying Element
```jsx
<Ascii as="div">Hello</Ascii>
<Ascii as="code">Hello</Ascii>
```

**Behavior:**
- Default is `<pre>`
- Can render as any HTML element
- Maintains ASCII rendering

---

### Accessibility

```jsx
<Ascii aria-label="ASCII art greeting">
  Hello
</Ascii>

<Ascii role="img" aria-label="Decorative ASCII text">
  Welcome
</Ascii>
```

**Behavior:**
- Standard ARIA attributes work
- Proper semantic HTML

---

### Complete Example

```jsx
import { Ascii, fonts } from 'react-ascii-text'

function Hero() {
  return (
    <Ascii
      font={fonts.doom}
      animate="fade"
      transition={["React", "ASCII", "Text"]}
      speed={30}
      className="text-green-400 text-sm max-w-2xl mx-auto"
      onComplete={() => console.log('Animation complete')}
      aria-label="Animated ASCII text showing React, ASCII, Text"
    >
      React
    </Ascii>
  )
}
```

---

## Prop Definitions

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string` | required | The text to render as ASCII |
| `font` | `Font` | `fonts.slant` | Font to use (typed import from library) |
| `className` | `string` | `undefined` | CSS classes to apply |
| `style` | `CSSProperties` | `undefined` | Inline styles |
| `as` | `ElementType` | `'pre'` | HTML element to render as |

### Animation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animate` | `boolean \| AnimationType` | `false` | Enable animation or specify type |
| `transition` | `string[]` | `undefined` | Array of texts to transition between |
| `speed` | `number` | `30` | Animation frame speed |
| `duration` | `number` | `1000` | Time between transitions (ms) |
| `loop` | `boolean` | `true` | Whether to loop animations |
| `direction` | `'horizontal' \| 'vertical' \| ...` | `'horizontal'` | Animation direction |

### Event Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onComplete` | `() => void` | `undefined` | Called when animation completes |
| `onTransition` | `(text: string) => void` | `undefined` | Called on each text transition |

### All Standard HTML Attributes
- `aria-*`
- `data-*`
- `id`
- `role`
- etc.

---

## Animation Types

```typescript
type AnimationType =
  | 'fade'
  | 'typewriter'
  | 'reveal'
  | 'slide'
  | 'matrix'
```

Each type has sensible defaults but can be customized with speed, duration, etc.

---

## Font System

```typescript
import { fonts } from 'react-ascii-text'

// All fonts available with autocomplete
fonts.alligator
fonts.doom
fonts.slant
fonts.starWars
fonts.bigMoneySw
// ... 290+ fonts with TypeScript support
```

**Benefits:**
- Tree-shakeable (bundler only includes used fonts)
- Type-safe
- Autocomplete in IDE
- Clear import path
