# Гараж дяди Васи

Лендинг автосервиса: реставрация и ремонт советских автомобилей.
Тёмный индустриальный стиль, анимации по скроллу, 3D-сцены.

## Стек

- Next.js 14 (App Router), TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger, Lenis (плавный скролл), Framer Motion
- Three.js / React Three Fiber, Spline (опционально)

## Запуск локально

```bash
npm install
npm run dev     # http://localhost:3000
```

Продакшн-сборка:

```bash
npm run build
npm start
```

Требуется Node.js 18.17 или новее.

## Структура

```
app/           страницы, глобальные стили, шрифты
components/    секции лендинга и UI (курсор, прелоадер, плавный скролл)
  sections/    Hero, Story, Cinematic, Horizontal, Parallax, Finale
  three/       Sparks, Gear, SplineScene
lib/           контент (все тексты), выбор картинок, настройка GSAP
hooks/         useInView
public/images/ картинки в двух размерах: -1080 и -1920 (webp)
standalone/    исходники автономной HTML-версии
```

Все тексты лежат в `lib/content.ts` — править контент там.
Цвета и шрифты — в `tailwind.config.ts` и `app/globals.css`.

## Переменные окружения

Необязательные. Без них сайт работает, сцена Spline просто не показывается.

```
NEXT_PUBLIC_SPLINE_SCENE=https://prod.spline.design/XXXX/scene.splinecode
```

Скопируйте `.env.example` в `.env.local` и подставьте свою ссылку на сцену.

## Деплой на Vercel

1. Залейте код в репозиторий GitHub.
2. Зайдите на vercel.com → Add New → Project → Import Git Repository.
3. Выберите этот репозиторий. Vercel сам определит Next.js,
   команды сборки `npm run build` и папку `.next` — ничего настраивать не нужно.
4. При необходимости добавьте `NEXT_PUBLIC_SPLINE_SCENE` в Settings → Environment Variables.
5. Deploy.

Дальше каждый push в ветку `main` автоматически обновляет сайт.
