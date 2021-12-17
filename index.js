const {query} = require('./connection')


query("SELECT NOW()").then( res => {
    console.log(res.rows)
})