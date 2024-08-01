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
let mouseSensitivity = 0.4;
const FONT_SIZE = 16;
const NOISE_SCALE = 0.005;
const EMOJI_CATEGORIES = {
  deeppurple: '🫂👥👤🗣️👣🎇🎆🔮🌃🌆🎮💣🕹️♟️📓🔌🕋🗄️🎬🌩️⛈️',
  purple: '😈👿💟💜🧕🐈‍⬛🐾🕷️🐜🤩🍇🍆😎🍷🌚🌘🌂🐧👾☂️☔🪀🧤🖨️📲📱🖲️📼🎥📔📸🗜️🔙🔚🔛🔜🔝✖️➕➖➗🟰☑️✔️➰➿🟣🟪🧕🏿🧕🏼',
  lightpurple: '🛐⚛️🕉️✡️☸️☯️✝️☦️☪️☮️🕎🔯♈♉♊♋♌♍🥳♎♏♐♑♒♓⛎⚧️🟪🚺💷🪄🎲🤹🏻🤹🏼‍♀️👩🏾‍🤝‍👩🏿👭🏼🫐🥘🗻💾🍳⛸️⌚🛰️🏥🛹🤖🍱',
  magenta: '🦄🦩🌷🌺🪷🌸💮🪱🐙🥰😍💗🦜🐖😜🤪🐷🐽🍠💗🫕🍧🦑🧁🍭🥤🧠🫀👅👄🫦👩‍❤️‍👩👨‍❤️‍👨👩‍❤️‍👨💑👩‍❤️‍💋‍👩👨‍❤️‍💋‍👨👩‍❤️‍💋‍👨💏💐🏓🪅🪆🎴🎨🀄🎰👚👛👙🩱🩰💄🪗📍🪛🫧🧼🏳️‍⚧️💏🏻💏🏼👩🏿‍❤️‍💋‍👩🏿👩🏾‍❤️‍👩🏿👩🏼‍❤️‍👨🏾',
  darkblue: '💙🏊‍♀️🏊‍♂️🏊🐟🐬🥣🧊🌍🌎🌏🗺️🚝🛢️⛴️⛈️🌩️🌊🌀🌌🧿👔🔍🛌🔎📫📪📭📬🖋️🖊️🚍🩹🪒🩻🪣🛏️🛋️🔵🔷❄️🩴🔹👩🏿‍🏭👩🏽‍🏭👩🏻‍🏭👨🏽‍🏭🧑🏽‍🏭🧑🏻‍🏭🫃🏿🦸🏻🦸🏼‍♂️🦸🏽‍♀️🪢🧶🧵🧙🏿🏊🏿🏊🏿‍♂️🏊🏻🩺🧿💺🧢🪒🏊🏽🏊🏻🕺🏿🕺🏾🕺🏻👩🏿‍🏭',
  lightblue: '🥶💦💤🙅‍♂️🙆‍♂️💁‍♂️🙋‍♂️🦸🦸‍♂️🦸‍♀️🚣🚣‍♂️🚣‍♀️🏄‍♂️😨😰🕺🏂⛷️💇‍♂️👩‍🔧🧑‍🔧👮👮‍♀️👮‍♂️🧞🏂🤽‍♂️🚣‍♂️🤽🐠🪰🛡️🫗🥃🫙🏞️🌐🧙🏾‍♀️🧙🏽‍♀️🧙🏼‍♀️🧙🏻‍♀️🧙🏿‍♀️🧙🏻👮🏻👮🏿👮🏻‍♂️👮🏿‍♂️👮🏽‍♀️👮🏿‍♀️👮🏾‍♀️👮🏿‍♂️👮🏼‍♀️🚝🧳⚓💺🛢️🛥️⛴️🛴🏬🚉🚙🚏🪡🎭🪬🎐⚽🏸🥽👖👗👘🥿🛍️💎📘💶💉🧫🛗💳👓♾️⚕️🙅🏻‍♂️🤷🏻‍♂️👨🏼‍🔧🧑🏻‍🏭👮🏾‍♂️👮🏾‍♀️👮🏻‍♀️🧙🏼‍♀️🧙🏻‍♀️🧚🏼‍♂️🧚🏽‍♂️🦸🏽‍♂️🦸🏼‍♂️🚣🏼‍♂️🏄🏼‍♂️🏄🏾‍♂️🏄🏼‍♀️🚣🏾‍♀️🤽🏻',
  cyan: '⚽🐠🐬🌊🏄‍♂️🐋🪞🐳🧟🧟‍♂️🧟‍♀️🐟🐬💎🧳💠🌊🥏😭😱🐳🐋🐬🩲🐟💻🖥️🌬️👖🥣🚙⏲️🏊‍♂️🐋🚅🚆🥶💍🎞️📺❄️💧🧊🎐🪪🎛️🩹🏧🚮🚰♿🚹🚻🚼🚾🛂🛃🛄🛅⬆️↗️➡️↘️⬇️↙️⬅️↖️↩️↪️⤴️⤵️🔃🔀🔁🔂🏙️▶️⏩⏭️⏯️◀️⏪⏮️🔼⏫🆗🅿🆙🈁🈂️🟦🔽⏬⏸️⏹️⏺️⏏️🎦📶#️⃣🆖🆕🆓🆒🔤🔣🔢🔡🈳💠🔠🦸🏻🧙🏽🧙🏾🧙🏿🚣🏿🚣🏽🚣🏻👮🏾👮🏻',
  emeraldgreen: '🥦🧆⛳🎽🏇🌲🌳🥝🫒🌽🐓💐🫑🥒🦆🪖🧝🏔️⛰️🐢🧌🌴🌾🍈🍾🌄🧝🏻🧝🏾👨🏻‍🏫👨🏿‍🏫🧑🏻‍🏫🧑🏾‍🏫🥗🔰🗽🛺🎄🎋🎍',
  limegreen: '🤮👽🤑🌱🦗🍃🪴🌵🌿☘️🍏🍐🥑🥬🧃🍸🗾⛺🥎🖼️🧩👕🥻🔋📟📚📗🏕️🖍️🔫⚗️🧪🪦',
  peargreen: '🧜‍♂️🧜‍♀️🦚🐸🦕🐊🦎🐍🟢🟩🐲🐉🦖🍀🪲🐛💲🧜🏼‍♂️🧜🏼🧜🏽‍♀️♻️🌏🌍🌍🗺️',
  chartreusgreen: '🤢💚✅🚵🚵‍♂️🚵‍♀️❎✳️❇️🈯💹🏜️🏘️👨‍🍼🦠🚜🚛🚎🚃🚞🛣️🛤️🩳🏡🏞️🏠🏚️🏘️💵💸🪂🚃',
  mustardyellow: '🌭🍕🍔🐕🦮🐶🦮🐕‍🦺🪐🐈🐆🦒🐫🐪🏈🐐🦌🐹🐿️🦥🪶🦉🐌🥠🦘🐡🫥🪺🥧🍰🎂🍪🍦🍗🧇🥞🥯🦪🪹🤠🍍🥔📦🧄🧅🥜🍞🥐🥖🫓🥨🥟🍘🥮🧋🥚🪃🥙🌯🌮🥪💰🪘🏫🏨⛪🕍🚌🚈🚃🎠🧸🧥👒💴🏏🏒🛷⚱️👜📿📜🕯️🪤',
  paradiseyellow: '🦳🦲🤙👈👉👆🖕👇☝️🫵🫱🫲🫳🫴👌🌓🌔🌕🌖🌗🌙🏆🏅🎁🎗️🎫🎖️🥇🏉🌛🌜🤌🦱🦱🤏✌️🤞🫰👋🤚🖐️✋🖖🤟🤘🧒👦👧🧑👱👨🧔🧔‍♂️🧔‍♀️👨‍🦰👨‍🦱👨‍🦲👩👩‍🦱🧑‍🦱✍️👶👃🧭🦻👂🦶🦵💪👍💛👎✊👊🤛🤜👏🙌🫶👐☀️🌝🌞✨⭐🟡🌟🤲🐥🐤👼🫔🐣🤝⌛⏳👱‍♂️🚕🚖🚚⛵🛸🎷🎊⛱️👱‍♀️🧑‍🦲🧽🪙👷‍♂️🧀👷‍♀️🌻🍋🧈🍝🍌👩‍🦲📒💡🏷️🗂️📂📁🔒🔓🍺🍻🥂🗃️🗝️🔑🔐🔏⚖️🪝📣📯🔔🔕',
  goldenyellow: '😀😃😄😁😆😅🤣😂🙂🙃🫠😉😊😇😘😗😚😙🥲😋😛😝🤗🤭🫢🫣🤫🤔🫡🤐🤨😐😑😶😶‍🌫️😏😒🙄😬😮‍💨🤥😌😔😪🤤😴😷🤒🤕🤧😲😯😮☹️🙁😟🫤😕🧐🤓🤯😵‍💫😵🥴😳🥺🥹😦😧😥😢😖😣😞😓😩😫🥱😤😽😼😻😹😸😺😠🙀💫🏕️🏖️🏗️🛺🛎️🚡⛅🌤️🌥️👑🥾🎺💽📀⚠️🚸☣️☢️🔅🔆⚜️🔱🔰〽️🟨',
  orange: '👩‍🦰🧑‍🦰🏵️🌆🌇🌅✴️🟧🔶🔸🟠🆚🈷️🈶🈚🪸🉑🈸🈺🎠🚚⛵☄️🔥🎃🎇🥉🧶🦺👘🩳☣️☢️📳📴🎻🏮📙🪠🚼🏀🐱🍊🤬🎃🦁🔶🟧🟠🍑🥕🦊💥❤️‍🔥🏄🦧🦁🐯🐡🏵️🍂🍊🍑🥕🥮🥧🏺🏜️🧱🌄🧡🍁🦒🐅🥭🐙🔸🦺🔥🍤🏀🐝🫅🧖👷👷🏻👷🏼🚁📳📴👷🏽👷🏾👷🏿💁😿😾🤼🧮🪔👩‍👩‍👧‍👧✏️⛹️',
  red: '😍🥰🥵😡🤬🤡👹👺❣️💔❤️‍🔥❤‍🩹💯💋💢💥🐔🐙🐞🪱🌸🌹🌺🥀🍁🍂🍄🍉🍎🍓🍒🍅🌶️🥩🍖🍟🫕🥫🍿🍣🦀🦞🦐🦑🍫🍷🥤🏜️🧱⛩️♨️🎪🚒🚂🚗🚘🏎️🛑⛽🛢️🛟🚢🚀🚁⏰🌡️☄️🔥🧨🧧🎈🎁🎟️🏓🥊🛷🎯🎴🧶🧣🎒👠⛑️📿💄🎸🥁☎️🪫🧮🏮📕📮🖍️📌📍✂️🪓🧰🛡️🧲🧫🩸💊🧯⛔🚫❓❗📛⭕❌🅰️🆎🅱️🆑🅾️🆘🉐🈹🈲🈴㊗️㊙️🈵🔴🟥🔺🔻🚩',

  };

