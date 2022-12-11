const express = require('express')
const history = require('connect-history-api-fallback')

const app = express()
app.use(history())
app.use(express.static('src'))

app.get('/', (req, res) => {
    res.sendFile('src/index.html')
})

app.listen(3000, () => console.log('server started'))