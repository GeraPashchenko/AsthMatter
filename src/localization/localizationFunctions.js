export function changeLocalization(setLang, newLang){
  let lang = changeLang(newLang);
  localStorage.setItem('language', lang);
  setLang(lang);
}

export function changeLocalizationClass(setState, newLang){
  let lang = changeLang(newLang);
  localStorage.setItem('language', lang);
  setState({language: lang});
}

export function changeLang(lang) {
  if (lang === 'en') {
    return 'ua';
  } else {
    return 'en';
  }
}
