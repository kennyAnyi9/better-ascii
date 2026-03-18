---
name: No destructive actions without explicit request
description: Do not delete files or take destructive actions unless the user explicitly asks for it
type: feedback
---

Do not delete files or take destructive cleanup actions unless the user explicitly asks for it. Just because something is unused doesn't mean it should be removed.

**Why:** User was frustrated when I tried to bulk-delete 286 font files that weren't exported. They wanted the files kept for future gradual rollout — they only wanted the index trimmed, not the files removed.

**How to apply:** When something is unused or unreachable, note it but don't act on it. Only clean up when directly asked.
