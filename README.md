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
