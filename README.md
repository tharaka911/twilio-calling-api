## pre requested 
### node LTS and pm2 process manager

## how to run this simple project

### 1 clone the repo

### 2 install the dependecies
```sh
npm i
```

### 3 run using pm2 
```sh
pm2 start "npm run start" --name twilio-calling-api
```


### api testing using curl

```sh
 curl -X POST http://localhost:9000/call \
-H "Content-Type: application/json" \
-H "x-api-key: your_secure_api_key" \
-d '{"to": "+1234567890"}'
```


### update required numbers in .env
```sh
NUMBERS=+94XXXXXXXXX,+94XXXXXXXXX
```

### after update .env 
```sh
pm2 restart 0 --update-env
```

### find the API Doc

```sh
https://documenter.getpostman.com/view/24419374/2sAXjGdZq5
```