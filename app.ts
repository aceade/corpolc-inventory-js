import 'dotenv/config'
import express from 'express';
const app = express();
import http from 'http';
import path from 'path';
import { addSite, deleteSite, getAllSites, getSite } from './sites/sites';
const server = http.createServer(app);

const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (_req, res) => {
    return res.render("home");
});

app.get("/sites", (_req, res, next) => {
    const sites = getAllSites();
    res.render("sites", { sites: sites} );
    next();
});

app.get("/sites/:id", (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const site = getSite(id);
    if (site) {
        console.info("Loading site page");
        res.render("siteDetail", { site: site})
    } else {
        res.render("sites", { sites: getAllSites()} );
    }
    next();
});

app.post("/sites", (req, res, next) => {
    const body = req.body;
    addSite(body.newSite);
    res.render("sites", {sites: getAllSites()});
    next();

});

app.delete("/sites/:id", (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const changes = deleteSite(id);
    if (changes) {
        res.render("sites", {sites: getAllSites()});
    } else {
        res.sendStatus(204);
    }
    next();
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});