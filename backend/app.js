import express from 'express'
import { rootRouter } from './routers/index.js';
import router  from './routers/user.js';
import cors from 'cors'
import { authMiddleware } from './middlewares/authorization.js';
import zod from 'zod'
import {User} from './models/users.js'
import accountRouter from './routers/account.js';
import { Account } from './models/users.js';
import swaggerDocument from './OpenAPISpec.js'
import swaggerUi from 'swagger-ui-express'
const app=express();
app.use(cors());
app.use(express.json());


app.use("/api/v1", rootRouter);
app.use('/user',router);
app.use("/account", accountRouter);

app.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});



//auth middleware
const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})



//search
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000,function(){
    console.log('server is up and running ...')

})

