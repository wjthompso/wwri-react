# Design Guidelines: WWRI Public Website

**Last Updated:** Feb 3, 2026  
**Source:** Cat Fong Meeting Notes  
**Applies To:** Public-facing website pages (NOT the dashboard)

---

## Target Audience

### Demographics
- **Age:** 45+ (primary target)
- **Roles:** Policy makers, resource managers, homeowners
- **Tech Savvy:** Professional but not necessarily tech-forward
- **Reading Behavior:** Prefer visuals over text, don't read lengthy content

### User Needs
- Quickly understand what WWRI is
- Assess credibility and trustworthiness
- Find specific information efficiently
- Access on desktop primarily (mobile secondary)

---

## Design Principles

### 1. Professional Credibility First
**Goal:** Look like a serious research institution with technical expertise

✅ **Do This:**
- Clean, modern layouts
- Professional typography
- Subtle, purposeful animations
- Gradient backgrounds (not flat colors)
- Science communication aesthetic
- Policy-oriented design language

❌ **Avoid This:**
- "Tech demo" websites (too flashy)
- Startup/SaaS aesthetic (too casual)
- Dated design patterns (2008-era styles)
- Anything that screams "we spent all our money on the website"

### 2. Visual-First Content
**Goal:** Communicate complex ideas quickly through imagery

✅ **Do This:**
- Auto-playing hero video (30 seconds)
- Tile-based content sections
- Alternating image/text layouts
- Progressive disclosure on scroll
- Square or landscape videos/images
- Powerful, relevant visuals

❌ **Avoid This:**
- Text-heavy pages
- Long paragraphs
- Rectangular background boxes behind text
- Subtitle-style text overlays

### 3. Modern But Accessible
**Goal:** Contemporary design that doesn't alienate 45+ audience

✅ **Do This:**
- Subtle glassmorphism
- Smooth scroll reveals
- Clean visual breaks between sections
- Professional serif or sans-serif fonts
- Muted, sophisticated color palette
- Purposeful white space

❌ **Avoid This:**
- Excessive animations
- Cursor-following effects
- Moving sine waves or particles
- Emojis (feels unprofessional)
- Running banner text (Times Square style)
- Supernova/space graphics without purpose

---

## Layout Patterns

### Homepage Structure
```
1. Hero Section
   - Auto-playing video (horizontal format)
   - Minimal text overlay (no rectangular boxes)
   
2. Progressive Content Sections
   - What is WRI?
   - Why Resilience?
   - What is an Index?
   - Additional domains/topics
   
3. Media Section
   - Press releases
   - Media coverage
```

### Content Tile Pattern
```
Section 1:
[Image/Video]  |  [Text Content]
     LEFT      |      RIGHT

Section 2:
[Text Content] |  [Image/Video]
     LEFT      |      RIGHT

Section 3:
[Image/Video]  |  [Text Content]
     LEFT      |      RIGHT
```

**Why:** Traditional print media layout creates clean visual rhythm

### Progressive Disclosure
- Content reveals as user scrolls
- Smooth animations (not jarring)
- Builds narrative progressively
- Encourages exploration

---

## Typography

