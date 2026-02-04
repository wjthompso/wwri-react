# QUICK ACTION: Right Sidebar Domain Default Expansion

## The Issue
Users don't realize that domains in the right sidebar indicator navigation can be expanded/collapsed because all domains are collapsed by default.

## The Fix
Make one domain (e.g., "Infrastructure") expanded by default when the app loads.

## Why This Matters
- **Discoverability:** Users need to see an expanded state to understand the interaction pattern
- **User Education:** Without this visual cue, users may never discover the expand/collapse functionality
- **Quick Win:** Small effort, high UX impact

## Implementation Details

### Files to Modify
- `src/components/RightSidebar.tsx` (or related component that manages domain state)
- Possibly `src/components/RightSidebar/layouts/` if the layout components manage expansion state

### Changes Needed
1. Find where domain expansion state is initialized
2. Set one domain (suggest "Infrastructure") to expanded by default
3. Ensure this only happens on initial load, not on every render
4. Preserve user's ability to collapse/expand all domains

### Example Approach (Pseudocode)
```typescript
// In component state initialization
const [expandedDomains, setExpandedDomains] = useState<string[]>(() => {
  // On initial load, expand Infrastructure domain
  return ['Infrastructure']; // or whatever the domain key is
});
```

### Testing
- [ ] Load app fresh - Infrastructure should be expanded
- [ ] Collapse Infrastructure - should collapse
- [ ] Expand another domain - should expand
- [ ] Refresh page - Infrastructure should be expanded again (or persist if we have that)

## Estimated Effort
~1 hour (assuming straightforward state management)

## Priority
**HIGH** - Mentioned specifically by Cat Fong as important UX improvement

---

**Source:** Meeting with Cat Fong, Feb 3, 2026  
**Related Docs:** 
- `docs/meeting-notes/2026-02-03-cat-fong-meeting.md`
- `plans/public-website-dev-plan.md`
