# Regunaut UI guidline

## Purpose
This document defines the visual style, component patterns, and interaction guidelines for building applications with vibe coding tools. Follow these rules to maintain consistency and quality across all generated interfaces.

---

## 1. Design Philosophy

### Core Principles
- **Modern First**: Default to contemporary design trends unless explicitly requested otherwise
- **Interactive by Default**: Static designs are the exception; include animations and micro-interactions
- **Bold Over Safe**: Lean toward unexpected and engaging rather than conventional choices
- **Functional Premium**: Balance visual flair with usability and performance

### When to Prioritize What
- **Complex Applications** (simulations, tools): Functionality > Visual flair
- **Marketing/Landing Pages**: Emotional impact and "wow factor" > Simplicity
- **Data Visualizations**: Clarity and accuracy > Decoration
- **Logos**: Use Regunaut Color.svg as the main logo, Regunaut_Color.svg as the icon, RegunautFavicon.jpg as the favicon

---

## 2. Color & Visual Design

### Color Approach
- **Vibrant over muted** for attention-grabbing interfaces
- **Light mode by default** for modern applications (unless context suggests otherwise)
- Use gradients strategically for depth and visual interest
- Ensure WCAG AA contrast ratios minimum (4.5:1 for text)
- Use #5271FF as primary colour
- Use #0f0e0d for text, do not use black #000000
- Use #820933 as Accent colour

### Typography
- **Expressive over conservative** for headers and hero sections
- Use type scale consistently (e.g., 12px, 14px, 16px, 20px, 24px, 32px, 48px)
- Limit to 2 font families maximum per application
- Use Plus Jakarta Sans font 14px for default text
- Consider variable fonts for dynamic weight adjustments

### Visual Effects
- Glassmorphism for overlays and cards (backdrop-blur, semi-transparent backgrounds)
- Subtle shadows for depth hierarchy
- Gradients for CTAs and featured elements
- 3D elements where they enhance understanding (not just decoration)

---

## 3. Layout & Spacing

### Spacing System
Use a consistent spacing scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)

### Grid & Alignment
- Use CSS Grid or Flexbox for layouts
- Maintain consistent gutters and margins
- Responsive breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)

### Component Hierarchy
- Clear visual hierarchy through size, weight, and color
- Use whitespace intentionally to guide attention
- Group related elements with proximity and borders/backgrounds

---

## 4. Animation & Interaction

### Micro-interactions
- Hover states on all interactive elements
- Transition durations: 150-300ms for most UI elements
- Use easing functions (ease-in-out, cubic-bezier) for natural motion
- Loading states with skeletons or animated placeholders

### Page Transitions
- Smooth enter/exit animations for modals and overlays
- Scroll-triggered animations for landing pages (use Intersection Observer)
- Parallax effects sparingly and only when they enhance the experience

### Performance Considerations
- Animate transform and opacity (GPU-accelerated)
- Avoid animating width, height, or layout properties
- Use requestAnimationFrame for custom animations
- Target 60fps minimum

---

## 5. Components

### Buttons
- Clear hover and active states
- Adequate padding (min 12px vertical, 24px horizontal)
- Primary, secondary, and tertiary variants
- Loading and disabled states

### Forms
- Clear labels and helper text
- Inline validation with immediate feedback
- Error states with specific, actionable messages
- Accessible focus states (visible outline or ring)

### Cards
- Consistent border radius across the application
- Hover effects to indicate interactivity
- Proper content padding (16px-24px)
- Optional: Lift effect on hover (subtle translateY + shadow)

### Navigation
- Sticky or fixed positioning for primary navigation
- Mobile-first: Hamburger menu below tablet breakpoint
- Active state indicators for current page/section
- Smooth scroll for anchor navigation

---

## 6. Responsive Design

### Mobile-First Approach
- Design for smallest screen first, enhance for larger
- Touch targets minimum 44x44px
- Adequate spacing for thumb-friendly interaction
- Consider one-handed use patterns

