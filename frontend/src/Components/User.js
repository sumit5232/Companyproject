import React,{ useEffect,useState } from 'react';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Card,CardContent} from '@mui/material/';
import {Form,Row,Col} from 'react-bootstrap/';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import {FcEditImage} from 'react-icons/fc'
import {MdOutlineDeleteForever} from 'react-icons/md'
import Swal from 'sweetalert2'
import { FaEye } from "react-icons/fa"
import { useNavigate } from "react-router-dom"





const User = () => {

  const navigate = useNavigate() 

  const handleButtonClick = (emailAddress) => {
   
    const idToSend = emailAddress;

    // Use the navigate function to navigate to ComponentB with the ID as a parameter
    navigate(`/getprofile/${idToSend}`);
  };

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
    const [name, setNewname] = useState("")
    
    const [emailAddress, setNewemailAddress] = useState("")

    const [number, setNumber] = useState("")
    
    const [Designation, setDesignation] = useState("")


    async function updateData(name, emailAddress, number, Designation){
  
      
        setNewname(name);

        setNewemailAddress(emailAddress);
    
        setNumber(number);

        setDesignation(Designation);
      
      
        handleShow()
      
      }
async function saveUpdatedData(){

    let response = await axios.put(`http://localhost:4000/admin_user/update/${emailAddress}`,{
      
      "name":name,
      "number":number,
      "Designation":Designation
      
    },
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'You have Update Successfully',
      showConfirmButton: true,
      
    }))
    
    .then(()=> {
      User()
      setShow(false);
    })
  
       await console.log(response)
  
  }


  const [formData, setFormData] = useState({
    emailAddress: '',
    name: '',
    password: '',
    number:'',
    Designation:'',
  });
  const [showModal, setShowModal] = useState(false);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const addEmployee = async () => {
    try {
      await axios.post(`http://localhost:4000/admin_user/addUser`, formData);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You have Add Successfully',
        showConfirmButton: true,
        
      })
      User();
      setShowModal(false);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };


  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage,setRowsPerPage]=useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  
async function User(){
 
    let response = await axios.post(`http://localhost:4000/admin_user/viewuser`)
            console.log(response.data)
            setRows(response.data)
  
}

function handleDelete(emailAddress){
 
  axios.delete(`http://localhost:4000/admin_user/delEmployee?emailAddress=${emailAddress}`)
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'You have Deleted Successfully',
    showConfirmButton: true,
   
    
  })
       .then(() => {
        User();
       });
 }

useEffect(()=>{
  
  User()
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
     
    <div style={{width:'80%', marginLeft:'130px',marginTop:'0px',  height:'600px'}}>
    <Row style={{marginLeft: "0px", height: "50px" }}>
      <Col><Form><h1 style={{textAlign:'center', color:'#002140', marginTop:'-20px'}}><b>User Details</b> </h1></Form></Col>
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

          <Button variant="warning" onClick={handleShowModal}>Add Employee</Button>

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
              <TableCell align="center"><h5><b>Contact No.</b></h5></TableCell>
              <TableCell align="center"><h5><b>Designation</b></h5></TableCell>
              <TableCell align="center"><h5><b>Action</b></h5></TableCell>


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
 <TableCell align='center' style={{fontSize:'13px'}}>{row.number}</TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>{row.Designation}</TableCell> 
 <TableCell align='center' style={{fontSize:'13px'}}>
 <FcEditImage style={{marginLeft: "10px",height:"30px",width:"40px"}} onClick={()=>updateData(row.name, row.emailAddress, row.number, row.Designation)}/>
          
  <MdOutlineDeleteForever style={{marginLeft: "10px",height:"30px",width:"40px"}} onClick={()=>handleDelete(row.emailAddress)} />
   <FaEye style={{marginLeft: "10px",height:"30px",width:"40px"}} onClick={()=>handleButtonClick(row.emailAddress)}/>
 </TableCell>
 
 
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
   {/*///////// Start  Update/// */}
   <Modal show={show} onHide={handleClose}>

<Modal.Header closeButton>

  <Modal.Title>Update Employee</Modal.Title>

</Modal.Header>

<Modal.Body>

<div>

<Form.Label>Email Address</Form.Label>

<Form.Control value={emailAddress} onChange={(e)=>setNewemailAddress(e.target.value)} disabled='true' /> <br />

<Form.Label>Name</Form.Label>

<Form.Control value={name} onChange={(e)=>setNewname(e.target.value)} /> <br />

<Form.Label>Contact number</Form.Label>

<Form.Control value={number} onChange={(e)=>setNumber(e.target.value)} /> <br />


<Form.Label>Designation</Form.Label>

<Form.Control value={Designation} onChange={(e)=>setDesignation(e.target.value)} /> <br />


</div>

</Modal.Body>

<Modal.Footer>

  <Button variant="secondary" onClick={handleClose}>

    Close

  </Button>

  <Button variant="primary" onClick={()=>saveUpdatedData()}>
  

    Save

  </Button>

</Modal.Footer>

</Modal>
{/*/////////////Update complete //////////*/}
   
 {/*///////// Start  AddEmployee/// */}

 <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Employee Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
              />
             </Form.Group>
             <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formpassword">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formcontact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter contact number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formDesignation">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="Designation"
                placeholder="Enter Designation"
                name="Designation"
                value={formData.Designation}
                onChange={handleInputChange}
              />
            </Form.Group>

            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={addEmployee}>
            Add Employee
          </Button>
        </Modal.Footer>
      </Modal>
{/*/////////////AddEmployee complete //////////*/}
    </>
  )
}

export default User