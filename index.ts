import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { authRouter } from './routers/auth/auth';
import { protectedRouter } from './routers/protected/protected';

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/auth', authRouter);
app.use('/protected', protectedRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
