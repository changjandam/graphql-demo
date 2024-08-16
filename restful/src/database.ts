import { Database } from 'bun:sqlite';

export const db = new Database(':memory:');

// 建立 users 表格
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`);

// 建立 vehicles 表格
db.exec(`
  CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    model TEXT NOT NULL,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )
`);

// 新增 users 資料
db.query('INSERT INTO users (name) VALUES (?)').run('Alice');
db.query('INSERT INTO users (name) VALUES (?)').run('Bob');
db.query('INSERT INTO users (name) VALUES (?)').run('Charlie');

// 新增 vehicles 資料
db.query('INSERT INTO vehicles (type, model, user_id) VALUES (?, ?, ?)').run(
  'CAR',
  'Toyota',
  1
);
db.query('INSERT INTO vehicles (type, model, user_id) VALUES (?, ?, ?)').run(
  'CAR',
  'Honda',
  2
);
db.query('INSERT INTO vehicles (type, model, user_id) VALUES (?, ?, ?)').run(
  'SCOOTER',
  'Yamaha',
  3
);

export function getUsers() {
  return db.query('SELECT * FROM users').all();
}

export function getUserById(id: number) {
  return db.query('SELECT * FROM users WHERE id = ?').get(id);
}

export function createUser(name: string) {
  db.query('INSERT INTO users (name) VALUES (?)').run(name);
  // 取得最後一筆資料
  return db.query('SELECT * FROM users ORDER BY id DESC LIMIT 1').get();
}

export function getVehicles() {
  return db.query('SELECT * FROM vehicles').all();
}

export function getVehicleById(id: number) {
  return db.query('SELECT * FROM vehicles WHERE id = ?').get(id);
}

export function createVehicle(type: string, model: string, userId: number) {
  db.query('INSERT INTO vehicles (type, model, user_id) VALUES (?, ?, ?)').run(
    type,
    model,
    userId
  );
  return db.query('SELECT * FROM vehicles ORDER BY id DESC LIMIT 1').get();
}
