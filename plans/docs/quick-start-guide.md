# Quick Start Guide for Chat Windows

Use this guide when starting a new Cursor chat window for website development tasks.

---

## 🎯 Primary Interface

**Main Task Tracker:**  
`/plans/public-website-high-priority-tasks.md`

This is your single source of truth. It contains:
- 8 high-priority development tasks
- Each task designed for independent execution
- Clear dependencies and acceptance criteria
- Questions for Cat and asset tracking

---

## 🚀 Starting a New Task

### 1. Choose Your Task

Open the task tracker and pick a task:
- **T1:** Logo Integration & Branding (WRI not WWRI)
- **T2:** Navigation & Page Structure (8 new pages)
- **T3:** Replace Hero Video with Cat's Videos + Text Overlay
- **T4:** Color Palette Refactor (remove purple, add browns)
- **T5:** Content Integration (Cat's document)
- **T6:** Eight Domains Section (update from 4 pillars)
- **T7:** Domain Page Content Updates
- **T8:** Map/Dashboard Fixes

### 2. Copy Task Info to Chat

Start your chat window with:

```
I'm working on Task [ID] from the high-priority task tracker:
[paste task title and description]

Target files: [list from task]
Dependencies: [list from task]
```

### 3. Check Supporting Docs

Before starting, check if there are relevant docs in `/plans/docs/`:
- `asset-inventory.md` - Asset status
- `feedback-log.md` - Cat's feedback details
- `content-mapping.md` - Content document mapping (created during T5)
- `domain-specifications.md` - Domain details (created during T6)
- `color-palette-guide.md` - Color guidelines (created during T4)

---

## 📍 Key Locations

### Implementation Files
```
/public-website-mockups/themes/theme5-wildfire-sunset/
├── index.html                  # Homepage (landing)
├── infrastructure.html         # Domain page
├── social.html                 # Domain page
├── natural-resources.html      # Domain page
├── planning.html               # Domain page
└── [4 new domain pages TBD]    # To be created in T6
```

### Planning & Documentation
```
/plans/
├── public-website-high-priority-tasks.md  # MAIN TRACKER
├── public-website-dev-plan.md             # ARCHIVED - reference only
└── docs/
    ├── asset-inventory.md
    ├── feedback-log.md
    ├── content-mapping.md         # Created during T5
    ├── domain-specifications.md   # Created during T6
    └── color-palette-guide.md     # Created during T4
```

---

## ⚠️ Important Notes

### Dependencies
```
T2 (Pages) → T5 (Content) → T6 (Domains) → T7 (Domain Pages)
T3 (Hero) → T4 (Colors)
T1 (Branding) → T8 (Dashboard)
```

**Before starting a task, check if its dependencies are complete in the tracker.**

### Assets Needed from Cat
- WRI Logo (T1) ✅
- Hero Videos (T3) ✅
- Content Document (T5)
- Domain Icons (x8) (T6)
- Domain Details (domains 5-8) (T6)

**Check `asset-inventory.md` for current status.**

### Parallel Work Strategy
These can be worked on simultaneously:
- T1, T2, T3 (hero videos received — ready)
- T4 (after T3)
- T5, T6 (after T2, if content available)

### When You Complete a Task
1. Update task status in tracker: ⬜ → ✅
2. Update progress counter at top
3. Add completion notes at bottom of tracker
4. Create any promised documentation in `/plans/docs/`
5. Update `feedback-log.md` if addressing Cat's feedback

---

## 🎨 Current Design Specs

### Color Palette (Before T4)
```css
--primary-darkest: #160e08;
--secondary-orange: #dc7e49;  /* MAIN BRAND COLOR */
--secondary-brown: #8e4b27;
--accent-magenta: #84325F;    /* TO BE REMOVED IN T4 */
```

### Typography
- Primary: Be Vietnam Pro
- Weights: 400, 600, 700

### Target Audience
- 45+ (policy makers, resource managers, homeowners)
- Desktop-first, mobile-friendly (not optimized)
- Professional, credible, not flashy

---

## 🔗 Useful Commands

### Find all references to WWRI
```bash
cd /Users/wthompson/Documents/wjtho/ContractWork/wwri-react/public-website-mockups/themes/theme5-wildfire-sunset/
grep -r "WWRI" .
```

### List all HTML files
```bash
ls -la /Users/wthompson/Documents/wjtho/ContractWork/wwri-react/public-website-mockups/themes/theme5-wildfire-sunset/*.html
```

### Check task tracker
```bash
cat /Users/wthompson/Documents/wjtho/ContractWork/wwri-react/plans/public-website-high-priority-tasks.md
```

---

## 📞 Questions?

If you need clarification:
1. Check the task tracker first
2. Check supporting docs in `/plans/docs/`
3. Check `feedback-log.md` for Cat's original feedback
4. If still unclear, flag for Cat in questions section

---

**Last Updated:** Feb 13, 2026
