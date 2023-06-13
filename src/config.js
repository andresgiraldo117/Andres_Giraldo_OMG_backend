require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3001,
    SECRET: process.env.SECRET,
    APIKEY: process.env.APIKEY,
    DB: process.env.DB,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
}