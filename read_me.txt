1. npm install atau yarn install
2. Atur koneksi DB di config/config.json
2. npx sequelize db:create && npx sequilize db:migrate
3. node app.js atau npm start

----
- Sign up, buat akun baru
- Sign in, lalu gunakan untuk masuk ke dashboard

> /docs (swagger)
> /v1/api ... (prefix api)

heroku run node_modules/.bin/sequelize db:create
heroku run node_modules/.bin/sequelize db:migrate