/**
 * Setup function to initialize the canvas
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(FONT_SIZE);
  textAlign(CENTER, CENTER);
}

/**
 * Draw function to render emojis on the canvas
 */
function draw() {
  background(220);
  const time = frameCount * 0.01;

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
  let category;
  let adjustedNoiseValue;

  // Define category ranges and adjust noise values
  if (noiseValue < 0.0625) {
      category = 'deeppurple';
      adjustedNoiseValue = map(noiseValue, 0, 0.0625, 0, 1);
  } else if (noiseValue < 0.125) {
      category = 'purple';
      adjustedNoiseValue = map(noiseValue, 0.0625, 0.125, 0, 1);
  } else if (noiseValue < 0.1875) {
      category = 'lightpurple';
      adjustedNoiseValue = map(noiseValue, 0.125, 0.1875, 0, 1);
  } else if (noiseValue < 0.25) {
      category = 'magenta';
      adjustedNoiseValue = map(noiseValue, 0.1875, 0.25, 0, 1);
  } else if (noiseValue < 0.3125) {
      category = 'darkblue';
      adjustedNoiseValue = map(noiseValue, 0.25, 0.3125, 0, 1);
  } else if (noiseValue < 0.375) {
      category = 'lightblue';
      adjustedNoiseValue = map(noiseValue, 0.3125, 0.375, 0, 1);
  } else if (noiseValue < 0.4375) {
      category = 'cyan';
      adjustedNoiseValue = map(noiseValue, 0.375, 0.4375, 0, 1);
  } else if (noiseValue < 0.5) {
      category = 'emeraldgreen';
      adjustedNoiseValue = map(noiseValue, 0.4375, 0.5, 0, 1);
  } else if (noiseValue < 0.5625) {
      category = 'limegreen';
      adjustedNoiseValue = map(noiseValue, 0.5, 0.5625, 0, 1);
  } else if (noiseValue < 0.625) {
      category = 'peargreen';
      adjustedNoiseValue = map(noiseValue, 0.5625, 0.625, 0, 1);
  } else if (noiseValue < 0.6875) {
      category = 'chartreusgreen';
      adjustedNoiseValue = map(noiseValue, 0.625, 0.6875, 0, 1);
  } else if (noiseValue < 0.75) {
      category = 'mustardyellow';
      adjustedNoiseValue = map(noiseValue, 0.6875, 0.75, 0, 1);
  } else if (noiseValue < 0.8125) {
      category = 'paradiseyellow';
      adjustedNoiseValue = map(noiseValue, 0.75, 0.8125, 0, 1);
  } else if (noiseValue < 0.875) {
      category = 'goldenyellow';
      adjustedNoiseValue = map(noiseValue, 0.8125, 0.875, 0, 1);
  } else {
      category = 'orange';
      adjustedNoiseValue = map(noiseValue, 0.875, 1, 0, 1);
  }

  const categoryEmojis = EMOJI_CATEGORIES[category];
  
  // Calculate index based on adjusted noise value and category emoji length
  const index = floor(adjustedNoiseValue * (categoryEmojis.length - 1));
  
  return categoryEmojis[index];
}



/**
 * Handle mouse dragging to update offsets
 */
function mouseDragged() {
  xOffset += (pmouseX - mouseX) * mouseSensitivity;
  yOffset += (pmouseY - mouseY) * mouseSensitivity;
}

/**
 * Handle window resizing
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}