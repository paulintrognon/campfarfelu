# Camp Farfelu - Api Backend

## Getting started

Install: 
```bash
yarn install
```

Start DB:
```bash
docker-compose up
```

Run seeds:
```bash
yarn db:seed
```

Start dev server:
```bash
yarn dev
```

## Tests

Run unit tests:
```yarn
yarn test
```

## Production

Start whole stack:
```bash
docker-compose -f docker-compose.yml -f docker-compose.api.yml up --build
```
