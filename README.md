# AI Chat

Тестовое задание — чат с AI через OpenRouter API. Писалось 2 дня.

## Демка

[ai-chat-nine-ecru.vercel.app](https://ai-chat-nine-ecru.vercel.app)

## Что под капотом

React + TypeScript, Tailwind, Express. Бэкенд на Render проксирует запросы к OpenRouter, чтобы ключ не светить на клиенте.

## Что умеет

- Писать в чат и получать ответы от AI
- Голосовой ввод через микрофон (Web Speech API)
- Копировать сообщения по клику
- Чистить историю
- История сохраняется в localStorage и не теряется после перезагрузки
- Индикатор загрузки и человеческие ошибки, если что-то пошло не так

## Запустить локально

```bash
npm install
npm run dev
Для бэкенда:

```bash
cd server
npm install
Создать server/.env:

PORT=3001
OPENROUTER_API_KEY=ваш_ключ
Ключ брать тут: openrouter.ai/keys

Запуск:
```bash
npm run dev
Архитектура
/src — фронт, /server — бэк. Общаются через REST, бэк ходит в OpenRouter. Ключ только на сервере.