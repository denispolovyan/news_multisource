// src/constants.js

// Константи з базовими параметрами
export const API_BASE_URL_NEWSDATA = "https://newsdata.io/api/1/latest?apikey=";
export const API_KEY_NEWSDATA = "pub_937f45933a914c54bd902b3244edd2b7";

export const API_BASE_URL_GNEWS = "https://gnews.io/api/v4/search?apikey=";
export const API_KEY_GNEWS = "3e41bc58bc17842da25cc3a6355c47d4";

export const API_BASE_URL_NEWSAPI = "https://newsapi.org/v2/everything?apiKey=";
export const API_KEY_NEWSAPI = "c3191c2bd3d34202b971d8e4d7e05869";

// Доступні категорії
export const CATEGORIES = [
  ["sports", "Спорт"],
  ["politics", "Політика"],
  ["technology", "Технології"],
];

// Мови, що підтримуються
export const LANGUAGES = [
  ["uk", "Українська"],
  ["en", "Англійська"],
  ["de", "Німецька"],
];

export const SERVER = [
   'NewsData','GNews'
  //  'NewsData','GNews','NewsApi'

]
