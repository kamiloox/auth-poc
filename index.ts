import express from 'express';
import { authRouter } from './auth/auth';

const app = express();
const port = 8080;

app.use(express.json());

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
