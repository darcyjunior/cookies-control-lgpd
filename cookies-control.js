/*
Added JS based from https://github.com/origamid/publico/blob/main/cookies/cookies.js
*/

function cookies(functions) {
  const container = document.querySelector('.cookies-container');
  const save = document.querySelector('.cookies-save');
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
    pref.forEach((f) => functions[f]());
    container.style.display = 'none';
    window.localStorage.setItem('cookies-pref', JSON.stringify(pref));
  }

  //get form preferences and activate functions
  function handleSave() {
    const pref = getFormPref();
    activateFunctions(pref);
  }

  // listen button save click
  save.addEventListener('click', handleSave);
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