const express = require('express');
const ExcellDataRouter = express.Router();

const { getExcellData} = require("../../Controller/ExcellData/ExcellData")
ExcellDataRouter.post('/view/:emailAddress',getExcellData);



module.exports =ExcellDataRouter;