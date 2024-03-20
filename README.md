# Living environment UI

This is the frontend app for Living Environment platform built with React.

## Requirements

Node.js version >= 20 and Yarn.

## Installing

Clone the repo:
```
git clone https://github.com/City-of-Turku/living-environment-ui.git
```

Go into the project directory:
```
cd living-environment-ui
```

Install dependencies:
```
yarn install
```

Create `.env` file based on `.env.example` file.

Start development server:
```
yarn start
```

## Production

To build the project for production run:
```
yarn build
```
This command builds the project in `/dist` folder.

To preview the production version you can run:
```
yarn preview
```

## Testing

This project uses Jest and React Testing Library for unit tests. To run them use command:
```
yarn test
```
