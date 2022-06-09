//npm init
//npm install express
//npm install ejs
//npm install nodemon

const app = require("./server");
//const noticias= require('./mockup')

const db = require("./dbConnection");

const port = process.env.PORT || 3000;

//criando a primeira rota
app.get("/", async (req, res) => {
  var result = await db.query(
    "SELECT * FROM noticias ORDER BY id_noticia DESC LIMIT 3"
  );
  res.render("home/index", { noticias: result.rows, title: "Home" });
});

app.get("/noticia", async (req, res) => {
  var id = req.query.id;
  let result = await db.query("SELECT * FROM noticias WHERE id_noticia=$1", [
    id,
  ]);

  res.render("noticias/noticia", { noticia: result.rows[0], title: "Notícia" });
});

app.get("/noticias", async (req, res) => {
  var result = await db.query(
    "SELECT * FROM noticias ORDER BY id_noticia DESC"
  );
  res.render("noticias/noticias", { noticias: result.rows, title: "Notícias" });
});

app.post("/admin/salvar-noticia", async (req, res) => {
  let { titulo, conteudo } = req.body;
  await db.query(
    "INSERT INTO noticias(titulo,conteudo)VALUES($1,$2)",
    [titulo, conteudo],
    (err, result) => {
      res.redirect("/noticias");
    }
  );
});

app.get("/admin", (req, res) => {
  if (req.session.autorizado) {
    res.render("admin/form_add_noticia", {
      title: "Admin",
      autorizado: req.session.autorizado,
    });
  } else {
    res.render("admin/login", { title: "Login" });
  }
});

//rota responsável por autenticacao do usuário
app.post("/admin/autenticar", (req, res) => {
  const { usuario, senha } = req.body;
  if (usuario === "Natt" && senha === "123") {
    req.session.autorizado = true;
  }
  res.redirect("/admin");
});

app.get("/admin/sair", (req, res) => {
  req.session.destroy((err) => {});
  res.redirect("/admin");
});

//iniciando o servidor
app.listen(port, () => {
  console.log("Servidor rodando com Express");
});
