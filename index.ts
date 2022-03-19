import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import { authRouter } from './routers/auth/auth';
import { protectedRouter } from './routers/protected/protected';
import { initDb } from './utils/users';

await initDb();

const app = express();
const port = 8080;

app.use(express.json());
// app.use(cors());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/protected', protectedRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
