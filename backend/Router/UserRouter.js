const express = require('express');
const UserRouter = express.Router();

const { getUser, postUser, putUser, delEmployee} = require("../Controller/User")
UserRouter.post('/viewuser',getUser);
UserRouter.post('/addUser',postUser);
UserRouter.put('/update/:emailAddress',putUser);
UserRouter.delete('/delEmployee',delEmployee);


module.exports = UserRouter;