import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

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
db.serialize(() => {
  db.run('INSERT INTO users (name) VALUES (?)', 'Alice');
  db.run('INSERT INTO users (name) VALUES (?)', 'Bob');
  db.run('INSERT INTO users (name) VALUES (?)', 'Charlie');

  // // 新增 vehicles 資料
  db.run('INSERT INTO vehicles (type, model, user_id) VALUES (?, ?, ?)', [
    'CAR',
    'Toyota',
    1,
  ]);
  db.run('INSERT INTO vehicles (type, model, user_id) VALUES (?, ?, ?)', [
    'CAR',
    'Honda',
    2,
  ]);
  db.run('INSERT INTO vehicles (type, model, user_id) VALUES (?, ?, ?)', [
    'SCOOTER',
    'Yamaha',
    3,
  ]);
});

export function getUsers(cb) {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      throw err;
    }
    cb(rows);
  });
}

export function getUserById(id, cb) {
  db.get('SELECT * FROM users WHERE id = ?', id, (err, row) => {
    if (err) {
      throw err;
    }
    cb(row);
  });
}

export function createUser(name, cb) {
  db.run('INSERT INTO users (name) VALUES (?)', name, function (err) {
    if (err) {
      throw err;
    }
    db.get('SELECT * FROM users WHERE id = ?', this.lastID, (err, row) => {
      if (err) {
        throw err;
      }
      cb(row);
    });
  });
}

export function getVehicles(cb) {
  db.all('SELECT * FROM vehicles', (err, rows) => {
    if (err) {
      throw err;
    }
    cb(rows);
  });
}

export function getVehicleByUserId(userId, cb) {
  db.all('SELECT * FROM vehicles WHERE user_id = ?', userId, (err, rows) => {
    if (err) {
      throw err;
    }
    cb(rows);
  });
}

export function createVehicle({ type, model, userId }, cb) {
  db.run(
    'INSERT INTO vehicles (type, model, user_id) VALUES (?, ?, ?)',
    type,
    model,
    userId,
    function (err) {
      if (err) {
        throw err;
      }
      db.get('SELECT * FROM vehicles WHERE id = ?', this.lastID, (err, row) => {
        if (err) {
          throw err;
        }
        cb(row);
      });
    }
  );
}
