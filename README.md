# EmojiHeatmap 🌈✨

**EmojiHeatmap** is a creative visualization tool that dynamically generates a heatmap using a variety of emojis based on user interactions. It transforms mouse movements into colorful patterns using Perlin noise, resulting in an evolving, playful landscape of emotive symbols.

## Interaction and Dynamic UX

EmojiHeatmap provides an engaging interaction model where users can explore different color-themed emoji landscapes simply by moving their cursor. The visuals respond to mouse drag actions, creating a seamless blend between user input and system-generated output. This makes the experience highly interactive, aligning with principles from UX, IxD, and HCI.

### How It Works

- **Perlin Noise:** The script leverages Perlin noise to create smooth transitions between different emoji categories, offering a natural flow to the movement and color transitions.
- **Emoji Categories:** Emojis are grouped into categories based on color, ensuring a consistent and visually appealing distribution of symbols.
- **Mouse Interaction:** User input is captured through mouse dragging, which shifts the Perlin noise field, altering the landscape in real-time.

### Customization

The code is designed for easy customization, allowing designers and developers to tweak various aspects of the visualization:

- **Emoji Sets:** Modify the `EMOJI_CATEGORIES` to include your own set of emojis, grouped by any criteria you prefer (e.g., mood, theme, etc.).
- **Color Ranges:** Adjust the noise value ranges in the `getEmojiFromNoiseValue` function to change how different emojis appear based on the noise map.
- **Interaction Sensitivity:** The `mouseSensitivity` variable can be altered to make the interaction more or less responsive to user inputs.

### Implications for Design

EmojiHeatmap opens up avenues for experimenting with visual feedback in interactive environments. It showcases how digital spaces can be made more expressive and engaging by incorporating playful elements like emojis. This tool could be particularly useful in UX design for creating moodboards, interactive backgrounds, or as a concept for dynamic data visualization.

---

Experiment with the code and see how altering different parameters can change the visual outcome. This tool is built to inspire exploration and creativity in designing interactive experiences.
