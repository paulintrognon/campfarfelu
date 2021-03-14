# Camp Farfelu - Api Backend

## Getting started

Install: 
```bash
yarn install
```

Start DB:
```bash
docker-compose -f docker-compose.db.yml up
```

Start dev server:
```bash
yarn dev
```

## Production

Start whole stack:
```bash
docker-compose -f docker-compose.db.yml -f docker-compose.api.yml up --build
```
