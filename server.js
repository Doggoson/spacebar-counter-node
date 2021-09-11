const server = require("express");
const app = server();
const admin = server();
const socket = require('socket.io');
const io = socket();

io.on('connection', () => {
  
});

app.use(server.static('src'));

app.get('/',(req, res) => {
  res.sendFile(__dirname + '/src/html/Game.html');
});

admin.get('/',(req, res) => {
  res.sendFile(__dirname + '/src/html/PanelLogin.html');
});

admin.get('/panel',(req, res) => {
  res.sendFile(__dirname + '/src/html/Panel.html');
});

app.use('/admin', admin);

app.use((req, res, next) => {
res.status(404).send("404: Page not found.");
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('500: Error Loading Page.');
});

app.listen(8080);
