# GraphQL demo Project

專案分為三部分：

1. GraphQL Server
2. GraphQL Client
3. RESTful API Server

啟動方式：

1. 啟動 RESTful API Server

```bash
cd express
```

```bash
npm i && npm start
```

Server 會在 `http://localhost:4321` 啟動，並在 RAM 中建立有假資料的 SQLite 資料庫。

2. 啟動 GraphQL Server

```bash
cd server
```

```bash
npm install && npm start
```

Server 會在 `http://localhost:4000` 啟動，並與 RESTful API Server 連線。

3. 啟動 GraphQL Client

```bash
cd client
```

```bash
npm install && npm start
```

3. 啟動 GraphQL Client

```bash
cd client
```

```bash
npm install && npm run dev
```

Client 會在 `http://localhost:5173` 啟動，並與 GraphQL Server 連線。
