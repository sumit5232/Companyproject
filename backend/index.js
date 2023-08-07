const connection = require("./Model/DbConnect");
const express = require('express');
const cors = require('cors')
const xlsx = require('xlsx');
const multer = require('multer');
const mysql = require('mysql');
const moment = require('moment');
const app = express();
app.use(express.json());
app.use(cors());

///////////////////////////////////////////////////
const upload = multer({ dest: 'uploads/' });
app.post('/upload/:emailAddress', upload.single('file'), async (req, res) => {
    try {
      // Get the file path from the request object
      const filePath = req.file.path;
  
      // Read the Excel file
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
  
      // Convert Excel data to an array of objects
      const data = xlsx.utils.sheet_to_json(worksheet);
  
   
      
      const emailAddress = req.params.emailAddress;
      // Insert data into the table
      const insertQuery = `INSERT INTO employeedata (emailAddress, \`Sr. No\`, \`Company Name\`, \`Company Number\`, \`Company Email\`, \`Company Incorporation Date\`, \`City\`, \`State\`) VALUES ?`;
  const values = data.map((row) => [
    // row['emailAddress'],
    emailAddress,
    row['Sr. No'],
    row['Company Name'],
    row['Company Number'],
    row['Company Email'], 
    moment(row['Company Incorporation Date'], 'MM/DD/YYYY').format('MM/DD/YYYY'),
    row['City'],
    row['State'],
  ]);
  
      await connection.query(insertQuery,  [values]); 
  
      // Close the database connection
    //   await connection.end();
  
      res.status(200).send('Upload successful.');
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send('An error occurred.');
    }
  });
///////////////////////////////////////////////////


  

const UserRouter = require('./Router/UserRouter');

const EmployeeRouter = require('./Router/EmployeeRoute/EmployeeRouter')

const ProfileRouter = require('./Router/ProfileRoute/Profile')

const DataRouter = require('./Router/EmployeeRoute/DataRoute')

const ExcellDataRouter = require('./Router/ExcelRoute/ExcelRoute')


app.use('/admin_user',UserRouter);

app.use('/employee',EmployeeRouter);

app.use('/excelldata',ExcellDataRouter);

app.use('/emp',ProfileRouter);

app.use('/getdata',DataRouter);





const port = 4000;
app.listen(port,()=>{
    console.log(`server runnig on port ${port}`);
})