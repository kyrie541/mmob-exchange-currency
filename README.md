# mmob-exchange-currency

This template should help get you started developing with Vue 3 in Vite.

## Prequisites

nodejs v20.11.1

npm v10.2.4

## Project Setup

```sh
npm install
```

## Add your exchange rate API key

copy config.sample.js into config.js, then put in your access key

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run Unit Tests without running in the background

```sh
npm run test
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Docker

Prequisites:
You need to install docker in your pc.

Build the Docker image:

```sh
docker build -t mmob-exchange-currency .
```

Run the Docker container:

```sh
docker run -p 8080:80 mmob-exchange-currency
```

This command maps port 8080 on your local machine to port 80 in the container, allowing you to access the app at http://localhost:8080.

### Docker compose

```sh
docker-compose up
```
