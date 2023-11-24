import 'dotenv/config'
import express from 'express';
const app = express();
import http from 'http';
import path from 'path';
const server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", (req, res, next) => {
    return res.render("home");
});

server.listen(3000, () => {
    console.log("Server online");
});