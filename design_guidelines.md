# Fishing Game Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from peaceful gaming experiences like Animal Crossing and Stardew Valley, combined with nature photography aesthetics for an immersive, calming experience.

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 200 85% 25% (Deep forest green)
- Secondary: 210 90% 45% (Lake blue)
- Accent: 45 95% 55% (Warm sunset orange)
- Background: 200 20% 95% (Soft cream)

**Dark Mode:**
- Primary: 200 40% 70% (Muted sage green)
- Secondary: 210 60% 65% (Soft lake blue)
- Accent: 45 80% 65% (Gentle orange)
- Background: 220 15% 15% (Deep charcoal)

### Typography
- Primary: Inter (Google Fonts) - Clean, readable for UI elements
- Display: Fredoka One (Google Fonts) - Playful for game title and scores
- Sizes: text-sm, text-base, text-lg, text-2xl, text-4xl

### Layout System
**Spacing Units**: Tailwind units of 2, 4, 8, and 16 (p-2, m-4, gap-8, h-16)
- Consistent spacing creates rhythm
- Larger units for major layout sections
- Smaller units for fine details

### Component Library

**Core Game Components:**
- **Game Canvas**: Full-screen interactive fishing area with click/tap zones
- **Score Display**: Floating counter showing fish caught (top-right corner)
- **Control Hints**: Subtle on-screen prompts for casting and reeling
- **Fish Collection**: Modal/sidebar showing caught fish varieties

**UI Elements:**
- **Buttons**: Rounded corners (rounded-lg), subtle shadows
- **Cards**: Minimal borders, soft backgrounds for fish collection display
- **Progress Indicators**: For fishing rod tension and catch progress

### Visual Treatment
**Natural Gaming Aesthetic:**
- Soft, organic shapes throughout the interface
- Gentle gradients from lake blue to forest green for backgrounds
- Subtle drop shadows for depth without heaviness
- Rounded corners on all interactive elements

**Interactive Feedback:**
- Gentle scale transforms on hover (scale-105)
- Soft color transitions for state changes
- Ripple effects for water interactions
- Smooth fade-ins for caught fish notifications

## Images Section

**Hero Background Image:**
- **Primary Scene**: Wide lakeside panorama showing a peaceful lake surrounded by lush trees
- **Composition**: Fisherman silhouette positioned on the left third, creating space for UI elements
- **Elements**: Multiple tree varieties, distant mountains, a few birds in flight, lily pads on water
- **Lighting**: Golden hour or soft daylight for warm, inviting atmosphere
- **Placement**: Full-screen background covering entire game area

**Additional Visual Assets:**
- **Fish Illustrations**: Colorful, cartoon-style fish sprites for the collection system
- **UI Overlays**: Semi-transparent panels with soft blur effects for game information
- **Nature Details**: Small animated elements like floating leaves or gentle water ripples

**Visual Hierarchy:**
The large hero background image serves as the primary visual foundation, with UI elements floating above using subtle transparency and blur effects to maintain the natural scene's prominence while ensuring interface readability.