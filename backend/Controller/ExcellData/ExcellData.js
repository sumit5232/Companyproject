const connection = require("../../Model/DbConnect");
const getExcellData = async (req, res)=>{
    let emailAddress = req.params.emailAddress;
    let sqlquery = 'select * from  employeedata where  emailAddress = ?';
    await connection.query(sqlquery,emailAddress,(error,result)=>{
        if(error){
            console.log(error.sqlMessage);
        }
           
            res.send(result);
        
     });
};

module.exports = { getExcellData }
