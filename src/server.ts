import express, { Request, Response, ErrorRequestHandler } from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import apiRoutes from "./routes/Routes";
import { configurarAssociacoesAnilhas, configurarAssociacoesMacAdress } from "./models/associacoes";
import { sequelize } from "./instances/mysql"; // Conexão com o banco de dados

dotenv.config();

const app = express(); // Crie a instância do Express

app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));

//AQUI EU DIGO O FORMATO QUE EU QUERO A REQUISIÇÃO
//app.use(express.urlencoded({ extended: true })); // USANDO URL ENCODED
app.use(express.json()); //USANDO JSON

app.get("/ping", (req: Request, res: Response) => res.json({ pong: true }));

app.use(apiRoutes);

app.use((req: Request, res: Response) => {
  res.status(404);
  res.json({ error: "Endpoint não encontrado." });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400); // Bad Request
  console.log(err);
  res.json({ error: "Ocorreu algum erro." });
};
app.use(errorHandler);
// Configura as associações entre os modelos
configurarAssociacoesMacAdress();
configurarAssociacoesAnilhas();

// Sincronizar com o banco de dados (opcional: force: true vai recriar as tabelas)
// sequelize.sync({ alter: true }).then(() => {
//   console.log("Banco de dados sincronizado");
// });

// Exporta a instância do Express
export { app };

// Inicia o servidor somente se não estiver no ambiente de teste
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}
