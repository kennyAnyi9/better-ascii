# Action Plan - Building better-ascii-react

## Project Overview

**New Library Name:** `better-ascii-react`

**Goal:** Rebuild react-ascii-text with superior developer experience, following the design principles and API documented in this reverse engineering effort.

---

## Immediate Next Steps

### 1. Create New GitHub Repository

```bash
# On GitHub:
# - Create new repo: "better-ascii-react"
# - Add description: "A better React component for rendering ASCII text art with excellent DX"
# - Initialize with README
# - Choose MIT license

# Clone locally:
git clone https://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@github.com/kennyAnyi9/better-ascii-react.git
cd better-ascii-react
```

---

### 2. Project Initialization

#### Initialize npm package
```bash
npm init -y
```

#### Edit package.json:
```json
{
  "name": "better-ascii-react",
  "version": "0.1.0",
  "description": "A React component for rendering ASCII text art with excellent developer experience",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup",
    "test": "jest"
  },
  "keywords": [
    "react",
    "ascii",
    "text",
    "art",
    "figlet",
    "component",
    "typescript"
  ],
  "author": "Your Name",
  "license": "MIT",
  "peerDependencies": {
    "react": ">=17.0.0"
  },
  "dependencies": {
    "figlet": "^1.6.0"
  },
  "devDependencies": {
    "@types/figlet": "^1.5.6",
    "@types/react": "^18.2.0",
    "typescript": "^5.0.2",
    "tsup": "^8.0.1",
    "react": "^18.2.0"
  }
}
```

#### Install dependencies:
```bash
npm install
```

---

### 3. Set Up TypeScript

#### Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "outDir": "dist",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "demo"]
}
```

---

### 4. Set Up Build Configuration

#### Create `tsup.config.ts`:
```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react"],
  treeshake: true,
});
```

---

### 5. Create Project Structure

```bash
mkdir -p src/components
mkdir -p src/hooks
mkdir -p src/fonts
mkdir -p src/utils
mkdir -p src/animations
mkdir -p docs/reverse-engineering
mkdir -p demo
```

**Final structure:**
```
better-ascii-react/
├── src/
│   ├── components/
│   │   └── Ascii.tsx           # Main component (START HERE)
│   ├── hooks/
│   │   └── useAscii.ts         # Advanced hook (Phase 4)
│   ├── fonts/
│   │   └── index.ts            # Font exports (Phase 2)
│   ├── utils/
│   │   └── figlet.ts           # Figlet integration (Phase 1)
│   ├── animations/
│   │   └── presets.ts          # Animation presets (Phase 4)
│   └── index.tsx               # Public API
├── docs/
│   └── reverse-engineering/    # Copy all reverse eng docs here
├── demo/                        # Vite demo app (Phase 5)
├── reference/                   # OLD REPO FOR REFERENCE (see below)
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── .gitignore
└── README.md
```

---

### 6. Copy Reverse Engineering Docs

```bash
# From the old repo
cp -r reverse_engineering/* docs/reverse-engineering/
```

This preserves all your design decisions and API specs.

---

### 7. Handle the Old Repo as Reference

**RECOMMENDED APPROACH:** Include the old repo as a git submodule

```bash
# In your new repo root
git submodule add https://github.com/samuelweckstrom/react-ascii-text.git reference/original-repo

# This creates:
# better-ascii-react/reference/original-repo/ (the old codebase)
```

**Benefits:**
✅ Full access to old code for reference
✅ Doesn't clutter your new repo
✅ Can update if the old repo changes
✅ Anyone cloning your repo gets the reference too
✅ Git tracks which version you're referencing

**To clone your repo with reference (for others):**
```bash
git clone --recursive https://github.com/YOUR_USERNAME/better-ascii-react.git
```

**Alternative approaches:**

**Option B:** Just link to it in docs (lightweight)
- Add link in README: "Based on react-ascii-text"
- Reference specific files in comments
- Don't include the code

**Option C:** Copy specific files only
```bash
mkdir reference/
cp -r path/to/old/repo/react-ascii-text/src reference/original-src
```

**My recommendation: Use git submodule (Option A)**

---

## Development Phases

### Phase 1: Core Functionality (Week 1)

**Goal:** `<Ascii>Hello</Ascii>` renders static ASCII text

#### Tasks:
1. Create `src/components/Ascii.tsx`
   ```tsx
   interface AsciiProps {
     children: string;
   }

   export function Ascii({ children }: AsciiProps) {
     return <pre>{children}</pre>;
   }
   ```

2. Create `src/utils/figlet.ts`
   - Reference: `reference/original-repo/react-ascii-text/src/text.ts`
   - Integrate figlet library
   - Handle async font loading

3. Update `Ascii.tsx` to use figlet
   - Convert children to ASCII
   - Handle loading state
   - Error handling

4. Create `src/index.tsx`
   ```tsx
   export { Ascii } from './components/Ascii';
   ```

5. Test manually with simple demo

**Success Criteria:**
- ✅ `<Ascii>Hello</Ascii>` renders ASCII text
- ✅ Uses default font (Slant)
- ✅ No errors
- ✅ Builds successfully

---

### Phase 2: Font System (Week 2)

**Goal:** `<Ascii font={fonts.doom}>Hello</Ascii>` works with autocomplete

#### Tasks:
1. Copy font files from old repo
   ```bash
   cp -r reference/original-repo/react-ascii-text/src/fonts/* src/fonts/
   ```

2. Create `src/fonts/index.ts`
   - Export all fonts with proper types
   - Reference: `reference/original-repo/react-ascii-text/src/fonts.ts`
   - Generate TypeScript types

3. Update `Ascii.tsx` to accept font prop
   ```tsx
   interface AsciiProps {
     children: string;
     font?: Font;
   }
   ```

4. Update `src/index.tsx`
   ```tsx
   export { Ascii } from './components/Ascii';
   export * as fonts from './fonts';
   ```

**Success Criteria:**
- ✅ Import fonts: `import { fonts } from 'better-ascii-react'`
- ✅ TypeScript autocomplete shows all fonts
- ✅ `<Ascii font={fonts.doom}>` works
- ✅ Fonts are tree-shakeable

---

### Phase 3: Styling & Control (Week 3)

**Goal:** Full control over styling and presentation

#### Tasks:
1. Add className and style props
2. Add `as` prop for custom element
3. Support all HTML attributes
4. Handle overflow properly
5. Add aria attributes

**Success Criteria:**
- ✅ `<Ascii className="text-sm">` works with Tailwind
- ✅ `<Ascii as="div">` renders as div
- ✅ Overflow is handled gracefully
- ✅ Accessible by default

---

### Phase 4: Animation System (Week 4-5)

**Goal:** `<Ascii animate>` enables smooth animations

#### Tasks:
1. Reference animation code from old repo:
   - `reference/original-repo/react-ascii-text/src/createFrames.ts`
   - `reference/original-repo/react-ascii-text/src/horizontalFrames.ts`
   - `reference/original-repo/react-ascii-text/src/verticalFrames.ts`
   - `reference/original-repo/react-ascii-text/src/useAsciiText.ts` (requestAnimationFrame logic)

2. Create `src/animations/presets.ts`
   - Implement animation presets
   - CSS + JS hybrid approach

3. Update `Ascii.tsx` with animation props
4. Add event callbacks (onComplete, onTransition)
5. Add pause/resume functionality

**Success Criteria:**
- ✅ `<Ascii animate>` works
- ✅ Animation presets (fade, typewriter, etc.)
- ✅ Respects prefers-reduced-motion
- ✅ Event callbacks work

---

### Phase 5: Demo & Documentation (Week 6)

#### Tasks:
1. Create Vite demo app
   ```bash
   npm create vite@latest demo -- --template react-ts
   ```

2. Build interactive examples
3. Create comprehensive README
4. API documentation
5. Migration guide from old library
6. Performance benchmarks

**Success Criteria:**
- ✅ Live demo site
- ✅ All examples work
- ✅ Documentation complete
- ✅ Ready for beta release

---

## What to Reference from Old Repo

When implementing each phase, reference these files:

**Figlet Integration:**
- `reference/original-repo/react-ascii-text/src/text.ts`
- `reference/original-repo/react-ascii-text/src/utils.ts`

**Font Files:**
- `reference/original-repo/react-ascii-text/src/fonts/` (copy all)
- `reference/original-repo/react-ascii-text/src/fonts.ts` (export pattern)

**Animation Logic:**
- `reference/original-repo/react-ascii-text/src/createFrames.ts`
- `reference/original-repo/react-ascii-text/src/horizontalFrames.ts`
- `reference/original-repo/react-ascii-text/src/verticalFrames.ts`
- `reference/original-repo/react-ascii-text/src/useAsciiText.ts`

**Build Configuration:**
- `reference/original-repo/package.json`
- `reference/original-repo/react-ascii-text/tsup.config.ts`
- `reference/original-repo/tsconfig.json`

---

## Git Workflow

```bash
# Initial commit
git add .
git commit -m "Initial project setup"
git push origin main

# Feature branches
git checkout -b feat/core-component
# ... work on Phase 1
git commit -m "feat: implement basic Ascii component"
git push origin feat/core-component
# Create PR, merge to main

# Repeat for each phase
git checkout -b feat/font-system
git checkout -b feat/styling
git checkout -b feat/animations
```

---

## Testing Strategy

Each phase should include:
- Manual testing in demo app
- Unit tests for utilities
- Integration tests for component
- Visual regression tests (later)

---

## Timeline

| Phase | Duration | Milestone |
|-------|----------|-----------|
| Phase 1 | Week 1 | Static text works |
| Phase 2 | Week 2 | Font system complete |
| Phase 3 | Week 3 | Styling control |
| Phase 4 | Weeks 4-5 | Animation system |
| Phase 5 | Week 6 | Demo & docs |
| **Total** | **6 weeks** | **v1.0.0 beta** |

---

## Success Metrics

By the end, you should have:
- ✅ Better DX than original library
- ✅ Full TypeScript support
- ✅ Component-based API
- ✅ Static by default
- ✅ Comprehensive documentation
- ✅ Working demo site
- ✅ All pain points solved
- ✅ Ready for npm publish

---

## Next Immediate Action

**Right now, do this:**

1. Create GitHub repo "better-ascii-react"
2. Clone it locally
3. Run through Steps 2-5 above (initialize, setup)
4. Add old repo as git submodule
5. Copy reverse engineering docs
6. Create minimal Ascii.tsx
7. Push to GitHub
8. Come back for Phase 1 implementation

**You can complete all of this in < 1 hour!**
