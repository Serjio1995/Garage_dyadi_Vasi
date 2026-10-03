/** Выбор размера картинки под экран. Порог совпадает с <link rel="preload"> в layout.tsx */
export const pick = (name: string) =>
  typeof window !== "undefined" && window.innerWidth <= 800 ? `/images/${name}-1080.webp` : `/images/${name}-1920.webp`;
export const srcSet = (name: string) => `/images/${name}-1080.webp 1080w, /images/${name}-1920.webp 1920w`;
