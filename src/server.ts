import express from "express";
import colors from 'colors'
import swaggerUi from "swagger-ui-express";
import swaggerSpec, {swaggerUiOptions} from "./config/swagger";
import router from "./router";
import db from "./config/db";

export async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log(colors.magenta.bold('Conexion exitosa a la BD'));
    
  } catch (error) {
    console.log(colors.red.bold('Hubo un error al conectar con la BD'));
  }
}
connectDB()


const server = express()

server.use(express.json())
server.use('/api/products', router)

server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server