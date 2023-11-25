import 'dotenv/config'
import express from 'express';
const app = express();
import http from 'http';
import path from 'path';
import { getAllSites } from './sites/sites';
const server = http.createServer(app);

const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", (_req, res) => {
    return res.render("home");
});

app.get("/sites", (_req, res, next) => {
    const sites = getAllSites();
    res.render("sites", { sites: sites} );
    next();
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});