# 🕰️ TimeTravelOS

[**🚀 View Live Demo**](https://time-travel-os.netlify.app/)

An interactive, scroll-driven web interface that evolves its design, aesthetics, and audio feedback as you travel through time. 

## 🚀 Overview

**TimeTravelOS** is a demonstration of dynamic state management and theme switching based on user interaction (scrolling). The UI seamlessly transitions between four distinct eras of digital design, each with its own unique color palette, typography, component styles, and sound effects.

## ✨ Features

*   **Four Unique Eras**:
    *   **1995**: Retro Windows 95 style (Teal background, beveled edges, mono fonts).
    *   **2005**: Frutiger Aero / Windows XP style (Glossy gradients, vibrant greens/blues).
    *   **2025**: Modern Minimalism (Clean white/gray, high-contrast typography, iOS-like cards).
    *   **2050**: Cyber-Future (Glassmorphism, neon glows, scanning animations).
*   **Scroll-Sync Timeline**: A persistent left-side progress bar that updates as you navigate the temporal zones.
*   **Dynamic Time Jumps**: Interactive "Start" buttons that trigger specific temporal leaps:
    *   **1995 ➔ 2005**: Advance the timeline.
    *   **2025 ➔ 2050**: Jump into the deep future.
    *   **2050 ➔ 1995**: Reset the timeline to the beginning.
*   **Context-Aware Audio**: Era-specific sound effects for every click and transition using the Web Audio API.
*   **Smooth Animations**: Fluid transitions between eras using CSS custom properties and cubic-bezier easing.

## 🛠️ Tech Stack

*   **Structure**: HTML5 (Semantic elements)
*   **Styling**: Vanilla CSS (CSS Variables, Flexbox, Animations)
*   **Logic**: Vanilla JavaScript (Scroll listeners, State management)
*   **Audio**: Web Audio API
*   **Fonts**: Inter, Space Grotesk, and Retro System fallbacks

## 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/time-travel-ui.git
   ```
2. Navigate to the project folder:
   ```bash
   cd time-travel-ui
   ```
3. Open `index.html` in your favorite browser.

## 🎮 Navigation Controls

*   **Scroll**: Use your mouse wheel or scrollbar to move linearly through time.
*   **Jump Buttons**: Click the **"Start"** button in the navbar to trigger era-specific jumps.
*   **Action Buttons**: Click **"Execute Command"** to see era-specific system responses.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

*Built with ❤️ for the future (and the past).*
