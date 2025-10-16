// src/constants.js

// Константи з базовими параметрами
export const API_BASE_URL_NEWSDATA = "https://newsdata.io/api/1/latest?apikey=";
export const API_KEY_NEWSDATA = "pub_937f45933a914c54bd902b3244edd2b7";

export const API_BASE_URL_GNEWS = "https://gnews.io/api/v4/top-headlines?apikey=";
export const API_KEY_GNEWS = "3e41bc58bc17842da25cc3a6355c47d4";

export const API_BASE_URL_NEWSAPI = "https://newsapi.org/v2/top-headlines?pageSize=10&apiKey=";
export const API_KEY_NEWSAPI = "c3191c2bd3d34202b971d8e4d7e05869";

// Доступні категорії
export const CATEGORIES = [
  ["general", "Без категорії"], // немає в NEWSDATA
  ["sports", "Спорт"],
  ["politics", "Політика"], // немає в NEWSAPI та  GNEWS
  ["technology", "Технології"],
  ["health", "Здоров'я"],
  ["science", "Наука"],
  ["business", "Бізнес"],
];

// Мови, що підтримуються
export const LANGUAGES = [
  ["uk", "Українська"], // немає в NEWSAPI
  ["en", "Англійська"], 
  ["de", "Німецька"],
];

export const SERVER = [
   'NewsData','GNews', 'NewsApi'
]

// gnews CATEGORIES
// general, world, nation, business, technology, entertainment, sports, science, health.