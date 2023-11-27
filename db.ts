import Database from 'better-sqlite3';
import { sync } from 'mkdirp';
import crypto from 'crypto';

sync('var/db');

export const db = new Database('var/db/corpolc.db');

const HASH_ITERATIONS = 600_000;

db.exec("CREATE TABLE IF NOT EXISTS sites ( \
        id INTEGER PRIMARY KEY, \
        country TEXT, \
        region TEXT, \
        address TEXT, \
        security_level INTEGER DEFAULT 1 \
      )");

db.exec("CREATE TABLE IF NOT EXISTS employees ( \
        id INTEGER PRIMARY KEY, \
        username TEXT UNIQUE, \
        hashed_password BLOB, \
        salt BLOB, \
        name TEXT, \
        email TEXT UNIQUE, \
        email_verified INTEGER, \
        enabled BOOLEAN DEFAULT true \
      )");

const salt = crypto.randomBytes(16);
const DEFAULT_USER = "admin";
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD as string;
db.prepare("INSERT OR REPLACE INTO employees (username, hashed_password, salt) VALUES (?, ?, ?)").run(DEFAULT_USER, crypto.pbkdf2Sync(DEFAULT_PASSWORD, salt, HASH_ITERATIONS, 32, 'sha256'), salt);

// default site. Has to be unique
db.prepare("INSERT OR REPLACE INTO sites (country, region, address, security_level) VALUES(?, ?, ?, ?)")
  .run("Ireland", "Connacht", "Merchant's Road, Galway", 1);
