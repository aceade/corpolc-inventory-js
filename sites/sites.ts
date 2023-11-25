import { db } from "../db";

export const getAllSites = () => {

    const statement = db.prepare("SELECT * FROM sites");
    const result = statement.all();
    return result;
}