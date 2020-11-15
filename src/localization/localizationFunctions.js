export function changeLocalization(setLang, newLang, setLocalization){
  let lang = changeLang(newLang);
  setLang(lang);
  setLocalization(lang);
}

export function changeLocalizationClass(setState, newLang, setLocalization){
  let lang = changeLang(newLang);
  setState({language: lang});
  setLocalization(lang);
}

export function changeLang(lang) {
  if (lang === 'en') {
    return 'ua';
  } else {
    return 'en';
  }
}
