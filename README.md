# Wiki

## Необходимое ПО

- nginx 1.10.x
- node 10.x
- npm 6.x

## Разработка

### Запуск сервера

Запусить `ng serve`, открыть `http://localhost:4200/` в браузере

## Деплой

- Собрать проект
- Раздать статику из директории `dist/` при помощи `nginx`

### Установка зависимостей

```
npm install
```

### Сборка

Для сборки проекта запустить `npm run build`. Результаты сборки появятся в директории `dist/`

<!-- Для продакшен-сборки запустить `ng build --prod` -->

### Настройка nginx

Образец конфига nginx лежит в директории `environment/nginx/`
