import React,{ useEffect,useState } from 'react';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Card,CardContent} from '@mui/material/';
import {Form,Row,Col} from 'react-bootstrap/';
import axios from 'axios';
import Sidebar from './Sidebar';




const Data = () => {



  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage,setRowsPerPage]=useState(5)
  const [searchTerm, setSearchTerm] = useState("")






async function user(){
  const emailAddress = sessionStorage.getItem('emailAddress');
  console.log( emailAddress);
   if(emailAddress){
    let response = await axios.post(`http://localhost:4000/excelldata/view/${emailAddress}`)
            console.log(response.data)
            setRows(response.data)
    }
  
}
useEffect(()=>{
  const emailAddress = sessionStorage.getItem('emailAddress');
   
  user()
  },[])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
    <Sidebar>
    <div style={{width:'80%', marginLeft:'130px',marginTop:'0px',  height:'600px'}}>
    <Row style={{marginLeft: "0px", height: "50px" }}>
      <Col><Form><h1 style={{textAlign:'center', color:'#002140', marginTop:'-20px'}}><b>Employee Details</b> </h1></Form></Col>
       </Row>
      <Row style={{ marginTop:'-20px', marginLeft:'0px'}}>
            <div style={{ display: "flex", marginTop: "0px", marginLeft: "778px", width: "295px", height: "40px"}}  >
              {/* <span>
                <img
                   src='http:///E:/EcommerceTask/ecommerce/public/image/Login.webp'
                  style={{ marginLeft: "30px", marginTop: "5px" }}
                  // alt="addproduct"
                  width="40px"
                  height="35px"
                  // onClick={goToAbout}
                />
              </span> */}

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
              <TableCell align="center"><h3><b>Company Name</b></h3></TableCell>
              <TableCell align="center"><h3><b>Contact Number</b></h3></TableCell>
              <TableCell align="center"><h3><b>Company Email</b></h3></TableCell>
              {/* <TableCell align="center"><h3><b>Company Incopuration Date</b></h3></TableCell> */}
              <TableCell align="center"><h3><b>State</b></h3></TableCell>
              <TableCell align="center"><h3><b>City</b></h3></TableCell>
              <TableCell align="center"><h3><b>Action</b></h3></TableCell>
              

              
              </TableRow>
          </TableHead>
          <TableBody >
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .filter((row) => {
                if (searchTerm === ""){
                  return row;
                } else if (
                  row.Company_name.toLowerCase().includes(searchTerm.toLowerCase(searchTerm))||
                  row.State.toLowerCase().includes(searchTerm.toLowerCase(searchTerm))
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
                   key={row['Company Name']}
                   >
 <TableCell  align='center' style={{fontSize:'13px'}}>{row['Company Name']} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{row['Company Number']} </TableCell>
 <TableCell align='center' style={{fontSize:'13px'}}>{row['Company Email']}</TableCell> 
{/* <TableCell align='center' style={{fontSize:'13px'}}>{row.Data Assign Date}</TableCell>  */}
 <TableCell align='center' style={{fontSize:'13px'}}>{row.State}</TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.City}</TableCell> 
 
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
    </Sidebar>
    </>
  )
}

export default Data