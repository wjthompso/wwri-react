# Task Dependencies & Workflow

Visual representation of how tasks relate to each other.

---

## Task Dependency Graph

```
┌─────────────────────────────────────────────────────────────────┐
│                     INDEPENDENT TASKS                            │
│                  (Can start immediately)                         │
└─────────────────────────────────────────────────────────────────┘
                              │
           ┌──────────────────┼──────────────────┐
           ▼                  ▼                  ▼
      ┌────────┐         ┌────────┐        ┌────────┐
      │   T2   │         │   T1   │        │   T3   │
      │  Pages │         │  Logo  │        │  Hero  │
      │ & Nav  │         │Branding│        │ Image  │
      └────┬───┘         └────┬───┘        └────┬───┘
           │                  │                  │
           │                  │                  ▼
           │                  │             ┌────────┐
           │                  │             │   T4   │
           │                  │             │ Colors │
           │                  │             └────────┘
           │                  │
           ▼                  ▼
      ┌────────┐         ┌────────┐
      │   T5   │         │   T8   │
      │Content │         │  Map   │
      │  Text  │         │ Fixes  │
      └────┬───┘         └────────┘
           │
           ▼
      ┌────────┐
      │   T6   │
      │ Eight  │
      │Domains │
      └────┬───┘
           │
           ▼
      ┌────────┐
      │   T7   │
      │ Domain │
      │ Pages  │
      └────────┘
```

---

## Parallel Work Batches

### Batch 1: Foundation (No dependencies)
Can all work in parallel once assets received:

```
┌─────────┐  ┌─────────┐  ┌─────────┐
│   T1    │  │   T2    │  │   T3    │
│  Logo   │  │  Pages  │  │  Hero   │
│Branding │  │  & Nav  │  │  Image  │
└─────────┘  └─────────┘  └─────────┘
```

**Requirements:**
- T1: Need WRI logo from Cat
- T2: Can start immediately
- T3: Need hero image from Cat

---

### Batch 2: Styling & Content
T4 depends on T3; T5 depends on T2:

```
     T3 (Hero)          T2 (Pages)
         │                  │
         ▼                  ▼
    ┌─────────┐        ┌─────────┐
    │   T4    │        │   T5    │
    │ Colors  │        │ Content │
    └─────────┘        └─────────┘
```

**Requirements:**
- T4: Needs hero image to extract color palette
- T5: Needs content document from Cat + pages from T2

---

### Batch 3: Domain Updates
Linear sequence:

```
T5 (Content) → T6 (Eight Domains) → T7 (Domain Pages)
```

**Requirements:**
- T6: Needs domain text from T5, plus domain icons from Cat
- T7: Needs domain specifications from T6

---

### Standalone: Dashboard Fixes
Can work independently:

```
┌─────────┐
│   T8    │
│   Map   │
│  Fixes  │
└─────────┘
```

**Requirements:**
- T8: May be in different codebase (dashboard app vs mockup)
- Can proceed after T1 (branding) is complete

---

## Optimal Parallelization Strategy

### If 4 Chat Windows Available:

**Window 1:** T2 (Pages & Nav)  
**Window 2:** T1 (Logo - when asset received)  
**Window 3:** T3 (Hero - when asset received)  
**Window 4:** T8 (Map Fixes - after T1)

Once Batch 1 complete:

**Window 1:** T4 (Colors)  
**Window 2:** T5 (Content - when document received)  
**Window 3:** [Available for debugging/review]  
**Window 4:** [Available for debugging/review]

Once Batch 2 complete:

**Window 1:** T6 (Eight Domains)  
**Window 2:** T7 (Domain Pages - after T6)

---

## Sequential Execution (Single Window)

If working in a single chat window, follow this order:

1. **T2** - Pages & Nav (no blockers)
2. **T1** - Logo & Branding (when asset available)
3. **T3** - Hero Image (when asset available)
4. **T4** - Color Palette (use hero image)
5. **T5** - Content Integration (when document available)
6. **T6** - Eight Domains (use content from T5)
7. **T7** - Domain Page Updates (use specs from T6)
8. **T8** - Map/Dashboard Fixes

---

## Critical Path

The longest dependency chain (critical path):

```
T2 → T5 → T6 → T7
(~8-14 hours total)
```

Tasks on the critical path should be prioritized to avoid delays.

---

## Blocking Assets

These assets block multiple tasks:

### WRI Logo (blocks T1, T8)
- **Impact:** Branding across all pages, dashboard updates
- **Workaround:** Use placeholder, but must replace before final delivery

### Content Document (blocks T5, T6, T7)
- **Impact:** All page content, domain specifications
- **Workaround:** Use placeholder content, but critical path is blocked

### Hero Image (blocks T3, T4)
- **Impact:** Landing page visual, color palette generation
- **Workaround:** Use stock image temporarily, update colors later

### Domain Icons (blocks T6, T7)
- **Impact:** Domain cards, domain pages
- **Workaround:** Use emoji placeholders, replace with real assets later

---

## Risk Analysis

### High Risk (Blocks Multiple Tasks)
- ⚠️ Content document delay → blocks T5, T6, T7 (critical path)
- ⚠️ Logo delay → blocks T1, T8 (branding inconsistency)

### Medium Risk
- ⚠️ Hero image delay → blocks T3, T4 (affects visual identity)
- ⚠️ Domain specs delay → blocks T6, T7 (but not T1-T5)

### Low Risk (Can use placeholders)
- ✓ Domain icons → emoji placeholders acceptable
- ✓ Team photos → can build page structure without

---

## Mitigation Strategies

1. **Start T2 immediately** (no dependencies)
2. **Use placeholders** for delayed assets
3. **Document all placeholders** in code comments
4. **Create asset request checklist** for Cat
5. **Work on independent tasks** while waiting for assets

---

**Last Updated:** Feb 13, 2026
