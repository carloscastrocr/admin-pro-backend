require('dotenv').config();
// De esta forma se hacen las importaciones en Node.j
const express = require('express');
const cors = require('cors');
const {dbConnection} = require('./database/config')

// Crear el servidor de express
const app = express();

// Configurar cors
app.use(cors())

//Lectura y parseo del Body 
//"midelware: funciones que se ejecutan antes de llegar a otras"
//Una funcion de los midelware es que la informacion llegue como la esperamos
app.use( express.json());

//Base de datos
dbConnection();

//Rutas
//midelware
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/hospitales', require('./routes/hospitales.routes'));
app.use('/api/medicos', require('./routes/medicos.routes'));
app.use('/api/todo', require('./routes/busqueda.routes'));
app.use('/api/upload', require('./routes/upload.routes'));
app.use('/api/login', require('./routes/auth.routes'));


app.listen( process.env.PORT, () => {
   console.log('Servidor corriendo en puerto ' + process.env.PORT);
})

