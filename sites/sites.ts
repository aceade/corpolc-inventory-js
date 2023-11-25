import { db } from "../db";
import { Site } from "../model/site";

export const getAllSites = () => {

    const statement = db.prepare("SELECT * FROM sites");
    const result = statement.all();
    return result;
}

export const getSite = (id: number) => {
    const result = db.prepare("SELECT * FROM sites WHERE id = ?").run(id);
    return result;
}

export const addSite = (newSite: Site) => {
    
    const statement = db.prepare("INSERT INTO sites (country, region, address, security_level) VALUES(?,?,?,?)").run(newSite.country, newSite.region, newSite.address, newSite.security_level);
    return statement.changes > 0;
}

export const deleteSite = (id: number) => {
    const statement = db.prepare("DELETE FROM sites WHERE id = ?").run(id);
    return statement.changes > 0;
}