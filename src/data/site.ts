export const site = {
  name: "СЛОВО",
  fullName: "Культурно-просветительское пространство «СЛОВО»",
  tagline: "Пространство смыслов, культуры и живого общения",
  // TODO: заменить на финальный домен перед публикацией.
  // В CI (GitHub Pages) переопределяется переменной SITE_URL.
  url: import.meta.env.SITE_URL ?? "https://slovospace.ru",

  address: "Москва, ул. Тверская, 15",
  metro: ["Тверская", "Пушкинская", "Чеховская"],
  schedule: "Каждое воскресенье · 16:00",
  // TODO: заменить на утверждённую пошаговую инструкцию по проходу
  directions:
    "Вход со двора. Ориентиры и фотографию входа добавьте после утверждения инструкции.",
  routeUrl:
    "https://yandex.ru/maps/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%A2%D0%B2%D0%B5%D1%80%D1%81%D0%BA%D0%B0%D1%8F%2C%2015",

  socials: {
    telegram: "https://t.me/slovospace",
    youtube: "https://www.youtube.com/@slovospace",
    taplink: "https://slovospace.taplink.ws/",
    timepad: "https://slovobc.timepad.ru/events/",
  },

  // TODO: контакт для вопросов посетителей
  contactEmail: "info@slovospace.ru",

  // TODO: вставить номер счётчика Яндекс Метрики (только цифры).
  // Пока здесь не число — счётчик не подключается, события ни на что не влияют.
  metrikaId: "XXXXXXXX",
} as const;
