/*
Added JS based from https://github.com/origamid/publico/blob/main/cookies/cookies.js
*/

function cookies(functions) {
  const container = document.querySelector('.cookies-container');
  const save = document.querySelector('.cookies-save');
  const triggerContainer = document.querySelector('.cookies-settings-trigger-container');
  const bgOverlay = document.querySelector('.cookies-bg-overlay');

  if (!container || !save) return null;

  // localstorage verify cookie-pref
  const localPref = getCookiePrefs();
  if (localPref) activateFunctions(localPref);

  //get preferences from form
  function getFormPref() {
    return [...document.querySelectorAll('[data-function]')]
      .filter((el) => el.checked)
      .map((el) => el.getAttribute('data-function'));
  }

  //activate functions on preferences form
  function activateFunctions(pref) {
    console.log("active", pref)
    pref.forEach((f) => {
      functions[f]();
      document.querySelector('[data-function="' + f + '"]').checked = true;
    });
  }

  //get form preferences and activate functions
  function handleSave() {
    const pref = getFormPref();
    activateFunctions(pref);
    setCookiePrefs(pref);
    //reload window after set preference
    window.location.reload();
  }

  function visibleTag(selector, event) {
    (event == "show") ? selector.style.display = 'block' : selector.style.display = 'none';
  }

  function handleTrigger() {
    visibleTag(container, "show");
    visibleTag(triggerContainer, "hide");
    visibleTag(bgOverlay, "show");
  }

  function getTimestamp() {
    return new Date().getTime();
  }

  function getCookiePrefs() {
    // get cookies-pref at localstorage
    const pref = JSON.parse(window.localStorage.getItem('cookies-pref'))
    //checks for pref-cookies on localstorage
    if (pref) {
      visibleTag(container, "hide");
      visibleTag(triggerContainer, "show");
      visibleTag(bgOverlay, "hide");
      return pref.prefs;
    } else {
      visibleTag(container, "show");
      visibleTag(triggerContainer, "hide");
      visibleTag(bgOverlay, "hide");
      console.log("Not cookie preset!")
      return false;
    }
  }

  function setCookiePrefs(prefs) {
    cookiesPref = {
      prefs,
      consentDate: getTimestamp()
    }

    // set cookies-pref on localstorage
    window.localStorage.setItem('cookies-pref', JSON.stringify(cookiesPref));

  }

  // listen button save click
  save.addEventListener('click', handleSave);
  triggerContainer.addEventListener('click', handleTrigger);
}

// function to enable advertising script 
function ads() {
  console.log("Advertising Tag: Loaded");
}

// function to enable Social Media script 
function socialmedia() {
  console.log("Social Media Tag: Loaded");
}

//function to enable analytics script with anonymize_ip: true !0 and async = true
function analytics() {
  const UA = "UA-109615476-1"; // google analytics UA
  const script = document.createElement("script"); function gtag() { dataLayer.push(arguments) } script.type = "text/javascript", script.async = "true", script.src = "https://www.googletagmanager.com/gtag/js?id=" + UA + "", document.body.appendChild(script), window.dataLayer = window.dataLayer || [], gtag("js", new Date), gtag("config", UA, { anonymize_ip: !0 });
  console.log('Google Analytics: Loaded!');
}

function insertHtmlCookie() {
  const html = `
    <a
    href="#"
    class="cookies-settings-trigger-container cookies-settings-trigger-bottom-left"
  >
    <div class="cookies-privacy-settings-trigger">
      <i class="fa fa-lg fa-fingerprint"></i>
    </div>
  </a>
  <div class="cookies-bg-overlay"></div>
  <div class="cookies-container">
    <div class="cookies-content">
      <p>Permito o uso de cookies para:</p>
      <div class="cookies-pref">
        <label
          ><input type="checkbox" data-function="analytics" />Análise de
          Uso</label
        >
        <label><input type="checkbox" data-function="ads" />Marketing</label>
        <label
          ><input
            type="checkbox"
            data-function="socialmedia"
          />Facebook</label
        >
      </div>
      <button class="cookies-save">💾 Salvar e Continuar</button>
      <div class="cookies-policy-list">
        <ul class="cookies-policy-link-list">
          <li><a href="">Política de Cookies</a></li>
          <li><a href="">Política de Privacidade</a></li>
        </ul>
      </div>
    </div>
  </div>
  `
  document.body.innerHTML += html;
}

function insertCss() {
  document.head.insertAdjacentHTML("beforeend", `
  <style>
    /*
    Added CSS based from https://github.com/origamid/publico/blob/main/cookies/cookies.css
    */

    p {
      margin: 0px;
    }

    body {
      margin: 0px;
      height: 200vh;
      background: #eee;
    }

    .cookies-container {
      color: #222;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      position: fixed;
      width: 100%;
      bottom: 2rem;
      z-index: 1000;
    }

    .cookies-content {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
      background: white;
      max-width: 640px;
      border-radius: 5px;
      padding: 1rem;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.5rem;
      opacity: 0;
      transform: translateY(1rem);
      animation: slideUp 0.5s forwards;
    }

    @keyframes slideUp {
      to {
        transform: initial;
        opacity: initial;
      }
    }

    .cookies-pref label {
      margin-right: 1rem;
    }

    .cookies-save {
      grid-column: 2;
      grid-row: 1/3;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      background: #201747;
      color: white;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      padding: 0.8rem 1rem;
      font-size: 1rem;
    }

    .cookies-settings-trigger-container {
      z-index: 999;
      font-size: 20px;
      position: fixed;
      bottom: 45px;
      border: 1px solid #fff;
      background-color: #201747;
      color: #ffffff;
      height: 60px;
      width: 60px;
      text-align: center;
      line-height: 60px;
      border-radius: 50%;
      display: none;
      opacity: 0;
      transform: translateY(1rem);
      animation: slideUp 0.5s forwards;
    }

    .cookies-settings-trigger-bottom-left {
      left: 1%;
    }

    .cookies-bg-overlay {
      z-index: 999;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: block;
    }

    .cookies-policy-link-list {
      margin-bottom: 0;
      padding: 0;
      list-style-type: none;
      text-align: center;
    }

    .cookies-policy-link-list li {
      display: inline;
      margin-right: 1rem;
    }

    @media (max-width: 500px) {
      .cookies-content {
        grid-template-columns: 1fr;
      }
      .cookies-save {
        grid-column: 1;
        grid-row: 3;
      }
    }
  </style>
  `)
}

function main() {

  insertCss();
  insertHtmlCookie();

  cookies({
    ads,
    socialmedia,
    analytics,
  });
}

main();


