# Nest js Teslo App

Para correr localmente, se necesita la db 

```
docker-compose up -d
```

MongoDb URL local:

```
mongodb://localhost:27017/teslodb
```

## .env

fijarse en __.env.template__ para crear el __.env__

## llenar db

GET ``` http://localhost:3000/api/seed ```


# Suggestions

- order pay:
  - add email senders when order is confirmed
  - add user / order validations

- payments:
  - add new general payment  component that includes (using env to enable e/a ) other clients

- services:
  - implement a cusotm httpService
