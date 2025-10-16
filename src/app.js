import express from "express";
import conectNaDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDerErros from "./middlewares/manipuladorDeErros.js";

const conexao = await conectNaDataBase();
conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conecao com o banco feita com sucesso.");
});

const app = express();
routes(app);

app.use(manipuladorDerErros);


export default app;
