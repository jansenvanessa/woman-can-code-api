require('dotenv').config()
const { app } = require("./src/app")
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`)
})