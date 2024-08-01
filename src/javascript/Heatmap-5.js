/**
 * 
 * EmojiHeatmap: A dynamic, interactive display of emojis that shift 
 * with mouse movement, creating a detailed color-coordinated heatmap.
 *
 * Based on original work by Jonas Kjeldmand Jensen, July 2024
 *
 */ 

// Global variables
let xOffset = 0;
let yOffset = 0;
const FONT_SIZE = 16;
const NOISE_SCALE = 0.0008;
const EMOJI_CATEGORIES = {
  blue: [],
  cyan: [],
  green: [],
  yellow: [],
  orange: [],
  red: [],
};

/**
 * Setup function to initialize the canvas and categorize emojis
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(FONT_SIZE);
  textAlign(CENTER, CENTER);
  categorizeEmojis();
}

/**
 * Categorize emojis based on their prominent colors
 */
function categorizeEmojis() {
  const emojiRanges = [
    [0x1F300, 0x1F5FF],
    [0x1F600, 0x1F64F],
    [0x1F680, 0x1F6FF],
    [0x1F900, 0x1F9FF],
    [0x2600, 0x26FF],
    [0x2700, 0x27BF],
    [0x1F400, 0x1F4FF]
  ];

  for (let range of emojiRanges) {
    for (let code = range[0]; code <= range[1]; code++) {
      const emoji = String.fromCodePoint(code);
      const category = getEmojiCategory(emoji);
      if (category) {
        EMOJI_CATEGORIES[category].push(emoji);
      }
    }
  }

  // Ensure each category has at least one emoji
  for (let category in EMOJI_CATEGORIES) {
    if (EMOJI_CATEGORIES[category].length === 0) {
      EMOJI_CATEGORIES[category].push('❓');
    }
  }
}

/**
 * Determine the category of an emoji based on its prominent color
 * This is a simplified version and may not be 100% accurate
 * @param {string} emoji - The emoji character
 * @returns {string|null} The category name or null if not categorized
 */
function getEmojiCategory(emoji) {
  const blueEmojis = '🌊🌎🐳🐬🦋🐟💙🔵🧢👖🚙🏊‍♂️🐋🦕🧿🥶❄️🌀🧊🎐🐦🦀💧🌌🌠🌃🛰️🛸🚀🔹🔷🛡️🌀📘✳️🟦🌌🌉';
  const cyanEmojis = '🐋🐳🐟🐬💎🔷💠🌊🔹🌀🎐';
  const greenEmojis = '🌿🍀🌱🌲🥬🥦🐸💚🟢🧪🥝🍏🦎🐊🐢🍃🥗🧑‍🌾🍉🍈🥒🥑🌳🌵🐍🐲🪴🦎🦖';
  const yellowEmojis = '🌻🌟🍋🍌🐥💛🟨🏆🌕🔶☀️🌞🍯🐤🚕🍍⭐🌼🧀🐝🐤🦋💛🟡🌝🌟';
  const orangeEmojis = '🍊🎃🦁🔶🟧🟠🍑🥕🦊🧡🍁🦒🐅🥭🧳🔸🦺🏀🚼🦧🦊';
  const redEmojis = '🍎🍓🌹❤️🔴🟥🏮🚨👹🐞🍅🌶️🍒🦞🦀🆘🧨🏥🚗🐙🦑🧛‍♂️🧟‍♀️🦌🦧';

  if (blueEmojis.includes(emoji)) return 'blue';
  if (cyanEmojis.includes(emoji)) return 'cyan';
  if (greenEmojis.includes(emoji)) return 'green';
  if (yellowEmojis.includes(emoji)) return 'yellow';
  if (orangeEmojis.includes(emoji)) return 'orange';
  if (redEmojis.includes(emoji)) return 'red';
  return null;
}

/**
 * Draw function to render emojis on the canvas
 */
function draw() {
  background(220);

  const time = frameCount * 0.0009;

  for (let x = 0; x < width; x += FONT_SIZE) {
    for (let y = 0; y < height; y += FONT_SIZE) {
      const noiseValue = calculateNoiseValue(x, y, time);
      const emoji = getEmojiFromNoiseValue(noiseValue);
      text(emoji, x, y);
    }
  }
}

/**
 * Calculate Perlin noise value for given coordinates and time
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} time - Time factor for animation
 * @returns {number} Noise value between 0 and 1
 */
function calculateNoiseValue(x, y, time) {
  return noise((x + xOffset) * NOISE_SCALE, (y + yOffset) * NOISE_SCALE, time);
}

/**
 * Get emoji character based on noise value
 * @param {number} noiseValue - Perlin noise value between 0 and 1
 * @returns {string} Emoji character
 */
function getEmojiFromNoiseValue(noiseValue) {
  let category, adjustedNoiseValue;
  if (noiseValue < 0.25) {
    category = 'blue';
    adjustedNoiseValue = map(noiseValue, 0, 0.25, 0, 1);
  } else if (noiseValue < 0.4) {
    category = 'cyan';
    adjustedNoiseValue = map(noiseValue, 0.25, 0.4, 0, 1);
  } else if (noiseValue < 0.55) {
    category = 'green';
    adjustedNoiseValue = map(noiseValue, 0.4, 0.55, 0, 1);
  } else if (noiseValue < 0.725) {
    category = 'yellow';
    adjustedNoiseValue = map(noiseValue, 0.55, 0.725, 0, 1);
  } else if (noiseValue < 0.85) {
    category = 'orange';
    adjustedNoiseValue = map(noiseValue, 0.725, 0.85, 0, 1);
  } else {
    category = 'red';
    adjustedNoiseValue = map(noiseValue, 0.85, 1, 0, 1);
  }

  const categoryEmojis = EMOJI_CATEGORIES[category];
  const index = floor(adjustedNoiseValue * categoryEmojis.length);
  return categoryEmojis[index];
}

/**
 * Handle mouse dragging to update offsets
 */
function mouseDragged() {
  xOffset += (pmouseX - mouseX) * 0.4;
  yOffset += (pmouseY - mouseY) * 0.4;
}

/**
 * Handle window resizing
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
