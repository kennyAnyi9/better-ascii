# Current API Analysis

## Hook Signature

```typescript
function useAsciiText({
  text,
  animationCharacters,
  animationCharacterSpacing,
  animationDelay,
  animationDirection,
  animationInterval,
  animationIteration,
  animationLoop,
  animationSpeed,
  fadeInOnly,
  fadeOutOnly,
  font,
  isAnimated,
  isPaused,
}: UseAsciiTextArgs): React.MutableRefObject<HTMLPreElement | undefined>
```

## Issues with Current API

### 1. Too Many Props at Top Level
- 14 different configuration options
- No grouping or organization
- Overwhelming for new users
- Hard to remember which prop does what

### 2. Confusing Naming
- `animationIteration` vs `animationLoop` - what's the difference?
- `fadeInOnly` and `fadeOutOnly` - why not just `direction`?
- `isAnimated` vs all the animation props - redundant?
- `animationCharacters` - what characters? For what?

### 3. String-Based Configuration
- `font` is a string (no type safety)
- `animationDirection` is a string union (but passed as string)
- No autocomplete
- Easy to typo

### 4. Return Value is a Ref
- Must attach to a `<pre>` element
- Can't customize the element
- Can't apply className easily
- Disconnects props from rendering

### 5. Animation Default Behavior
- `isAnimated` defaults to `true`
- Text animates unless you explicitly disable it
- Counterintuitive for static use cases

### 6. Text as Prop Instead of Children
```typescript
useAsciiText({ text: "Hello" })
```
Not:
```jsx
<Component>Hello</Component>
```

### 7. No TypeScript Guidance
- Hovering over the hook doesn't show helpful info
- JSDoc comments are minimal
- Prop types are defined but not well documented
- No examples in intellisense

### 8. No Event Callbacks
- Can't know when animation completes
- Can't hook into transitions
- No way to coordinate with other UI

### 9. State Management is Opaque
- Uses `useRef` for animation state
- No way to control animation externally
- Can only pause/unpause via prop

### 10. No Styling Control
- Can't control text size
- Can't handle overflow
- Can't apply CSS easily
- Must style the `<pre>` element separately

## What Works Well

✅ Figlet integration is solid
✅ Font variety is excellent
✅ Animation system is smooth (requestAnimationFrame)
✅ Supports multiple text transitions
✅ Ref-based approach avoids re-renders (performance)

## What Needs Improvement

❌ API surface is too large and confusing
❌ Hook + ref pattern fights React conventions
❌ No TypeScript DX
❌ Animation by default
❌ No styling control
❌ No accessibility features
❌ Font loading is not optimized
❌ No event system
❌ Prop naming is unclear
❌ No composition or extensibility

## Migration Considerations

When rebuilding:
- Consider keeping hook for advanced users?
- Provide codemod for migration?
- Document breaking changes clearly
- Show side-by-side comparison of old vs new API
