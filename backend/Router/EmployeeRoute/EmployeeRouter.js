const express = require('express');
const EmployeeRouter = express.Router();

const { getLogin } = require("../../Controller/EmployeeLogin/Login")
EmployeeRouter.post('/login',getLogin);


module.exports = EmployeeRouter;