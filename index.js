require('dotenv').config();
// De esta forma se hacen las importaciones en Node.j
const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config')

// Crear el servidor de express
const app = express();

// Configurar cors
app.use(cors())

//Base de datos
dbConnection();

//OYc5qgOtS4MZv40s
//mean-user
//Rutas
app.get('/',(req, res)=>{
    res.status(400).json({
        ok:true,
        msg: 'Hola Mundo'
    })
})

app.listen( process.env.PORT, () => {
   console.log('Servidor corriendo en puerto ' + process.env.PORT);
})

