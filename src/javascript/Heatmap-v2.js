/**
 * EmojiHeatmap: A dynamic, interactive display of emojis that shift 
 * with mouse movement, creating a detailed color-coordinated heatmap.
 * 
 * Based on original work by Jonas Kjeldmand Jensen, July 2024
 */

// Global constants and variables
let xOffset = 0; // Offset for x-axis, influenced by mouse drag
let yOffset = 0; // Offset for y-axis, influenced by mouse drag
let mouseSensitivity = 0.6; // Sensitivity for mouse dragging
const FONT_SIZE = 16; // Font size for emoji display
const NOISE_SCALE = 0.0006; // Scale for Perlin noise function

// Categorized emojis for different color-based themes
const EMOJI_CATEGORIES = {
  purple: ['😈', '🔮', '👿', '🧕', '🤷‍♀️', '🤰', '🌸', '🌷', '🌺','🎆'],
  blue: ['🌊', '🌎', '🐟', '💙', '🔵', '🧢', '👖', '🧵', '👔', '🥏', '🟦', '🔹', '🧿', '🔷', '🚙', '🥶', '🌀', '🩻', '📘', '💎', '🛋️', '💠', '🧊', '🛗'],
  cyan: ['🐬', '🐋', '🐳', '🐟', '🐬', '🪣', '👗', '🩴'],
  green: ['🌿', '🍀', '🌱', '🐲', '🌲', '🥬', '🤢', '🥦', '🧩', '🐍', '🐉', '🐸', '💚', '🔋', '🤮', '🧃', '📗', '🟢', '🔫', '🧪', '🦚', '🦖', '🥝', '🍏', '🦎', '🐊', '🐢', '🍃', '🧑‍🌾'],
  yellow: ['🌻', '🌟', '🍋', '🍌', '🐥', '🦁', '💛', '🎗️', '🚡', '🟨', '🏆', '🎫', '🌕', '🌞', '🛎️', '📒', '🐤', '🚕', '🍍', '🍺', '⭐', '🧀'],
  orange: ['🍊', '🎃', '🦁', '🔶', '🟧', '🟠', '🦊', '🍑', '🥕', '🦐', '🏺', '🦊', '🍁', '🍯', '📙', '🧡', '💥', '🔥', '🎁', '🚚', '🦧', '🐅', '🍂', '🦺', '🏀'],
  red: ['🍎', '🍓', '🌹', '🔴', '🟥', '🏮', '💢', '🚗', '🚨', '🦀', '🦞', '🤬', '⛽', '🍉', '🛑', '🥊', '🏓', '🚩', '🚒', '🩸', '🧰', '🥩', '💃', '👹',  '🌹', '🐞', '🥵', '👺', '🥫', '💋', '😡', '💯', '💔', '🍅', '❤️‍🔥', '🌶️', '🍒', '🆘', '🧨', '🚗'],
};

/**
 * Setup function initializes the canvas and sets up initial styles
 */
function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas the size of the browser window
  textSize(FONT_SIZE); // Set the text size for emojis
  textAlign(CENTER, CENTER); // Center the text for precise placement
}

/**
 * Draw function continuously renders the emojis on the canvas
 * based on Perlin noise values.
 */
function draw() {
  background(220); // Set background color to light gray

  const time = frameCount * 0.00075; // Time factor for dynamic noise

  // Loop through the canvas grid in steps of FONT_SIZE
  for (let x = 0; x < width; x += FONT_SIZE) {
    for (let y = 0; y < height; y += FONT_SIZE) {
      const noiseValue = calculateNoiseValue(x, y, time); // Calculate noise value for current grid position
      const emoji = getEmojiFromNoiseValue(noiseValue); // Get corresponding emoji based on noise value
      text(emoji, x, y); // Draw the emoji at the calculated position
    }
  }
}

/**
 * Calculate Perlin noise value for given coordinates and time
 * 
 * @param {number} x - X coordinate on the canvas
 * @param {number} y - Y coordinate on the canvas
 * @param {number} time - Time factor for animation, provides dynamic effect
 * @returns {number} - Noise value between 0 and 1
 */
function calculateNoiseValue(x, y, time) {
  return noise((x + xOffset) * NOISE_SCALE, (y + yOffset) * NOISE_SCALE, time);
}

/**
 * Get emoji character based on noise value
 * 
 * @param {number} noiseValue - Perlin noise value between 0 and 1
 * @returns {string} - Emoji character from corresponding category
 */
function getEmojiFromNoiseValue(noiseValue) {
  let category, adjustedNoiseValue;

  // Determine the emoji category based on the noise value range
  if (noiseValue < 0.3) {
    category = 'purple';
    adjustedNoiseValue = map(noiseValue, 0, 0.30, 0, 1);
  } else if (noiseValue < 0.4) {  // Corrected condition to avoid overlapping ranges
    category = 'blue';
    adjustedNoiseValue = map(noiseValue, 0.30, 0.4, 0, 1);
  } else if (noiseValue < 0.5) {
    category = 'cyan';
    adjustedNoiseValue = map(noiseValue, 0.4, 0.5, 0, 1);
  } else if (noiseValue < 0.6) {
    category = 'green';
    adjustedNoiseValue = map(noiseValue, 0.5, 0.6, 0, 1);
  } else if (noiseValue < 0.7) {
    category = 'yellow';
    adjustedNoiseValue = map(noiseValue, 0.6, 0.7, 0, 1);
  } else if (noiseValue < 0.8) {
    category = 'orange';
    adjustedNoiseValue = map(noiseValue, 0.7, 0.8, 0, 1);
  } else {
    category = 'red';
    adjustedNoiseValue = map(noiseValue, 0.8, 1, 0, 1);
  }

  // Select an emoji based on the adjusted noise value
  const categoryEmojis = EMOJI_CATEGORIES[category];
  const index = floor(adjustedNoiseValue * (categoryEmojis.length - 1));
  return categoryEmojis[index];
}

/**
 * Update offsets when mouse is dragged, influencing the noise field
 */
function mouseDragged() {
  xOffset += (pmouseX - mouseX) * mouseSensitivity;
  yOffset += (pmouseY - mouseY) * mouseSensitivity;
}

/**
 * Resize the canvas when the window size changes
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
