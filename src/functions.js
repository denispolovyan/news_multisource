// --------------------- MAIN FUNCTIONS ----------------------

// встановлює кукі
export function setCookie(name, value, minutes) {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// перевіряє чи кукі існують
export function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

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
            link: article.link || "",
            date_day: article.pubDate.slice(0, 10) || "",
            date_time: article.pubDate.slice(11, 16) || ""
          }));
          break;
        case "GNews":
          mappedResponse = data.map(article => ({
            image_url: article.image || "",
            title: article.title || "",
            description: article.description || "",
            source_name: article.source?.name || "",
            source_url: article.source?.url || "",
            link: article.url || "",
            date_day: article.publishedAt.slice(0, 10) || "",
            date_time: article.publishedAt.slice(11, 16) || ""
          }));
          break;
        case "NewsApi":
          mappedResponse = data.map(article => ({
            image_url: article.urlToImage || "",
            title: article.title || "",
            description: article.description || "",
            source_name: article.source.name || "",
            source_url: `${new URL(article.url).origin}/` || "",
            link: article.url || "",
            date_day: article.publishedAt.slice(0, 10) || "",
            date_time: article.publishedAt.slice(11, 16) || ""
          }));
          break;
        case "TheNewsApi":
          mappedResponse = data.map(article => ({
            image_url: article.image_url || "",
            title: article.title || "",
            description: article.description || "",
            source_name: article.source || "",
            source_url: `${new URL(article.url).origin}/` || "", 
            link: article.url || "",
            date_day: article.published_at.slice(0, 10) || "",
            date_time: article.published_at.slice(11, 16) || ""
          }));
          break;
        case "WorldNews":
          mappedResponse = data.map(article => ({
            image_url: article.image || "",
            title: article.title || "",
            description: article.text || "",
            source_name: `${new URL(article.url).hostname.replace(/^www\./, '').replace(/\/$/, '')}` || "",
            source_url: `${new URL(article.url).origin}/` || "",
            link: article.url || "",
            date_day: article.publish_date.slice(0, 10) || "",
            date_time: article.publish_date.slice(11, 16) || ""
          }));
          break;
        case "Currents":
          mappedResponse = data.map(article => ({
            image_url: article.image || "",
            title: article.title || "",
            description: article.description || "",
            source_name: `${new URL(article.url).hostname.replace(/^www\./, '').replace(/\/$/, '')}` || "",
            source_url: `${new URL(article.url).origin}/` || "", 
            link: article.url || "",
            date_day: article.published.slice(0, 10) || "",
            date_time: article.published.slice(11, 16) || "",
          }));
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
  return data.slice(0, length);
}

// перевіряє, чи два параметри однакові
export function isParametersDifferent(value, prevValue){
  return (value == prevValue) ? false : true;
}

// повертає параметри пошуку юрл строки
export function getSavedData() {
  const keys = ['server', 'query', 'category', 'language'];

  const result = keys
    .map((key) => {
      const value = localStorage.getItem(key);
      if (!value || value === 'null') return null;

      // Якщо category або language — беремо частину після коми і робимо нижній регістр
      if ((key === 'category' || key === 'language') && value.includes(',')) {
        return value.split(',')[1].trim().toLowerCase();
      }

      // Якщо category або language без коми — теж у нижній регістр
      if (key === 'category' || key === 'language') {
        return value.trim().toLowerCase();
      }

      // Інакше просто повертаємо значення
      return value.trim();
    })
    .filter(Boolean)
    .join(', ');

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

// повертає картинки котік для заглушок
export async function getPlaceholderPhoto(base_url, api_key) {
  try {
    const response = await fetch(`${base_url}${api_key}`);
    const data = await response.json();
    return data.map(cat => cat.url);
  } catch (error) {
    console.error(error)
  }
}

// повертає сервери по яким здійснюється пошук
export function setActualServers(SERVERS, detalizedCategory, detalizedLanguage) {
  let simpleSearchServers = SERVERS;

  if (detalizedLanguage[0] == 'uk') {
    simpleSearchServers = simpleSearchServers.filter(s => !['NewsApi', 'Currents'].includes(s));
  }

  switch (detalizedCategory[0]) {
    case 'politics':
      simpleSearchServers = simpleSearchServers.filter(s => !['GNews', 'NewsApi', 'TheNewsApi'].includes(s));
      break
    case 'science':
    case 'business':
    case 'health':
      simpleSearchServers = simpleSearchServers.filter(s => !['WorldNews'].includes(s))
      break
  }

  return simpleSearchServers;
}

// встановлюємо чи була відповідь від сервера після запиту
export function setIsResponseEmpty(news) {
  let isResponseEmpty = '';

  if (news.value && news.value.length) {
    isResponseEmpty = false;
  } else {
    isResponseEmpty = true;
    // news.value = [];
  }

  return isResponseEmpty;
}

// --------------------- HEADER FUNCTIONS ----------------------

// повертає значення інпуту строкою
export function returnStringifiedTheme(booleanString){
  if(booleanString === true) return'true'
  else return 'false'
}

// --------------------- FOOTER FUNCTIONS ----------------------

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // плавна прокрутка
  });
}


