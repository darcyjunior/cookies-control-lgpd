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
  const localPref = JSON.parse(window.localStorage.getItem('cookies-pref'));
  if (localPref) activateFunctions(localPref);

  //get preferences from form
  function getFormPref() {
    return [...document.querySelectorAll('[data-function]')]
      .filter((el) => el.checked)
      .map((el) => el.getAttribute('data-function'));
  }

  //activate functions on preferences form
  function activateFunctions(pref) {
    pref.forEach((f) => {
      functions[f]();
      // adds the check state according to preferences
      document.querySelector('[data-function="' + f + '"]').checked = true;
    });
    window.localStorage.setItem('cookies-pref', JSON.stringify(pref));
  }

  //get form preferences and activate functions
  function handleSave() {
    const pref = getFormPref();
    activateFunctions(pref);
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

  // listen button save click
  save.addEventListener('click', handleSave);
  triggerContainer.addEventListener('click', handleTrigger);
}

// function to enable marketing script 
function marketing() {
  console.log('Função de marketing');
}

//function to enable analytics script 
function analytics() {
  console.log('Função de analytics');
}

cookies({
  marketing,
  analytics,
});