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
      if (QUERY.value) detalizedUrl += `&q=${QUERY.value}`;
      detalizedUrl = `https://corsproxy.io/?${encodeURIComponent(detalizedUrl)}`;
      break;

    case "GNews":
      if (detalizedLanguage[0]) detalizedUrl += `&lang=${detalizedLanguage[0]}`;
      if (detalizedCategory[0]) detalizedUrl += `&category=${detalizedCategory[0]}`;
      if (QUERY.value) detalizedUrl += `&q=${QUERY.value}`;
      detalizedUrl = `https://corsproxy.io/?${encodeURIComponent(detalizedUrl)}`;
      break;

    case "NewsApi":
      if (detalizedCategory[0] && detalizedCategory[0] != 'general') {
        detalizedUrl += `&category=${detalizedCategory[0]}`;
      }
      if (detalizedLanguage[0]) detalizedUrl += `&language=${detalizedLanguage[0]}`;
      if (QUERY.value) detalizedUrl += `&q=${QUERY.value}`;
      detalizedUrl = `https://corsproxy.io/?${encodeURIComponent(detalizedUrl)}`;
      break;

    case "TheNewsApi":
      if (detalizedCategory[0] && detalizedCategory[0] != 'general') {
        detalizedUrl += `&categories=${detalizedCategory[0]}`;
      }
      if (detalizedLanguage[0]) detalizedUrl += `&language=${detalizedLanguage[0]}`;
      if (QUERY.value) detalizedUrl += `&search=${QUERY.value}`;
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
            source_url: " ", // не існує, тому ставимо заглушку
            link: article.url || ""
          }));
          break;
        case "TheNewsApi":
          mappedResponse = data.map(article => ({
            image_url: article.image_url || "",
            title: article.title || "",
            description: article.description || "",
            source_name: article.source || "",
            source_url: 'https://www.' + article.source, // не існує, тому ставимо заглушку
            link: article.url || ""
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

// --------------------- HEADER FUNCTIONS ----------------------
