# Documentation Index

This folder contains documentation for the WWRI React project.

## Quick Links

### 🚨 Immediate Actions
- **[Right Sidebar Fix](./quick-fixes/right-sidebar-default-expansion.md)** - Expand one domain by default (HIGH PRIORITY)

### 📋 Planning Documents
- **[Public Website Development Plan](../plans/public-website-dev-plan.md)** - Full development plan for public website pages
- **[Design Guidelines](./design-guidelines.md)** - Comprehensive design direction and constraints

### 📝 Meeting Notes
- **[Feb 3, 2026 - Cat Fong Meeting](./meeting-notes/2026-02-03-cat-fong-meeting.md)** - Website design discussion and dashboard UX fix

## Document Structure

```
docs/
├── README.md (this file)
├── design-guidelines.md          # Design principles, patterns, do's and don'ts
├── meeting-notes/
│   ├── README.md
│   └── 2026-02-03-cat-fong-meeting.md
└── quick-fixes/
    └── right-sidebar-default-expansion.md

plans/
└── public-website-dev-plan.md    # Detailed development plan with timeline
```

## Key Takeaways from Cat Fong Meeting

### Dashboard (Immediate)
1. **Expand one domain by default** in right sidebar indicator navigation
   - Helps users discover expand/collapse functionality
   - Suggest "Infrastructure" as the default expanded domain
   - ~1 hour effort, high UX impact

### Public Website (By Feb 17)
1. **Create 4-5 HTML mockups** with different design themes
   - Desktop-first, mobile-friendly approach
   - Professional, trustworthy aesthetic for 45+ audience
   - Progressive disclosure, tile-based layouts
   - Use placeholder content initially

2. **Design Constraints**
   - Target audience: Policy makers, resource managers, homeowners (45+)
   - Must align with Moore Foundation brand guidelines
   - Professional credibility is paramount
   - Visual-first, minimal text
   - No emojis, no excessive animations

3. **Timeline**
   - Feb 17: Funder review with Moore Foundation
   - Post-approval: Integrate actual video content
   - Report feature on hold pending funder input

## How to Use These Docs

### If you're implementing the dashboard fix:
1. Read `quick-fixes/right-sidebar-default-expansion.md`
2. Modify `src/components/RightSidebar.tsx`
3. Test and deploy

### If you're creating website mockups:
1. Review `design-guidelines.md` thoroughly
2. Study the inspiration sites mentioned
3. Follow the layout patterns described
4. Create 4-5 distinct mockup options
5. Reference `plans/public-website-dev-plan.md` for full requirements

### If you're Cat reviewing mockups:
1. Use the checklist in `design-guidelines.md`
2. Refer to meeting notes for original context
3. Confirm alignment with Moore Foundation brand
4. Choose direction before Feb 17 funder meeting

## Related Files

- **Dashboard Code:** `src/components/RightSidebar.tsx`
- **Development Plans:** `plans/` folder
- **Meeting Transcripts:** Referenced in meeting notes

## Status

- ✅ Meeting notes extracted and documented
- ✅ Development plan created
- ✅ Design guidelines documented
- 🔄 Dashboard fix not yet implemented
- 🔄 Website mockups not yet started
- ⏸️ Video content blocked on funder approval
- ⏸️ Report feature on hold

## Next Steps

1. **Will Thompson:**
   - [ ] Implement dashboard right sidebar fix
   - [ ] Start design research for mockups
   - [ ] Create 4-5 HTML mockup themes
   - [ ] Prepare for Feb 17 presentation

2. **Cat Fong:**
   - [ ] Gather b-roll footage (2 types)
   - [ ] Prepare funder presentation
   - [ ] Get Moore Foundation feedback
   - [ ] Provide final content direction

## Questions?

Contact Cat Fong for:
- Content decisions
- Funder requirements
- Video assets
- Brand guidelines

Contact Will Thompson for:
- Technical implementation
- Design mockup questions
- Timeline concerns
- Architecture decisions