### Breakpoint Strategy
```
mobile: default (< 640px)
tablet: 640px - 1024px
desktop: > 1024px
large: > 1280px
```

### Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced interactions layer on top
- Graceful degradation for older browsers

---

## 7. Accessibility

### Semantic HTML
- Use proper heading hierarchy (h1 -> h6)
- Semantic elements (nav, main, article, aside, footer)
- Landmark roles when needed (role="navigation", etc.)

### Keyboard Navigation
- All interactive elements accessible via Tab key
- Visible focus indicators
- Logical tab order
- Escape key closes modals and dropups

### Screen Readers
- Alt text for all meaningful images
- ARIA labels for icon-only buttons
- ARIA live regions for dynamic content
- Skip links for main content

### Color & Contrast
- Don't rely on color alone to convey information
- 4.5:1 contrast for normal text, 3:1 for large text
- 3:1 contrast for UI components and graphics

---

## 8. Code Organization

### CSS/Styling Approach
- Use Tailwind utility classes when available
- Custom CSS for complex animations or unique designs
- CSS variables for theme values (colors, spacing, etc.)
- BEM or similar naming convention for custom classes

### Component Structure
- Single Responsibility: Each component does one thing well
- Composable: Build complex UIs from simple components
- Reusable: Extract patterns used 2+ times
- Documented: Clear props and usage examples

---

## 9. Performance

### Optimization Strategies
- Lazy load images and heavy components
- Code splitting for routes/major features
- Minimize bundle size (tree-shaking, no unused imports)
- Optimize images (WebP, responsive images, appropriate sizing)

### Loading States
- Skeleton screens for initial load
- Progressive loading for data-heavy interfaces
- Optimistic updates for user actions
- Clear error states with retry options

---

## 10. Browser Support

### Target Browsers
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Android (last 2 versions)

### Fallbacks
- CSS feature detection with @supports
- Polyfills only when necessary
- Graceful degradation for older browsers

---

## 11. Special Contexts

### Landing Pages
- Hero section with clear value proposition
- Social proof (testimonials, logos, stats)
- Clear CTAs (max 2 primary CTAs visible at once)
- Scroll-triggered animations for engagement

### Dashboards
- Information hierarchy: Most important metrics first
- Consistent card/widget design
- Real-time updates where relevant
- Empty states with clear next actions

### Forms & Wizards
- Progress indicators for multi-step flows
- Save progress capability for long forms
- Clear validation and error messaging
- Success states with next steps

---

## 12. Don'ts

### Avoid These Patterns
- ❌ Autoplay videos with sound
- ❌ Infinite scroll without pagination option
- ❌ Pop-ups on page load
- ❌ Tiny click targets (< 32px)
- ❌ Disabled buttons without explanation
- ❌ Animations that can't be disabled
- ❌ Walls of text without hierarchy
- ❌ Mystery meat navigation (icons without labels)

---

## 13. Testing Checklist

Before considering a UI complete, verify:

- [ ] Works on mobile, tablet, and desktop
- [ ] All interactive elements have hover/focus states
- [ ] Keyboard navigation works throughout
- [ ] Color contrast meets WCAG AA standards
- [ ] Loading and error states are handled
- [ ] Animations perform at 60fps
- [ ] Images are optimized and have alt text
- [ ] Forms have validation and helpful error messages
- [ ] Works in target browsers
- [ ] No console errors or warnings

---

## 14. Resources & Inspiration

### Recommended Tools
- Tailwind CSS for utility-first styling
- Lucide React for consistent iconography
- Recharts or Chart.js for data visualization
- Framer Motion for advanced animations (when needed)

### Design Inspiration
- Dribbble, Awwwards for cutting-edge design
- Component libraries: shadcn/ui, Material UI (for patterns)
- Real products: Linear, Vercel, Stripe (for polish)

---

## Version History
- v1.0 - Initial structure (2025-02-16)