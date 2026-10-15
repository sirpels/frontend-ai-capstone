# Accessibility playground notes

I first built Modal, Tabs, and Disclosure manually in React and TypeScript using the ARIA interaction patterns. I tested them using only the keyboard, then installed shadcn Dialog and Tabs with the Radix UI base and compared the generated source and Radix implementation with mine.

## What passed

My baseline keyboard tests passed: modal focus trapping with Tab and Shift+Tab, Escape to close, restoring focus to the opener, tab arrow-key navigation and wrapping, automatic tab activation, and disclosure toggling with Enter and Space.

## 1. Modal: dynamic focusable elements

My focus trap works for the current buttons, but its boundaries are hard-coded to Continue and Close. If I add more inputs or buttons later, keyboard focus could skip them because my code does not automatically discover all currently focusable elements.

shadcn delegates this behavior to Radix, which finds the available focusable elements and calculates the focus boundaries dynamically. This is a robustness gap for more complex or changing content, not evidence that my current keyboard test failed.

## 2. Tabs: disabled tabs

My tabs support normal arrow-key navigation, wrapping, and automatic activation, but they do not account for disabled tabs. If Details becomes disabled, my navigation code has no logic to skip it.

Radix can exclude disabled tab triggers from keyboard navigation and move focus to the next available tab. This gap would matter when disabled tabs are introduced.

## What I learned

Building these components manually helped me understand what ARIA roles alone do not provide. I still have to implement keyboard behavior and focus management correctly. A mature primitive such as Radix handles more edge cases and changing component states.
