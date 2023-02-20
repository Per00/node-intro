import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json()); // sempre vai estar presente e sempre antes das rotas

app.get("/welcome", (req, res) => {
  //  get (configurando para receber uma requisição)
  return res.status(200).json("Bem vindo!"); // não entendi o json
});

//CRUD

let data = [];

//app.post()
app.post("/create", (req, res) => {
  //console.log(req.body);
  const entry = { ...req.body, id: uuidv4() };

  data.push(entry);

  //console.log(data);

  return res.status(201).json(entry);
});

//app.get()
app.get("/", (req, res) => {
  return res.status(200).json(data);
});

//app.get()  read details
app.get("/entryId", (req, res) => {
  const { entryId } = req.params;

  const entry = data.find((currentEntry) => {
    return currentEntry.id === entryId;
  });

  return res.status(200).json(entry);
});

//app.put()
app.put("/:userId", (req, res) => {
  const { userId } = req.params; // captura o id do usuário

  let index; //inicia a variável vazia que vai guardar o index que o usuário tem dentro da array data

  let user = data.find((user, i) => {
    return user.id === userId;
  });

  const updatedUser = { ...user, ...req.body };
  data.splice(index, 1);

  data.push(updatedUser);

  return res.status(200).json(updatedUser);
});

//app.delete()
app.delete("/:userId", (req, res) => {
  const { userId } = req.params;

  //filtrando a array pra manter todos os users que tiverem um id DIFERENTE do idUser
  let filtered = data.filter((user) => user.id !== userId);

  data = filtered;

  return res.status(200).json(data);
});

app.listen(4000, () => {
  console.log("Server up and running at port 4000.");
});
