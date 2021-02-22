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

    console.log(pref)
    showTag(container, "hide");
    showTag(triggerContainer, "show");
    showTag(bgOverlay, "hide");
  }

  function showTag(selector, event) {
    (event == "show") ? selector.style.display = 'block' : selector.style.display = 'none';
  }

  function handleTrigger() {
    showTag(container, "show");
    showTag(triggerContainer, "hide");
    showTag(bgOverlay, "show");
  }

  function getTimestamp() {
    return new Date().getTime();
  }

  function getCookiePrefs() {
    const pref = JSON.parse(window.localStorage.getItem('cookies-pref'))
    if (pref) {
      console.log(pref)
      showTag(container, "hide");
      showTag(triggerContainer, "show");
      showTag(bgOverlay, "hide");
      return pref.prefs
    } else {
      showTag(container, "show");
      showTag(triggerContainer, "hide");
      showTag(bgOverlay, "hide");
      console.log("Não cookie")
    }
  }

  function setCookiePrefs(prefs) {
    cookiesPref = {
      prefs,
      consentDate: getTimestamp()
    }

    window.localStorage.setItem('cookies-pref', JSON.stringify(cookiesPref));
    window.location.reload();
  }

  // listen button save click
  save.addEventListener('click', handleSave);
  triggerContainer.addEventListener('click', handleTrigger);
}

function loadScript(url) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.defer = "true";
  script.async = "true";
  script.src = url;
  document.body.appendChild(script);
  console.log('loadScript');
}

function addScript(body) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerHTML = 'function gtag(){dataLayer.push(arguments)}!function(a,e,t,n,g,o,c){a.GoogleAnalyticsObject=g,a.ga=a.ga||function(){(a.ga.q=a.ga.q||[]).push(arguments)},a.ga.l=1*new Date,o=e.createElement(t),c=e.getElementsByTagName(t)[0],o.async=1,o.src="https://www.google-analytics.com/analytics.js",c.parentNode.insertBefore(o,c)}(window,document,"script",0,"ga"),window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","UA-109615476-1",{anonymize_ip:!0});';
  document.body.appendChild(script);
  console.log('loadScript');
}



// function to enable marketing script 
function marketing() {
  console.log('Função de marketing');
}

//function to enable analytics script 
function analytics() {
  const script = document.createElement("script"); function gtag() { dataLayer.push(arguments) } script.type = "text/javascript", script.async = "true", script.src = "https://www.googletagmanager.com/gtag/js?id=UA-109615476-1", document.body.appendChild(script), window.dataLayer = window.dataLayer || [], gtag("js", new Date), gtag("config", "UA-109615476-1", { anonymize_ip: !0 });
  console.log('loadScript: Analytics');
}


cookies({
  marketing,
  analytics,
});