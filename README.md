# My Express App

<p align="center">
            This is a challeng by
            <a href="https://coodesh.com/" target="_blank"> Coodesh</a>
          </p>

## Project Structure

```
my-express-app
├── src
│   ├── domain
│   │   ├── error
│   │   │   ├──resource-not-found-error.ts
│   │   │   └── sentiment-service-error.ts
│   │   ├── repositories
│   │   │   └── cache-repository.ts
│   │   ├── services
│   │   │   └── sentiment-service.ts
│   │   └── use-cases
│   │       ├──find-recent-requisition-use-case.ts
│   │       ├── how-many-words-use-case.ts
│   │       ├── input-requisition-use-case.ts
│   │       └── most-used-words-use-case.ts
│   └── http
│       ├── cache
│       │   ├──redis-cache-repository.ts
│       │   └── redis-service.ts
│       ├── controllers
│       │   └── index.ts
│       ├── routes
│       │   └── index.ts
│       ├── types
│       │   └── index.ts    # Entry point of the application
│       └── app.ts
├── .gitignore
├── package.json             # NPM package configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Installation

To install the dependencies, run:

```
npm install
```

## Running the Application

To start the application, use the following command:

```
npm start
```

## License

This project is licensed under the MIT License.
