# Express API Starter with Typescript

How to use this template:

```sh
npx create-express-api --typescript --directory my-api-name
```

Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
    * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
    * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can
      help!
* [dotenv](https://www.npmjs.com/package/dotenv)
    * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* [cors](https://www.npmjs.com/package/cors)
    * CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various
      options.

Development utilities:

* [typescript](https://www.npmjs.com/package/typescript)
    * TypeScript is a language for application-scale JavaScript.
* [ts-node](https://www.npmjs.com/package/ts-node)
    * TypeScript execution and REPL for node.js, with source map and native ESM support.
* [nodemon](https://www.npmjs.com/package/nodemon)
    * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application
      when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
    * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [typescript-eslint](https://typescript-eslint.io/)
    * Tooling which enables ESLint to support TypeScript.
* [jest](https://www.npmjs.com/package/jest)
    * Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [supertest](https://www.npmjs.com/package/supertest)
    * HTTP assertions made easy via superagent.

## Setup

```
npm install
```

1. Build the Docker image and start the services defined in docker-compose.yml:

```   
docker build -t my-api-name .
docker-compose up
```

Remember to replace `my-api-name` with the actual name of your Docker image.

2. Set up developer accounts for authentication:

* [Facebook Developers](https://developers.facebook.com/)
* [Microsoft Azure](https://portal.azure.com/#home/)
* [Google Cloud](https://console.cloud.google.com/)

3. Enter the keys and secrets obtained from these platforms into your .env file. Refer to the provided .env.example file
   for the required format.

## Authentication

This project uses [Passport.js](http://www.passportjs.org/) for authentication with Facebook, Azure, and Google.
Passport.js is Express-compatible authentication middleware for Node.js.

Passport's sole purpose is to authenticate requests, which it does through an extensible set of plugins known as
strategies. Passport uses the concept of strategies to authenticate requests. Strategies can range from verifying a
username and password, delegated authentication using OAuth (for example via Facebook or Twitter), or federated
authentication using OpenID.

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```
