/**
 * 
 * EmojiHeatmap: A dynamic, interactive display of emojis that shift 
 * with mouse movement, creating a detailed color-coordinated heatmap.
 *
 * Modified by Claude, based on original work by Jonas Kjeldmand Jensen, July 2024
 *
 */ 

// Global variables
let xOffset = 0;
let yOffset = 0;
const FONT_SIZE = 16;
const NOISE_SCALE = 0.006;
const EMOJI_CATEGORIES = [
  { color: 'deeppurple', emojis: '🫂👥👤🗣️👣🎇🎆🔮🌃🌆🎮💣🕹️♟️📓🔌🕋🗄️🎬🌩️⛈️' },
  { color: 'purple', emojis: '😈👿💟💜🧕🐈‍⬛🐾🕷️🐜🤩🍇🍆😎🍷🌚🌘🌂🐧👾☂️☔🪀🧤🖨️📲📱🖲️📼🎥📔📸🗜️🔙🔚🔛🔜🔝✖️➕➖➗🟰☑️✔️➰➿🟣🟪🧕🏿🧕🏼' },
  { color: 'lightpurple', emojis: '🛐⚛️🕉️✡️☸️☯️✝️☦️☪️☮️🕎🔯♈♉♊♋♌♍🥳♎♏♐♑♒♓⛎⚧️🟪🚺💷🪄🎲🤹🏻🤹🏼‍♀️👩🏾‍🤝‍👩🏿👭🏼🫐🥘🗻💾🍳⛸️⌚🛰️🏥🛹🤖🍱' },
  { color: 'magenta', emojis: '🦄🦩🌷🌺🪷🌸💮🪱🐙🥰😍💗🦜🐖😜🤪🐷🐽🍠💗🫕🍧🦑🧁🍭🥤🧠🫀👅👄🫦👩‍❤️‍👩👨‍❤️‍👨👩‍❤️‍👨💑👩‍❤️‍💋‍👩👨‍❤️‍💋‍👨👩‍❤️‍💋‍👨💏💐🏓🪅🪆🎴🎨🀄🎰👚👛👙🩱🩰💄🪗📍🪛🫧🧼🏳️‍⚧️💏🏻💏🏼👩🏿‍❤️‍💋‍👩🏿👩🏾‍❤️‍👩🏿👩🏼‍❤️‍👨🏾' },
  { color: 'darkblue', emojis: '💙🏊‍♀️🏊‍♂️🏊🐟🐬🥣🧊🌍🌎🌏🗺️🚝🛢️⛴️⛈️🌩️🌊🌀🌌🧿👔🔍🛌🔎📫📪📭📬🖋️🖊️🚍🩹🪒🩻🪣🛏️🛋️🔵🔷❄️🩴🔹👩🏿‍🏭👩🏽‍🏭👩🏻‍🏭👨🏽‍🏭🧑🏽‍🏭🧑🏻‍🏭🫃🏿🦸🏻🦸🏼‍♂️🦸🏽‍♀️🪢🧶🧵🧙🏿🏊🏿🏊🏿‍♂️🏊🏻🩺🧿💺🧢🪒🏊🏽🏊🏻🕺🏿🕺🏾🕺🏻👩🏿‍🏭' },
  { color: 'lightblue', emojis: '🥶💦💤🙅‍♂️🙆‍♂️💁‍♂️🙋‍♂️🦸🦸‍♂️🦸‍♀️🚣🚣‍♂️🚣‍♀️🏄‍♂️😨😰🕺🏂⛷️💇‍♂️👩‍🔧🧑‍🔧👮👮‍♀️👮‍♂️🧞🏂🤽‍♂️🚣‍♂️🤽🐠🪰🛡️🫗🥃🫙🏞️🌐🧙🏾‍♀️🧙🏽‍♀️🧙🏼‍♀️🧙🏻‍♀️🧙🏿‍♀️🧙🏻👮🏻👮🏿👮🏻‍♂️👮🏿‍♂️👮🏽‍♀️👮🏿‍♀️👮🏾‍♀️👮🏿‍♂️👮🏼‍♀️🚝🧳⚓💺🛢️🛥️⛴️🛴🏬🚉🚙🚏🪡🎭🪬🎐⚽🏸🥽👖👗👘🥿🛍️💎📘💶💉🧫🛗💳👓♾️⚕️🙅🏻‍♂️🤷🏻‍♂️👨🏼‍🔧🧑🏻‍🏭👮🏾‍♂️👮🏾‍♀️👮🏻‍♀️🧙🏼‍♀️🧙🏻‍♀️🧚🏼‍♂️🧚🏽‍♂️🦸🏽‍♂️🦸🏼‍♂️🚣🏼‍♂️🏄🏼‍♂️🏄🏾‍♂️🏄🏼‍♀️🚣🏾‍♀️🤽🏻' },
  { color: 'cyan', emojis: '⚽🐠🐬🌊🏄‍♂️🐋🪞🐳🧟🧟‍♂️🧟‍♀️🐟🐬💎🧳💠🌊🥏😭😱🐳🐋🐬🩲🐟💻🖥️🌬️👖🥣🚙⏲️🏊‍♂️🐋🚅🚆🥶💍🎞️📺❄️💧🧊🎐🪪🎛️🩹🏧🚮🚰♿🚹🚻🚼🚾🛂🛃🛄🛅⬆️↗️➡️↘️⬇️↙️⬅️↖️↩️↪️⤴️⤵️🔃🔀🔁🔂🏙️▶️⏩⏭️⏯️◀️⏪⏮️🔼⏫🆗🅿🆙🈁🈂️🟦🔽⏬⏸️⏹️⏺️⏏️🎦📶#️⃣🆖🆕🆓🆒🔤🔣🔢🔡🈳💠🔠🦸🏻🧙🏽🧙🏾🧙🏿🚣🏿🚣🏽🚣🏻👮🏾👮🏻' },
  { color: 'emeraldgreen', emojis: '🥦🧆⛳🎽🏇🌲🌳🥝🫒🌽🐓💐🫑🥒🦆🪖🧝🏔️⛰️🐢🧌🌴🌾🍈🍾🌄🧝🏻🧝🏾👨🏻‍🏫👨🏿‍🏫🧑🏻‍🏫🧑🏾‍🏫🥗🔰🗽🛺🎄🎋🎍' },
  { color: 'limegreen', emojis: '🤮👽🤑🌱🦗🍃🪴🌵🌿☘️🍏🍐🥑🥬🧃🍸🗾⛺🥎🖼️🧩👕🥻🔋📟📚📗🏕️🖍️🔫⚗️🧪🪦' },
  { color: 'peargreen', emojis: '🧜‍♂️🧜‍♀️🦚🐸🦕🐊🦎🐍🟢🟩🐲🐉🦖🍀🪲🐛💲🧜🏼‍♂️🧜🏼🧜🏽‍♀️♻️🌏🌍🌍🗺️' },
  { color: 'chartreusgreen', emojis: '🤢💚✅🚵🚵‍♂️🚵‍♀️❎✳️❇️🈯💹🏜️🏘️👨‍🍼🦠🚜🚛🚎🚃🚞🛣️🛤️🩳🏡🏞️🏠🏚️🏘️💵💸🪂🚃' },
  { color: 'mustardyellow', emojis: '🌭🍕🍔🐕🦮🐶🦮🐕‍🦺🪐🐈🐆🦒🐫🐪🏈🐐🦌🐹🐿️🦥🪶🦉🐌🥠🦘🐡🫥🪺🥧🍰🎂🍪🍦🍗🧇🥞🥯🦪🪹🤠🍍🥔📦🧄🧅🥜🍞🥐🥖🫓🥨🥟🍘🥮🧋🥚🪃🥙🌯🌮🥪💰🪘🏫🏨⛪🕍🚌🚈🚃🎠🧸🧥👒💴🏏🏒🛷⚱️👜📿📜🕯️🪤' },
  { color: 'paradiseyellow', emojis: '🦳🦲🤙👈👉👆🖕👇☝️🫵🫱🫲🫳🫴👌🌓🌔🌕🌖🌗🌙🏆🏅🎁🎗️🎫🎖️🥇🏉🌛🌜🤌🦱🦱🤏✌️🤞🫰👋🤚🖐️✋🖖🤟🤘🧒👦👧🧑👱👨🧔🧔‍♂️🧔‍♀️👨‍🦰👨‍🦱👨‍🦲👩👩‍🦱🧑‍🦱✍️👶👃🧭🦻👂🦶🦵💪👍💛👎✊👊🤛🤜👏🙌🫶👐☀️🌝🌞✨⭐🟡🌟🤲🐥🐤👼🫔🐣🤝⌛⏳👱‍♂️🚕🚖🚚⛵🛸🎷🎊⛱️👱‍♀️🧑‍🦲🧽🪙👷‍♂️🧀👷‍♀️🌻🍋🧈🍝🍌👩‍🦲📒💡🏷️🗂️📂📁🔒🔓🍺🍻🥂🗃️🗝️🔑🔐🔏⚖️🪝📣📯🔔🔕' },
  { color: 'goldenyellow', emojis: '😀😃😄😁😆😅🤣😂🙂🙃🫠😉😊😇😘😗😚😙🥲😋😛😝🤗🤭🫢🫣🤫🤔🫡🤐🤨😐😑😶😶‍🌫️😏😒🙄😬😮‍💨🤥😌😔😪🤤😴😷🤒🤕🤧😲😯😮☹️🙁😟🫤😕🧐🤓🤯😵‍💫😵🥴😳🥺🥹😦😧😥😢😖😣😞😓😩😫🥱😤😽😼😻😹😸😺😠🙀💫🏕️🏖️🏗️🛺🛎️🚡⛅🌤️🌥️👑🥾🎺💽📀⚠️🚸☣️☢️🔅🔆⚜️🔱🔰〽️🟨' },
  { color: 'orange', emojis: '👩‍🦰🧑‍🦰🏵️🌆🌇🌅✴️🟧🔶🔸🟠🆚🈷️🈶🈚🪸🉑🈸🈺🎠🚚⛵☄️🔥🎃🎇🥉🧶🦺👘🩳☣️☢️📳📴🎻🏮📙🪠🚼🏀🐱🍊🤬🎃🦁🔶🟧🟠🍑🥕🦊💥❤️‍🔥🏄🦧🦁🐯🐡🏵️🍂🍊🍑🥕🥮🥧🏺🏜️🧱🌄🧡🍁🦒🐅🥭🐙🔸🦺🔥🍤🏀🐝🫅🧖👷👷🏻👷🏼🚁📳📴👷🏽👷🏾👷🏿💁😿😾🤼🧮🪔👩‍👩‍👧‍👧✏️⛹️' },
  { color: 'red', emojis: '😍🥰🥵😡🤬🤡👹👺❣️💔❤️‍🔥❤‍🩹💯💋💢💥🐔🐙🐞🪱🌸🌹🌺🥀🍁🍂🍄🍉🍎🍓🍒🍅🌶️🥩🍖🍟🫕🥫🍿🍣🦀🦞🦐🦑🍫🍷🥤🏜️🧱⛩️♨️🎪🚒🚂🚗🚘🏎️🛑⛽🛢️🛟🚢🚀🚁⏰🌡️☄️🔥🧨🧧🎈🎁🎟️🏓🥊🛷🎯🎴🧶🧣🎒👠⛑️📿💄🎸🥁☎️🪫🧮🏮📕📮🖍️📌📍✂️🪓🧰🛡️🧲🧫🩸💊🧯⛔🚫❓❗📛⭕❌🅰️🆎🅱️🆑🅾️🆘🉐🈹🈲🈴㊗️㊙️🈵🔴🟥🔺🔻🚩' },
];

