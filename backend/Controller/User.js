const connection = require("../Model/DbConnect");

///////////////////CRUD Operation////////

const getUser = (req, res)=>{
    let sqlQuery = "SELECT * FROM adminuser";
    let userData = req.body;
     connection.query(sqlQuery, userData, function(error, result){
        if(error){
            console.log(error.sqlMessage);
        }
           
            res.send(result);
        
     });
};
const postUser = async (req, res)=>{
    let roleData = req.body;
    let sqlQuery = "INSERT INTO adminuser SET ?";
    const a = await  connection.query(sqlQuery,roleData, function(error, result){

        if(error){
            console.log(error.sqlMessage);
        }
        else{
            res.send(result);
        }
    });
};
const putUser = (req, res)=>{
    let id = [req.body.name, req.body.number, req.body.Designation,req.params.emailAddress];
    let sqlQuery = 'UPDATE adminuser SET name = ?, number = ?, Designation = ? where emailAddress = ?';
    connection.query(sqlQuery,id, function(error, result){
        if(error){
            console.log(error.sqlMessage);
        }
        else{
            res.send(result);
        }
    });
  };

  const delEmployee = async (req, res)=>{
    let id = req.query.emailAddress;

    let sqlQuery = " DELETE FROM adminuser WHERE emailAddress = ?";
    
 const a= await  connection.query(sqlQuery,[id], function(error, result){

        if(error){
            console.log(error.sqlMessage);
        }
        else{
            res.send(result);
        }
    })
  };
module.exports={getUser,postUser,putUser,delEmployee}