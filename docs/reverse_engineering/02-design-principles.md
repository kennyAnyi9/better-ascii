# Design Principles for Rebuild

## Core Principles

### 1. Component-First API
- Use standard React component pattern
- Text as children, not configuration
- Props where you expect them
- Standard HTML attributes work naturally

### 2. Static by Default, Animate on Opt-In
- Default behavior: render static ASCII text
- Animation is a feature you enable, not something you disable
- `<Ascii>Hello</Ascii>` should render static text
- `<Ascii animate>Hello</Ascii>` should animate

### 3. TypeScript-First Developer Experience
- Full type safety on all props
- Font names as literal types with autocomplete
- Helpful JSDoc comments on every prop
- IDE should teach you the API

### 4. Progressive Disclosure
- Simple things should be simple
- Complex things should be possible
- Don't overwhelm users with options
- Layer complexity through composable props

### 5. Standards-Compliant
- className and style work as expected
- Can use with Tailwind, CSS modules, styled-components
- Respects semantic HTML
- Accessible by default

### 6. Styling Control
- Full control over text size, color, overflow
- CSS classes apply naturally
- No fighting the framework
- User has final say on presentation

### 7. Composition Over Configuration
- Prefer composable components over config objects
- Small, focused props over large config
- Can wrap and extend easily
- Plays well with other libraries

### 8. Performance & Bundle Size
- Only load fonts you use (tree-shakeable)
- No unnecessary re-renders
- Optimize for common cases
- Don't sacrifice DX for micro-optimizations

## Anti-Patterns to Avoid

❌ Text in configuration instead of children
❌ Animation enabled by default
❌ String-based APIs without type safety
❌ Prop explosion (too many props at top level)
❌ Fighting standard HTML/CSS patterns
❌ Poor TypeScript support
❌ Magic behavior that's hard to understand
