# Publishing Guide

This guide explains how to publish **better-ascii-react** to NPM and make it available for other developers to install.

## Prerequisites

1. **NPM Account**: You need an NPM account
   - Sign up at https://www.npmjs.com/signup if you don't have one
   - Verify your email address

2. **NPM CLI**: Make sure you have npm installed
   ```bash
   npm --version  # Should be 6.0.0 or higher
   ```

## Pre-Publishing Checklist

Before publishing, ensure:

- [ ] All tests pass (run `npm test` when tests are added)
- [ ] Build succeeds: `npm run build`
- [ ] Version number is correct in `package.json`
- [ ] README.md is up to date
- [ ] MIGRATION.md is accurate
- [ ] All changes are committed to git
- [ ] You've tagged the release in git

## Step 1: Login to NPM

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email
- 2FA code (if enabled)

Verify you're logged in:
```bash
npm whoami
```

## Step 2: Test the Package Locally (Optional but Recommended)

Before publishing to NPM, test the package locally:

### Method 1: Using `npm link`

```bash
# In the better-ascii-react directory
npm run build
npm link

# In a test project
npm link better-ascii-react

# Test it works, then unlink
npm unlink better-ascii-react

# Back in better-ascii-react
npm unlink
```

### Method 2: Using `npm pack`

```bash
# Create a tarball
npm pack

# This creates better-ascii-react-0.1.0.tgz
# In your test project:
npm install /path/to/better-ascii-react-0.1.0.tgz

# Test it works!
```

## Step 3: Verify Package Contents

Check what will be published:

```bash
npm pack --dry-run
```

This shows:
- All files that will be included
- Package size
- Tarball name

Make sure:
- Only `dist/`, `LICENSE`, `README.md`, `MIGRATION.md`, and `package.json` are included
- No source files, demo, or dev files are included
- Size is reasonable (should be ~1.9MB)

## Step 4: Update Version (Semantic Versioning)

Choose the appropriate version bump:

```bash
# For bug fixes (0.1.0 → 0.1.1)
npm version patch

# For new features (0.1.0 → 0.2.0)
npm version minor

# For breaking changes (0.1.0 → 1.0.0)
npm version major
```

This will:
- Update `package.json`
- Create a git commit
- Create a git tag

## Step 5: Publish to NPM

### For First Release (or if package name is available):

```bash
npm publish
```

### For Scoped Package (if you want @yourname/better-ascii-react):

```bash
npm publish --access public
```

## Step 6: Push to GitHub

```bash
git push origin main
git push origin --tags
```

## Step 7: Verify Publication

1. Visit: https://www.npmjs.com/package/better-ascii-react
2. Check the package page looks correct
3. Try installing it:
   ```bash
   npm install better-ascii-react
   ```

## Post-Publishing

### Create a GitHub Release

1. Go to https://github.com/kennyAnyi9/better-ascii-react/releases
2. Click "Create a new release"
3. Select the tag you just created
4. Write release notes highlighting:
   - New features
   - Bug fixes
   - Breaking changes (if any)
   - Migration instructions

### Share the News

- Tweet about it
- Post on Reddit (r/reactjs)
- Share in Discord/Slack communities
- Add to awesome-react lists

## Version Management

### Semantic Versioning (SemVer)

Follow this pattern: `MAJOR.MINOR.PATCH`

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backwards compatible
- **PATCH** (0.0.1): Bug fixes, backwards compatible

### Pre-release Versions

For testing before official release:

```bash
# Alpha release
npm version 0.2.0-alpha.0
npm publish --tag alpha

# Beta release
npm version 0.2.0-beta.0
npm publish --tag beta

# Release candidate
npm version 0.2.0-rc.0
npm publish --tag rc
```

Users can install pre-releases:
```bash
npm install better-ascii-react@alpha
npm install better-ascii-react@beta
```

## Troubleshooting

### "Package already exists"

If the package name is taken:
1. Choose a different name in `package.json`
2. Or use a scoped package: `@yourname/better-ascii-react`

### "You must verify your email"

1. Check your email for verification link
2. Click the link to verify
3. Try publishing again

### "Need to provide auth"

Run `npm login` again to re-authenticate.

### "npm ERR! 402 Payment Required"

Your account might require 2FA. Enable it at:
https://www.npmjs.com/settings/yourname/tfa

## Unpublishing (Use Carefully!)

You can only unpublish within 72 hours:

```bash
# Unpublish a specific version
npm unpublish better-ascii-react@0.1.0

# Unpublish entire package (CAREFUL!)
npm unpublish better-ascii-react --force
```

**Note**: Unpublishing is discouraged. Use `npm deprecate` instead:

```bash
npm deprecate better-ascii-react@0.1.0 "Please upgrade to 0.2.0"
```

## Quick Publish Checklist

```bash
# 1. Build and test
npm run build

# 2. Preview package
npm pack --dry-run

# 3. Update version
npm version patch  # or minor/major

# 4. Publish
npm publish

# 5. Push to git
git push origin main --tags

# 6. Create GitHub release
# Visit: https://github.com/kennyAnyi9/better-ascii-react/releases/new
```

## Continuous Integration (Future)

Consider setting up automated publishing with GitHub Actions:
- Auto-publish on git tags
- Run tests before publishing
- Auto-generate release notes

---

**Ready to publish?** Just run:

```bash
npm login
npm run build
npm publish
```

Your package will be live on NPM within minutes! 🚀
