import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import "../App.css";


const SignIn = () => {

    const [emailAddress, setNewemailAddress] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
     
         e.preventDefault();
         const credentials = { emailAddress, password };
         
        
        const apidata = await axios.post(`http://localhost:4000/employee/login?emailAddress=${emailAddress}&password=${password}`,credentials)
       
      
    
        
       
    
        if(apidata.data.status === 200) {
            navigate("/dashboard");
          const emailAddress = apidata.data.response[0].emailAddress;
          const name = apidata.data.response[0].name;
    
          sessionStorage.setItem('emailAddress',emailAddress)
          sessionStorage.setItem('name',name)
          sessionStorage.setItem('token',apidata.data.user)
         
          alert(" Login successfully")
       
    
        }
        else
        alert(apidata.data.response)
    }
  return (
   <>
    <form  onSubmit={(e) => handleSubmit(e)}>
     <div class="form" >
            <h2>Login</h2>
            <div class="input">
                <div class="inputBox">
                    <label for="">Username</label>
                    <input type="email" onChange={(e) => setNewemailAddress(e.target.value)} required/>
                </div>
                <div class="inputBox">
                    <label for="">Password</label>
                    <input type="password"  onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div class="inputBox">
                    <input type="submit" name="" value="Sign In"/> 
                </div>
            </div>
            <p class="forgot">Forgot Password? <a href="#">Click Here</a></p>
            <div class="social">
                <button><i class="fa fa-facebook" aria-hidden="true"></i><p>Signin with Facebook</p></button>
                <button><i class="fa fa-twitter" aria-hidden="true"></i><p>Signin with Twitter</p></button>
            </div>
        </div>
        </form>
   </>
  )
}

export default SignIn