import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Card,CardContent} from '@mui/material/';
import {Form,Row,Col} from 'react-bootstrap/';



const GetProfile = () => {
const {emailAddress} = useParams();
  async function User(){

   
    let response = await axios.post(`http://localhost:4000/emp/profile/${emailAddress}`)
   
            console.log(response.data)
            setRows(response.data)
  
  }
  useEffect(()=>{
    
    User()
    },[])
  
    ////////////////////////switch Enable//////////

 

 async function activestatus(emailAddress){
  console.log(emailAddress)
  let response = await axios.put(`http://localhost:4000/emp/updatestatus?status=Active&emailAddress=${emailAddress}`);
  console.log(response)
}

async function deactivestatus(emailAddress){
  console.log(emailAddress)
  let response = await axios.put( `http://localhost:4000/emp/updatestatus?status=deactive&emailAddress=${emailAddress}`);
  console.log(response)
}

 /////////////////////// Complete switch/////////////////////////////////
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage,setRowsPerPage]=useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async (emailAddress) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`http://localhost:4000/upload/${emailAddress}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.text();
      console.log(data); // Display the response from the server
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
     
    <div style={{width:'80%', marginLeft:'130px',marginTop:'0px',  height:'600px'}}>
    <Row style={{marginLeft: "0px", height: "50px" }}>
      <Col><Form><h1 style={{textAlign:'center', color:'#002140', marginTop:'-20px'}}><b>Employee Profile</b> </h1></Form></Col>
       </Row>
      <Row style={{ marginTop:'-20px', marginLeft:'0px'}}>
            <div style={{ display: "flex", marginTop: "0px", marginLeft: "778px", width: "295px", height: "40px"}}  >
             
              <input
                type="text"
                style={{
                  marginTop: "0px",
                  marginLeft: "9px",
                  width: "200px",
                  height: "40px",
                  border: "1px solid #e3e1e1"
                }}
                id="myInput"
                placeholder="Search for id.."
                title="Type a id"
                onChange={(e) => {setSearchTerm(e.target.value)}}
              ></input>
            </div>
          </Row>

         

       <div  style={{height:'400px', marginTop:'-20px' }}>   
    <Card sx={{ minWidth: 300,p:2 , marginTop:'-10px'}}>
      <CardContent>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{maxHeight: 400,backgroundColor:'#e6ecf0'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><h5><b>Name</b></h5></TableCell>
              <TableCell align="center"><h5><b>Email Address</b></h5></TableCell>
              <TableCell align="center"><h5><b>Contact Number</b></h5></TableCell>
              <TableCell align="center"><h5><b>Profile Picture</b></h5></TableCell>
              <TableCell align="center"><h5><b>State</b></h5></TableCell>
              <TableCell align="center"><h5><b>City</b></h5></TableCell>
              <TableCell align="center"><h5><b>Designation</b></h5></TableCell>
              <TableCell align="center"><h5><b>Status</b></h5></TableCell>
              <TableCell align="center"><h5><b>File</b></h5></TableCell>



              </TableRow>
          </TableHead>
          <TableBody >
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((row) => {
                if (searchTerm === ""){
                  return row;
                } else if (
                  row.name.toLowerCase().includes(searchTerm.toLowerCase(searchTerm))||
                  row.emailAddress.toLowerCase().includes(searchTerm.toLowerCase(searchTerm))
                ){
                  return row;
                }
              })
              .map((row) => {
                return (
                  <TableRow 
                  hover 
                  role="checkbox"
                   tabIndex={-1} 
                   key={row.emailAddress}
                   >
 <TableCell align='center' style={{fontSize:'13px'}}>{row.name} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{row.emailAddress}</TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.contact}</TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.profile_photo}</TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.State}</TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.City}</TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.Designation}</TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{(row.status=='deactive')? <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        onChange={(e)=>activestatus(row.emailAddress,e)}
        
      />:
       <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        onChange={(e)=>deactivestatus(row.emailAddress,e)}
        defaultChecked/>
      
        }
       </TableCell>
 
        <input type="file" onChange={handleFileChange} />
       <button onClick={()=>handleUpload(row.emailAddress)}>Upload</button>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
      </CardContent>
      </Card>
      </div>
    </div>
 
    {/* <div>
      <h1>Upload Excel File</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={()=>handleUpload(row.emailAddress)}>Upload</button>
    </div> */}
    </>
  );
};

export default GetProfile;
