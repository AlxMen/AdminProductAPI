import express from "express";
import colors from 'colors'
import router from "./router";
import db from "./config/db";

async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    //console.log(colors.magenta.bold('Conexion exitosa a la BD'));
    
  } catch (error) {
    console.log(colors.red.bold('Hubo un error al conectar con la BD'));
    
    
  }
}
connectDB()


const server = express()

server.use(express.json())
server.use('/api/products', router)

server.get('/api', (req, res) => {
  res.json({msg: 'Desde API'})
})

export default server