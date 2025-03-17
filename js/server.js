const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public")); // HTML, CSS, JS 제공

// 데이터베이스 경로 (assets/db/guest.db)
const dbPath = path.join(__dirname, "assets/db/guest.db");

// assets/db 폴더가 없으면 생성
if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

// SQLite DB 연결
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error(err.message);
  db.run(`
    CREATE TABLE IF NOT EXISTS guestbook (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT DEFAULT (datetime('now', 'localtime')),
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      content TEXT NOT NULL,
      ip TEXT,
      device_info TEXT,
      reported INTEGER DEFAULT 0
    )
  `);
});

// IP 주소 가져오기
const getIP = (req) =>
  req.headers["x-forwarded-for"] || req.connection.remoteAddress;

// 방명록 조회
app.get("/comments", (req, res) => {
  db.all(
    "SELECT id, timestamp, name, content FROM guestbook ORDER BY id DESC",
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// 방명록 등록
app.post("/comments", (req, res) => {
  const { name, password, content } = req.body;
  if (!name || !password || !content) {
    return res.status(400).json({ error: "모든 필드를 입력해야 합니다." });
  }

  const ip = getIP(req);
  const device_info = req.headers["user-agent"];

  db.run(
    "INSERT INTO guestbook (name, password, content, ip, device_info) VALUES (?, ?, ?, ?, ?)",
    [name, password, content, ip, device_info],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: "방명록이 저장되었습니다!" });
    }
  );
});

app.listen(PORT, () =>
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중!`)
);
