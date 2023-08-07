const connection = require("../../Model/DbConnect");
const postProfile = async (req, res)=>{
 
    
    let Data = [req.body.emailAddress, req.body.name, req.body.contact, req.file.location, req.body.State, req.body.City,req.body.Designation,req.body.status];
    

    let sqlQuery = "INSERT INTO profile(emailAddress, name, contact, profile_photo, State, City, Designation, status) values(?,?,?,?,?,?,?,?)";
    const a = await  connection.query(sqlQuery, Data, function(error, result){

        if(error){
            console.log(error.sqlMessage);
        }
        else{
            res.send(result);
        }
    });
};

const getProfile = async (req, res)=>{
    let emailAddress = req.params.emailAddress;
    let sqlquery = 'select * from  profile where  emailAddress = ?';
    await connection.query(sqlquery,emailAddress,(error,result)=>{
        if(error){
            console.log(error.sqlMessage);
        }
           
            res.send(result);
        
     });
};

const putEmployeestatus= (req, res)=>{

    let id = req.query.emailAddress;
    let status = req.query.status; 
    let sql = `UPDATE profile SET status = ? WHERE emailAddress = ?`;
    console.log(sql, status, id)
    connection.query(sql, [status, id], function(error, result){
        if(error){
            console.log(error.sqlMessage);
        }
        else{
            res.send(result);
        }

        
    });
  };

module.exports = { postProfile, getProfile , putEmployeestatus};