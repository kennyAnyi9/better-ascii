# Pain Points - Current Implementation

## Developer Experience Issues

### 1. Non-Intuitive Demo UI
- Demo site doesn't clearly show different use cases
- Hard to understand what each prop does visually
- Examples are not interactive or easy to modify

### 2. Poor Documentation Experience
- README has information but not well-organized
- Had to constantly switch between code and README
- No interactive examples or playground

### 3. Zero TypeScript Intellisense
- Hovering over `useAsciiText` doesn't show available props
- No autocomplete for configuration options
- Font names are strings with no type safety
- Had to memorize or look up prop names

### 4. Unexpected Default Behavior
- **Text animates by default** - This is counterintuitive
- Expected: Static text with opt-in animation
- Got: Animation running immediately
- No clear way to disable animation without reading docs

### 5. No Control Over Presentation
- Text size cannot be controlled
- Text overflow happens with no way to handle it
- Cannot apply standard CSS classes easily
- Stuck with whatever the hook renders

### 6. Disconnected API Pattern
- Hook configuration is separate from rendering
- Text content defined in hook, not as children
- Props and element are in different places
- Doesn't follow standard React patterns

### 7. Limited Customization
- Cannot control the underlying HTML element
- No way to add aria labels or accessibility features
- Cannot wrap or compose with other components easily
- Styling is an afterthought

## Core Problem

**The current API uses a hook + ref pattern that fights against React's component model.**

Users expect:
```jsx
<Component className="..." prop={value}>
  Content here
</Component>
```

They get:
```jsx
const ref = useHook({ text: "Content here", prop: value })
<pre ref={ref}></pre>
```

This creates friction at every step of the development process.
