import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { url } from '../Urls';

const Signup = () => {
    const [credentials,setcredentials] = useState({name:"",email:"",password:"",geolocation:""}); 
    const handleSubmit = async (e) => {
     e.preventDefault();
     const response = await fetch(`https://${url}/api/createuser`,{
        method:'POST',
        headers:{
           "Content-Type":"application/json",
        },
        body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
     }
     );
     const json = await response.json();
     console.log(json);
     if(json.success===false) {
        alert("Enter Valid credentials.");
     }    
    }
 function onChange(e){
        setcredentials({...credentials,[e.target.name]:e.target.value});
    }

  return (
    <>
  
     
      <div className='container' onSubmit={handleSubmit}>
          <form className='m-4'>
              <div class="mb-3">
                  <label htmlFor="name" class="form-label">Name</label>
                  <input type="name" class="form-control" value={credentials.name} name='name'   onChange={onChange} />
              </div>
              <div class="mb-3">
                  <label htmlFor="email" class="form-label">E-mail</label>
                  <input type="email" class="form-control" value={credentials.email} name='email' onChange={onChange}  />

              </div>
              <div class="mb-3">
                  <label htmlFor="password" class="form-label">Password</label>
                  <input type="password" class="form-control" value={credentials.password} name='password' onChange={onChange } />

              </div>
              <div class="mb-3">
                  <label htmlFor="location" class="form-label">Location</label>
                  <input type="name" class="form-control" value={credentials.geolocation} name='geolocation' onChange={ onChange}  />

              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
              <Link to= '/login'> <button className='m-3 btn btn-danger'>Already a User</button></Link>
          </form>
      </div>
   
   
    </>   
  )
}

export default Signup
