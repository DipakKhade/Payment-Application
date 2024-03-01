import express from 'express'
import { rootRouter } from './routers/index.js';
import { userRouter } from './routers/user.js';
import cors from 'cors'

const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);
app.use('/user',userRouter);

app.listen(3000,function(){
    console.log('server is up and running ...')

})