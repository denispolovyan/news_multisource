// src/constants.js

// ------------------------  КЛЮЧІ ТА БАЗОВИЙ ЮРЛ ----------------------
export const API_BASE_URL_NEWSDATA = "https://newsdata.io/api/1/latest?apikey=";
export const API_KEY_NEWSDATA = "pub_937f45933a914c54bd902b3244edd2b7";

export const API_BASE_URL_GNEWS = "https://gnews.io/api/v4/top-headlines?apikey=";
export const API_KEY_GNEWS = "3e41bc58bc17842da25cc3a6355c47d4";

export const API_BASE_URL_NEWSAPI = "https://newsapi.org/v2/top-headlines?pageSize=10&apiKey=";
export const API_KEY_NEWSAPI = "c3191c2bd3d34202b971d8e4d7e05869";

export const API_BASE_URL_THENEWSAPI = "https://api.thenewsapi.com/v1/news/all?api_token=";
export const API_KEY_THENEWSAPI = "prd6WppL3LMBYwTM2PCs0eGILiF5zPNsYyEIoG0g";

// ------------------------  ПАРАМЕТРИ ПОШУКУ ----------------------

// Доступні категорії
export const CATEGORIES = [
  ["general", "Всі категорії"], // немає в NEWSDATA
  ["sports", "Спорт"],
  ["politics", "Політика"], // немає в NEWSAPI та  GNEWS
  ["health", "Здоров'я"],
  ["science", "Наука"],
  ["business", "Бізнес"],
];

// Мови, що підтримуються
export const LANGUAGES = [
  ["uk", "Українська"], // немає в NEWSAPI
  ["en", "Англійська"], 
];

// Сервера для запитів
export const SERVER = [
   'NewsData','GNews', 'NewsApi', 'TheNewsApi'
]

// ------------------------  ІНШІ КОНСТАНТИ ----------------------

// NewsData - GNews - NewsApi - TheNewsApi
export const QUANTITY_OF_REQUESTS = {
  NewsData: 1,
  GNews: 1,
  NewsApi: 1,
  TheNewsApi: 2,
};

// Шлях, де знаходяться новини при відповіді з сервера
export const RESPONSE_DATA_PATH = {
  NewsData: 'results',
  GNews: 'articles',
  NewsApi: 'articles',
  TheNewsApi: 'data',
};

export const UNSUCCESSFUL_SEARCH_MESSAGE = ['Здійсніть пошук новин', 'За вашим запитом не знайдено новин'];


