// --------------------- MAIN FUNCTIONS ----------------------

// формує адресу для запиту на сервер
export function returnUrlStr(str, api, detalizedCategory, detalizedLanguage, QUERY) {
  let detalizedUrl = str;

  switch (api) {
    case "NewsData":
      if (detalizedCategory[0] && detalizedCategory[0] != 'general') {
        detalizedUrl += `&category=${detalizedCategory[0]}`;
      }
      if (detalizedLanguage[0]) detalizedUrl += `&language=${detalizedLanguage[0]}`;
      if (QUERY.value) detalizedUrl += `&q=${QUERY.value.toLowerCase().trim().replace(/\s+/g, '')}`;
      console.log(detalizedUrl);
      detalizedUrl = `https://corsproxy.io/?${encodeURIComponent(detalizedUrl)}`;
      break;
    case "GNews":
      if (detalizedLanguage[0]) detalizedUrl += `&lang=${detalizedLanguage[0]}`;
      if (detalizedCategory[0]) detalizedUrl += `&category=${detalizedCategory[0]}`;
      if (QUERY.value) detalizedUrl += `&q=${QUERY.value.toLowerCase().trim().replace(/\s+/g, '')}`;
      detalizedUrl = `https://corsproxy.io/?${encodeURIComponent(detalizedUrl)}`;
      break;
    case "NewsApi":
      if (detalizedCategory[0] && detalizedCategory[0] != 'general') {
        detalizedUrl += `&category=${detalizedCategory[0]}`;
      }
      if (detalizedLanguage[0]) detalizedUrl += `&language=${detalizedLanguage[0]}`;
      if (QUERY.value) detalizedUrl += `&q=${QUERY.value.toLowerCase().trim().replace(/\s+/g, '')}`;
      detalizedUrl = `https://corsproxy.io/?${encodeURIComponent(detalizedUrl)}`;
      break;
    case "TheNewsApi":
      if (detalizedCategory[0] && detalizedCategory[0] != 'general') {
        detalizedUrl += `&categories=${detalizedCategory[0]}`;
      }
      if (detalizedLanguage[0]) detalizedUrl += `&language=${detalizedLanguage[0]}`;
      if (QUERY.value) detalizedUrl += `&search=${QUERY.value.toLowerCase().trim().replace(/\s+/g, '')}`;
      detalizedUrl = `https://corsproxy.io/?${encodeURIComponent(detalizedUrl)}`;
      break;
    case "WorldNews":
      if (detalizedCategory[0] && detalizedCategory[0] != 'general') {
        detalizedUrl += `&categories=${detalizedCategory[0]}`;
      }
      if (detalizedLanguage[0]) detalizedUrl += `&language=${detalizedLanguage[0]}`;
      if (QUERY.value) detalizedUrl += `&text=${QUERY.value.toLowerCase().trim().replace(/\s+/g, '')}`;
      detalizedUrl = `https://corsproxy.io/?${encodeURIComponent(detalizedUrl)}`;
      break;
    case "Currents":
      if (detalizedCategory[0] && detalizedCategory[0] != 'general') {
        detalizedUrl += `&category=${detalizedCategory[0]}`;
      }
      if (detalizedLanguage[0]) detalizedUrl += `&language=${detalizedLanguage[0]}`;
      if (QUERY.value) detalizedUrl += `&keywords=${QUERY.value.toLowerCase().trim().replace(/\s+/g, '')}`;
      detalizedUrl = `https://corsproxy.io/?${encodeURIComponent(detalizedUrl)}`;
      break;
  }


  return detalizedUrl;
}

// формує масив з відповіді від сервера для наповнювання розмітки
export function returnMappedResponse(data, server){
    let mappedResponse = [];
    if (data) {
      switch (server) {
        case "NewsData":
          mappedResponse = data.map(article => ({
            image_url: article.image_url || "",
            title: article.title || "",
            description: article.description || "",
            source_name: article.source_name || "",
            source_url: article.source_url || "",
            link: article.link || ""
          }));
          break;
        case "GNews":
          mappedResponse = data.map(article => ({
            image_url: article.image || "",
            title: article.title || "",
            description: article.description || "",
            source_name: article.source?.name || "",
            source_url: article.source?.url || "",
            link: article.url || ""
          }));
          break;
        case "NewsApi":
          mappedResponse = data.map(article => ({
            image_url: article.urlToImage || "",
            title: article.title || "",
            description: article.description || "",
            source_name: article.source.name || "",
            source_url: `${new URL(article.url).origin}/` || "",
            link: article.url || ""
          }));
          break;
        case "TheNewsApi":
          mappedResponse = data.map(article => ({
            image_url: article.image_url || "",
            title: article.title || "",
            description: article.description || "",
            source_name: article.source || "",
            source_url: `${new URL(article.url).origin}/` || "", 
            link: article.url || ""
          }));
          break;
        case "WorldNews":
          mappedResponse = data.map(article => ({
            image_url: article.image || "",
            title: article.title || "",
            description: article.text || "",
            source_name: `${new URL(article.url).hostname.replace(/^www\./, '').replace(/\/$/, '')}` || "",
            source_url: `${new URL(article.url).origin}/` || "",
            link: article.url || ""
          }));
          break;
        case "Currents":
          mappedResponse = data.map(article => ({
            image_url: article.image || "",
            title: article.title || "",
            description: article.description || "",
            source_name: `${new URL(article.url).hostname.replace(/^www\./, '').replace(/\/$/, '')}` || "",
            source_url: `${new URL(article.url).origin}/` || "", 
            link: article.url || ""
          }));
          console.log(mappedResponse);
          break;
        }

    // прибираємо дублі
    mappedResponse = mappedResponse.filter((article, index, self) =>
      index === self.findIndex(a => a.link === article.link)
    );
    }
    return mappedResponse;
}

// обрізає масив новин під потрібну кількість
export function cutMappedResponse(data, length){
  if (!data.length) return [];
  console.log(data, length);
  return data.slice(0, length);
}

// перевіряє, чи два параметри однакові
export function isParametersDifferent(value, prevValue){
  return (value == prevValue) ? false : true;
}

// повертає параметри пошуку юрл строки
export function getSavedData() {
  const mappings = {
    server: 'сервер',
    query: 'запит',
    category: 'категорія',
    language: 'мова'
  };

  const result = Object.entries(mappings)
    .map(([key, label]) => {
      const value = localStorage.getItem(key);
      if (!value || value === 'null') return null;
      // Для category і language беремо частину після коми
      const displayValue = (key === 'category' || key === 'language') && value.includes(',')
        ? value.split(',')[1]
        : value;
      return displayValue ? `${label} - ${displayValue.toLowerCase()}` : null;
    })
    .filter(Boolean)  // прибираємо null
    .join(', ');      // з'єднуємо в одну строку

  return result;
}

// записує параметри пошуку в локальну пам'ять
export function saveSearchData(cat, q, lang, serv, news){
  localStorage.setItem('category', cat);
  localStorage.setItem('query', q);
  localStorage.setItem('language', lang);
  localStorage.setItem('server', serv);
  localStorage.setItem('articles', JSON.stringify(news));
}


// --------------------- HEADER FUNCTIONS ----------------------

// повертає значення інпуту строкою
export function returnStringifiedTheme(booleanString){
  if(booleanString === true) return'true'
  else return 'false'
}

// --------------------- FOOTER FUNCTIONS ----------------------

