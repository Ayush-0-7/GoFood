import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Home from './Home';
const Login = () => {
  const [credentials,setcredentials] = useState({name:"",email:"",password:""}); 
  const [loginStatus,setLoginStatus]= useState(false);
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
   e.preventDefault();
   //**----------------------------
   //ThunderClient
   const response = await fetch("http://localhost:3000/api/login",{
        method:'POST',
        headers:{
           "Content-Type":"application/json",
        },
        body:JSON.stringify({email:credentials.email,password:credentials.password})
     }
     );
     const json = await response.json();
     console.log(json);

   //**----------------------------- 
     if(response.ok){
      setLoginStatus(true);
      console.log(json.authToken)
      localStorage.setItem('UserEmail',credentials.email);
      localStorage.setItem("token",json.authToken);
      navigate("/");

     }
     else{
      setLoginStatus(false);
      alert("Invalid Credentials.");
      setcredentials({email:"",password:""});
     }
  }
  function onChange(e){
    setcredentials({...credentials,[e.target.name]:e.target.value});
}
  return (
    <div>
     <div>
          <div className='container' onSubmit={handleSubmit}>
      <form className='m-4'>
          <div class="mb-3">
              <label htmlFor="email" class="form-label">E-mail</label>
              <input type="email" class="form-control" value={credentials.email} name='email' onChange={onChange}  />

          </div>
          <div class="mb-3">
              <label htmlFor="password" class="form-label">Password</label>
              <input type="password" class="form-control" value={credentials.password} name='password' onChange={onChange } />
          </div>    
          <button type="submit" class="btn btn-primary">Login</button>
          <Link to= '/signup'> <button className='m-3 btn btn-danger'>New User??SignUp</button></Link>
      </form>

  </div>
</div>
    </div>
  )
}

export default Login