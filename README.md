# Feelings - Nova's Emotion Adventure

**Feelings** is an immersive, bilingual underwater adventure that helps teenagers explore emotions, choices, and healthy next steps through Nova, a gender-neutral starfish companion.

The experience is designed as a modern 2.5D game interface rather than a flat quiz: players discover mysterious signals on an underwater map, enter a situation, identify what Nova may be feeling, make a choice, and see its ripple effect.

## Features

- **Arabic and English gameplay** with RTL/LTR-aware layouts.
- **Cinematic underwater world** with Nova, layered depth, glowing currents, bubbles, and a polished game UI.
- **Interactive S-shaped world map** with vertical exploration, drag/scroll navigation, zoom controls, search, category filters, and a moving progress orb.
- **Scenario-specific journeys**: each playable signal contains its own mystery introduction, scene, emotion question, three actions, and three corresponding outcomes.
- **Three fully authored scenarios**:
  1. School pressure: a difficult surprise test.
  2. Digital world: cyberbullying in a group chat.
  3. Family environment: being blamed before being heard.
- **Meaningful choice outcomes** that explain the likely emotional and practical effect of every action without shaming the player.
- **Journey completion flow**: completing the three core scenarios unlocks a closing message, quick emotional-care tips, support options, and parent/guardian conversation guidance.
- **Quiet Space** with a complete 4-4-4 breathing exercise: inhale, hold, and exhale each count down for four seconds.
- **Support center** covering trusted people, home support, school support, when to ask for help, and unsafe situations.
- **Guardian conversation guide** with calm-time, “I feel…”, and “what I need” prompts.
- **Accessibility controls** for text scale, color-vision modes, high contrast, reduced motion, captions, and focus highlighting.
- **Responsive layout** for desktop and mobile screens.
- **Content-management UI prototype** for reviewing scenario metadata and the future publishing workflow. It intentionally has no backend or file persistence yet.

## Game Flow

```text
Splash screen
  -> Landing page
  -> Underwater map
  -> Mystery signal
  -> Scene
  -> Emotion choice
  -> Action choice
  -> Outcome + reflection
  -> Map / Quiet Space
  -> Closing message after all core scenarios
```

## Run Locally

### Windows Command Prompt

```bat
cd /d "C:\path\to\Feelings_game"
corepack enable
corepack pnpm install
corepack pnpm dev
```

Open [http://localhost:8443](http://localhost:8443).

### Windows PowerShell

```powershell
Set-Location "C:\path\to\Feelings_game"
corepack enable
corepack pnpm install
corepack pnpm dev
```

## Production Build

```bash
corepack pnpm build
corepack pnpm preview
```

## Project Structure

```text
src/
  App.tsx                 # UI, routing, player journey, map, support screens
  index.css               # Visual system and responsive styles
  content/
    scenarios.ts          # Bilingual authored scenario content and outcomes
public/assets/            # Nova, underwater, and interface artwork
```

## Current Content Scope

The initial release focuses on the three authored scenarios above. New entries created through the current admin prototype are marked as **content being prepared** until their full scene, emotion options, actions, and outcomes are authored. This prevents newly created metadata from incorrectly opening a reused story.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS / custom CSS

## Development Notes

- Player reflections remain private in the current front-end prototype and are not stored remotely.
- A future production admin system should add authentication, a database, file storage, moderation, and content validation before publishing new scenarios.
