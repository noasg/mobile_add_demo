# 🍺 PIXI AD Game

A lightweight browser mini-game built with **PIXI.js** using a modular architecture.

The game includes:
- Animated start screen
- Drag-based gameplay
- Falling object mechanics
- Collision detection
- Analytics tracking
- Sound management
- Custom animation system

- ## Game.js

Main game controller responsible for:
- Initializing PIXI
- Loading assets
- Managing scenes
- Managing UI
- Managing analytics
- Managing sounds

### Responsibilities
- Loads assets and sounds
- Starts analytics
- Creates close button UI
- Opens `Screen1`
- Switches between scenes
- Clears/destroys old scenes

## Screen1.js

Start screen of the game.

### Features
- Background image
- Pulsing start button animation
- Sends analytics event
- Moves to `Screen2` on click
- Starts ambient sound on click

## Screen2.js

Main gameplay screen.

### Features
- Sky background
- Wall/environment
- DAC player
- Beer score system
- Drag movement
- Gameplay loop
- Roman + beer spawning

### Layers

Uses multiple PIXI containers:
- `romanLayer`
- `worldLayer`
- `uiLayer`

## RomanBeerController.js

Handles all gameplay cycle logic.

### Responsibilities
- Spawn Roman character
- Animate Roman entrance
- Spawn falling beer
- Detect collisions
- Handle catch/miss events
- Reset Roman after cycle

### Gameplay Cycle
Roman appears
    ↓
Beer spawns
    ↓
Beer falls
    ↓
Collision check
    ↓
Catch or miss
    ↓
Reset cycle


# 🧩 Utility Systems

## AnimationManager

Custom lightweight animation helper.

### Features
- Pulse animation
- Position tweening
- `requestAnimationFrame` based updates

## AnalyticsManager

Simple event tracking system.

### Tracks
- Session start
- Session end
- Heartbeats
- Button clicks
- Custom gameplay events

## SoundManager

Handles:
- Audio loading
- Looping sounds
- Volume control
- Stop/play controls

## DragController

Allows horizontal dragging of the DAC player.

### Features
- Pointer drag movement
- Min/max boundaries
- Smooth interaction

## CollisionUtils

Simple hit detection helper.

Used for:
- Beer ↔ DAC collision checks

# 🎨 Assets

This includes:
- Backgrounds
- Sprites
- Atlas files
- Sound paths

# 🚀 How To Run

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

or

```bash
npm start
```


# 🕹️ Controls

| Action | Input |
|---|---|
| Move DAC | Drag left/right |
| Start game | Click start button |
| Close game | Click close button |

---

# 📈 Analytics Events

| Event | Description |
|---|---|
| `session_start` | Game started |
| `heartbeat` | Sent every 7 seconds |
| `start_clicked` | Player pressed start |
| `close_clicked` | Player closed game |
| `session_end` | Session finished |

---

# 🧠 Architecture Notes

The project follows a modular architecture:
- Scenes are isolated
- Controllers handle gameplay logic
- Utilities are reusable
- Game state is centralized
