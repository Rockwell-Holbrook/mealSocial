// vue.config.js
module.exports = {
     devServer: {
    host: process.env.HOST || 'localhost',
    open: true,
    port: process.env.PORT || 8080
     }
   }