### Font Choices
- **Primary:** Be Vietnam Pro (currently using from Climate Vulnerability Index)
- **Alternative:** Montserrat (funder requirement, but Cat isn't enthusiastic)
- **Decision:** OK to use Be Vietnam Pro for body, reserve Montserrat for specific elements if required

### Font Characteristics We Want
- Readable at various sizes
- Professional appearance
- Clean, consistent letter heights
- Good hierarchy differentiation
- NOT overly stylized
- NOT Times New Roman-adjacent unless purposeful

### Typography Don'ts
- ❌ No emojis (feels unprofessional for audience)
- ❌ Avoid fonts that feel "sneaky" (hard to import/use)
- ❌ Don't sacrifice readability for style

---

## Color & Styling

### Color Palette
- **Requirement:** Must align with Moore Foundation brand guidelines
- **Pre-approved:** Certain colors from funders
- **Moore Foundation Primary:** Blue (specific shade TBD)
- **Background:** Use gradients, not solid colors
  - Solid colors = too plain (Mega Fire Action Plan issue)
  - Subtle texture adds professionalism

### Glassmorphism
✅ **Use Sparingly:**
- Subtle blur effects
- Transparent overlays with backdrop blur
- Modern feel without being excessive

❌ **Don't Overuse:**
- Not on every element
- Avoid looking like a design trend showcase
- Must serve functional purpose

### Visual Texture
- Subtle gradients in backgrounds
- Light/dark variations for depth
- Shadow and highlight for dimension
- NOT flat design, NOT overly 3D

---

## Animation & Interaction

### Animations We Like
**Progressive Reveal (Eloquent-style):**
- Content fades/slides in on scroll
- Tile-based reveals
- Purposeful, smooth transitions

**Acceptable:**
- Hover states (subtle)
- Click feedback
- Smooth scrolling
- Loading animations (brief)

### Animations We Don't Like
❌ **Avoid These:**
- Cursor-following effects (black ball following mouse)
- Running/scrolling banner text
- Waving hand emojis
- Moving sine waves or particles
- Excessive parallax
- Anything that feels "busy"

---

## Mobile Strategy

### Public Website Pages
**Approach:** Mobile-Friendly (NOT Mobile-Optimized)

✅ **Do This:**
- Legible on mobile
- Functional basic layout
- Readable text sizes
- Clickable buttons/links
- Acceptable user experience

❌ **Don't Bother:**
- Perfect mobile optimization
- Mobile-specific features
- Touch gesture refinements
- Mobile performance tuning

**Rationale:** Primary usage is desktop. Mobile is secondary.

### Dashboard Application
**Approach:** NOT Mobile Compatible

✅ **Do This:**
- Detect mobile device
- Show warning: "This application requires a desktop browser"
- Provide graceful message

❌ **Don't Try:**
- Making map work on mobile
- Responsive dashboard layouts
- Touch-friendly controls

**Rationale:** Map detail requires desktop. It's OK to require desktop for this.

---

## Content Strategy

### Text Content
- **Current State:** Too wordy (Tessa Roo and others wrote long content)
- **Goal:** Minimal text, maximum impact
- **Approach:** Powerful visuals + concise copy
- **Target:** Scannable in seconds, not minutes

### Video Content
**Format Depends on Layout:**
- Horizontal: If hero section or wide tiles
- Square: If 50/50 image/text tiles

**Creation:**
- Cat creating in Canva
- May upgrade to After Effects (Cat's husband is pro)
- Waiting on Moore Foundation approval for final assets

**Design Recommendations for Videos:**
- ❌ No rectangular background boxes behind text
- ✅ Bold text with sufficient contrast directly on footage
- ✅ Consider white text with black outline (or vice versa)
- ✅ Ensure text size is large enough without backgrounds

### B-Roll Footage
- Cat will provide 2 types for variety
- No text overlays (Will adds text in layout)
- Placeholder images OK for mockups

---

## Brand Compliance

### Moore Foundation Requirements
- **Pre-approved:** Color palette, fonts, image assets
- **Must Check:** Any major design decisions
- **Timeline:** Funder review on Feb 17, 2026
- **Flexibility:** Some room for interpretation within guidelines

### Content Approval
- Videos require funder approval before finalization
- May get additional budget for professional videography post-approval
- Carlos (team member) can help populate content using AI tools

---

## Inspiration Sites

### ✅ Good References

**Eloquent Website**
- Progressive reveal animations
- Tile-based layout
- Clean visual breaks
- **Use:** Animation style, layout structure

**Mega Fire Action Plan (megafireaction.org)**
- Policy-oriented messaging
- Professional tone
- Media/press section
- **Use:** Messaging approach, content structure
- **Don't Use:** Plain solid color backgrounds

**Climate Vulnerability Index**
- Font choice (Be Vietnam Pro)
- Technical credibility
- **Use:** Overall aesthetic direction

**Monterey Bay Aquarium & Steinhardt Aquarium**
- Science communication approach
- Themed colors
- Clean, simple design
- **Use:** Balance of professional + accessible

### ❌ Anti-Patterns to Avoid

**reflect.app**
- Too flashy, too modern
- Purple everywhere
- Moving sine waves
- Supernova graphics
- **Avoid:** Everything about this aesthetic
- **Why:** "Looks like they spent all money on website, no product"

**conquer the jungle**
- Mobile incompatible
- Illegible on phones
- **Avoid:** Neglecting mobile entirely
- **Why:** We need mobile-friendly, even if not optimized

---

## Technical Constraints

### Performance
- Auto-playing video must be optimized file size
- Progressive image loading
- Lazy load content sections below fold
- Consider static site generation for public pages

### CMS Requirements
- Cat needs to update media section independently
- Consider: Strapi, Sanity, Contentful, or simple markdown
- Carlos can help with AI-assisted population

### Video Hosting
- Options: Vimeo (clean), YouTube (free but ads), self-hosted
- Must auto-play on hero section
- Must not slow page load significantly

### Browser Support
- Modern browsers only (OK per Cat)
- Desktop-first optimization
- Mobile-friendly fallbacks

---

## Design Review Checklist

Before presenting mockups, verify:

### Visual Design
- [ ] Looks professional, not flashy
- [ ] Conveys technical credibility
- [ ] Appropriate for 45+ audience
- [ ] Uses gradients, not solid backgrounds
- [ ] Subtle glassmorphism (if used)
- [ ] Clean visual rhythm in layout

### Content Layout
- [ ] Hero video section (placeholder OK)
- [ ] Tile-based content sections
- [ ] Alternating left/right layout
- [ ] Progressive disclosure on scroll
- [ ] Media/press section included
- [ ] Minimal text, maximum visual impact

### Typography
- [ ] Be Vietnam Pro or Montserrat
- [ ] Professional appearance
- [ ] Good hierarchy
- [ ] Readable at all sizes
- [ ] No emojis

### Interaction
- [ ] Smooth scroll reveals (Eloquent-style)
- [ ] No cursor-following effects
- [ ] No running banner text
- [ ] No excessive animations
- [ ] Purposeful, subtle interactions only

### Mobile
- [ ] Legible on mobile
- [ ] Functional (even if not perfect)
- [ ] Dashboard shows mobile warning
- [ ] Acceptable user experience

### Brand Compliance
- [ ] Aligns with Moore Foundation palette
- [ ] Uses approved fonts
- [ ] Professional enough for policy audience
- [ ] Ready to present to funders

---

## Success Metrics

### For Mockups (Feb 17 Review)
- Funder approval obtained
- Design direction chosen
- Budget for professional video approved (hopefully)
- Brand guidelines confirmed

### For Launch
- Cat can update media section independently
- Professional credibility conveyed
- Users understand WWRI quickly
- Policy makers take us seriously
- Technical complexity is evident but not overwhelming

---

## Questions for Design Reviews

When reviewing mockups with Cat and stakeholders:

1. Does this look like a serious research institution?
2. Can a 45+ year old policy maker trust this?
3. Is the technical complexity evident but not overwhelming?
4. Are we communicating quickly through visuals?
5. Is the mobile experience acceptable (not perfect, just acceptable)?
6. Does this align with Moore Foundation brand?
7. Would this make Jack Dangermon grumpy? (Wrong project, but same principle)

---

## Notes & Reminders

- Cat's husband is professional video producer (potential resource)
- Carlos has AI proficiency (can help with content)
- Cat is learning Canva (rudimentary skills, improving)
- Moore Foundation has deep pockets if they approve
- Timeline is tight: Feb 17 for initial review
- This is separate from dashboard (different use case, different design)
- Remember: We're competing with policy documents, not tech startups

---

**Status:** Active Guidelines  
**Next Review:** After Feb 17 funder meeting  
**Owner:** Will Thompson (implementation), Cat Fong (content/approval)
