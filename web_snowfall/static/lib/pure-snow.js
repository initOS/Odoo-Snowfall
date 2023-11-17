/* [initOS] This code has been adapted to Odoo from its original at
 * https://github.com/hyperstown/pure-snow.js
 * file "pure-snow.js" at commit 1107ea870a02c09ce07fa74fa8c100eebe43363e
 * under MIT License; see file LICENSE in the repository
 */
/* eslint-disable */

let snowflakesCount = 200; // Snowflake count, can be overwritten by attrs
let baseCSS = ``;

// [initOS] Removed unused global attributes

let bodyHeightPx = null;
let pageHeightVh = null;

function setHeightVariables() {
  // [initOS] Added check
  if (!document.body) {
    return;
  }
  bodyHeightPx = document.body.offsetHeight;
  pageHeightVh = (100 * bodyHeightPx / window.innerHeight);
}

// get params set in snow div
function getSnowAttributes() {
  const snowWrapper = document.getElementById('snow');
  snowflakesCount = Number(
    // [initOS] Reworked conditional `?.` to work with older browsers
    (snowWrapper && snowWrapper.dataset && snowWrapper.dataset.count) || snowflakesCount
  );
}

// This function allows you to turn on and off the snow
function showSnow(value) {
  // [initOS] Added check, refactored HTML element into a variable
  const snowWrapper = document.getElementById("snow");
  // [initOS] temporarily store the snow state, in order to keep it during browser refresh
  window.sessionStorage.setItem("odoo.web_snowfall.snow", value);
  if (!snowWrapper) {
    return;
  }
  if (value) {
    snowWrapper.style.display = "block";
  }
  else {
    snowWrapper.style.display = "none";
  }
}

// Creating snowflakes
function generateSnow(snowDensity = 200) {
  snowDensity -= 1;
  const snowWrapper = document.getElementById('snow');
  // [initOS] Added check
  if (!snowWrapper) {
    return;
  }
  snowWrapper.innerHTML = '';
  for (let i = 0; i < snowDensity; i++) {
    let board = document.createElement('div');
    board.className = "snowflake";
    board.className += " fa fa-snowflake-o"; // [initOS] Make this a snowflake text in Odoo
    snowWrapper.appendChild(board);
  }
}

function getOrCreateCSSElement() {
  let cssElement = document.getElementById("psjs-css");
  if (cssElement) return cssElement;

  cssElement = document.createElement('style');
  cssElement.id = 'psjs-css';
  document.head.appendChild(cssElement);
  return cssElement;
}

// Append style for each snowflake to the head
function addCSS(rule) {
  const cssElement = getOrCreateCSSElement();
  cssElement.innerHTML = rule; // safe to use innerHTML
  document.head.appendChild(cssElement);
}

// Math
function randomInt(value = 100) {
  return Math.floor(Math.random() * value) + 1;
}

function randomIntRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Create style for snowflake
function generateSnowCSS(snowDensity = 200) {
  let snowflakeName = "snowflake";
  let rule = baseCSS;

  for (let i = 1; i < snowDensity; i++) {
    let randomX = Math.random() * 100; // vw
    let randomOffset = Math.random() * 10 // vw;
    let randomXEnd = randomX + randomOffset;
    let randomXEndYoyo = randomX + (randomOffset / 2);
    let randomYoyoTime = getRandomArbitrary(0.3, 0.8);
    let randomYoyoY = randomYoyoTime * pageHeightVh; // vh
    let randomScale = Math.random();
    let fallDuration = randomIntRange(10, pageHeightVh / 10 * 3); // s
    let fallDelay = randomInt(pageHeightVh / 10 * 3) * -1; // s
    let opacity = Math.random();

    // [initOS] Removed superfluous `scale` from `transform`
    rule += `
      .${snowflakeName}:nth-child(${i}) {
        opacity: ${opacity};
        transform: translate(${randomX}vw, -10px) scale(${randomScale});
        animation: fall-${i} ${fallDuration}s ${fallDelay}s linear infinite;
      }
      @keyframes fall-${i} {
        ${randomYoyoTime * 100}% {
          transform: translate(${randomXEnd}vw, ${randomYoyoY}vh);
        }
        to {
          transform: translate(${randomXEndYoyo}vw, ${pageHeightVh}vh);
        }
      }
    `
  }
  addCSS(rule);
}

// Load the rules and execute after the DOM loads
function createSnow() {
  // [initOS] Wait until the HTML is prepared, only then create the snow
  const stateCheck = setInterval(() => {
    if (document.getElementById("snow")) {
      clearInterval(stateCheck);
      setHeightVariables();
      getSnowAttributes();
      generateSnowCSS(snowflakesCount);
      generateSnow(snowflakesCount);
    }
  }, 100);
};


window.addEventListener('resize', createSnow);

// [initOS] Removed meaningless (for Odoo) export
window.onload = createSnow;