// Function to set up the canvas and initialize emojis
function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(FONT_SIZE);
  textAlign(CENTER, CENTER);
}

// Function to draw the emoji heatmap
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

// Function to calculate Perlin noise value
function calculateNoiseValue(x, y, time) {
  return noise((x + xOffset) * NOISE_SCALE, (y + yOffset) * NOISE_SCALE, time);
}

// Function to get emoji based on noise value
function getEmojiFromNoiseValue(noiseValue) {
  let category;
  if (noiseValue < 0.0625) {
    category = 'deeppurple';
  } else if (noiseValue < 0.125) {
    category = 'purple';
  } else if (noiseValue < 0.1875) {
    category = 'lightpurple';
  } else if (noiseValue < 0.25) {
    category = 'magenta';
  } else if (noiseValue < 0.3125) {
    category = 'darkblue';
  } else if (noiseValue < 0.375) {
    category = 'lightblue';
  } else if (noiseValue < 0.4375) {
    category = 'cyan';
  } else if (noiseValue < 0.5) {
    category = 'emeraldgreen';
  } else if (noiseValue < 0.5625) {
    category = 'limegreen';
  } else if (noiseValue < 0.625) {
    category = 'peargreen';
  } else if (noiseValue < 0.6875) {
    category = 'chartreusgreen';
  } else if (noiseValue < 0.75) {
    category = 'mustardyellow';
  } else if (noiseValue < 0.8125) {
    category = 'paradiseyellow';
  } else if (noiseValue < 0.875) {
    category = 'goldenyellow';
  } else if (noiseValue < 0.9375) {
    category = 'orange';
  } else {
    category = 'red';
  }

  const categoryIndex = EMOJI_CATEGORIES.findIndex(cat => cat.color === category);
  const categoryEmojis = EMOJI_CATEGORIES[categoryIndex].emojis;
  const index = floor(map(noiseValue, 
    categoryIndex / EMOJI_CATEGORIES.length, 
    (categoryIndex + 1) / EMOJI_CATEGORIES.length, 
    0, categoryEmojis.length));
  return categoryEmojis[index];
}

// Function to handle mouse dragging
function mouseDragged() {
  xOffset += (pmouseX - mouseX) * 0.1;
  yOffset += (pmouseY - mouseY) * 0.1;
}

// Function to handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}