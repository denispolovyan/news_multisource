// src/constants.js

// ------------------------  КЛЮЧІ ТА БАЗОВИЙ ЮРЛ ----------------------
export const API_BASE_URL_NEWSDATA = "https://newsdata.io/api/1/latest?apikey=";
export const API_KEY_NEWSDATA = "pub_937f45933a914c54bd902b3244edd2b7";

export const API_BASE_URL_GNEWS = "https://gnews.io/api/v4/top-headlines?apikey=";
export const API_KEY_GNEWS = "3e41bc58bc17842da25cc3a6355c47d4";

export const API_BASE_URL_NEWSAPI = "https://newsapi.org/v2/top-headlines?pageSize=15&apiKey=";
export const API_KEY_NEWSAPI = "c3191c2bd3d34202b971d8e4d7e05869";

export const API_BASE_URL_THENEWSAPI = "https://api.thenewsapi.com/v1/news/all?api_token=";
export const API_KEY_THENEWSAPI = "prd6WppL3LMBYwTM2PCs0eGILiF5zPNsYyEIoG0g";

export const API_BASE_URL_WORLDNEWS = "https://api.worldnewsapi.com/search-news?api-key=";
export const API_KEY_WORLDNEWS = "0c626ef49e50477993ed9cbae4b2d1c9";

export const API_BASE_URL_CURRENTS = "https://api.currentsapi.services/v1/search?limit=15&page_size=10&apiKey=";
export const API_KEY_CURRENTS = "POGiwIiuYmU3WnpJjE2FElXch1hOLSWupxGxHTzm0WI9PJZt";

export const API_BASE_URL_CAT = "https://api.thecatapi.com/v1/images/search?limit=10&api_key=";
export const API_KEY_CAT = "live_MzUJAN6JqOy1I0xLEnbwX3qsjRsyzUQbYc5oJkiHiWixiSrBIobVLEdfzikOHU72"

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
export const SERVERS = [
   'NewsData',
   'GNews', 
   'NewsApi', 
   'TheNewsApi', 
   'WorldNews', 
   'Currents'
]

// ------------------------  ІНШІ КОНСТАНТИ ----------------------
// NewsData - GNews - NewsApi - TheNewsApi
export const QUANTITY_OF_REQUESTS = {
  NewsData: 1,
  GNews: 1,
  NewsApi: 1,
  TheNewsApi: 2,
  WorldNews: 1,
  Currents: 1
};

// Шлях, де знаходяться новини при відповіді з сервера
export const RESPONSE_DATA_PATH = {
  NewsData: 'results',
  GNews: 'articles',
  NewsApi: 'articles',
  TheNewsApi: 'data',
  WorldNews: 'news',
  Currents: 'news'
};

// Повідомлення що пошук не зробили/ про відсутність новин
export const UNSUCCESSFUL_SEARCH_MESSAGE = ['Здійсніть пошук новин', 'За вашим запитом не знайдено новин'];

// Інформація для підтримки ЗСУ та розробника
export const DONATION_INFO = {
  // title: 'Тестовий збір',
  // description: "looorem ipsum dolor amenrem iporem ipsum dolor amensum dolor amenorem ipsum dolor amenorem orem ipsum dolor amenioremorem ipsum dolororem ipsum dolor amen amen ipsum dolor amenpsum dolor amenrem ipsorem ipsum dolor amenorem ipsum dolor amenuorem ipsum dolor aorem ipsum dolor amenmenm dolor amen",
  // link: 'url',
}

// Посилання на банку з можливістю підтримати
export const SUPPORT_CREATOR_INFO = "https://send.monobank.ua/jar/2cxtUHyFPK";

// Кількість новин на одній сторінці
export const PAGINATED_NEWS_LENGTH = 6;

// Відображення типу пошуку в меню
export const SEARCH_TYPE_TEXT = ['РОЗШИРЕНИЙ ПОШУК', 'СПРОЩЕНИЙ ПОШУК'];

// ------------------------       NOTYF     ----------------------
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const notyf = new Notyf({
  duration: 2500,
  position: {
    x: 'right',
    y: 'top',
  },
  types: [
    {
      type: 'error',
      background: 'red',
      duration: 2500,
      dismissible: true,
    },
    {
      type: 'success',
      background: 'green',
      duration: 2500,
      dismissible: true
    },
    {
      type: 'info',
      background: 'rgba(255, 140, 0, 1)',
      duration: 8000,
      dismissible: true,
    },
    {
      type: 'info-dark',
      background: '#5050ff',
      duration: 8000,
      dismissible: true,
    },
    {
      type: 'load',
      background: 'rgba(26, 188, 156, 1',
      duration: 2000,
      dismissible: true,
    },
  ]
});



