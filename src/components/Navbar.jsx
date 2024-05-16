import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link , useNavigate } from 'react-router-dom'
import Cart from '../screens/Cart';
import  Modal  from '../screens/Modal.jsx';
import { usecart } from './ContextReducer.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const [cartView,setCartView] = useState(false);
  const data = usecart();
  const handleLogout = async() => {
    localStorage.removeItem("token");
    navigate('/login');
  }
  return (
    <div><nav className="navbar navbar-expand-lg navbar-dark bg-success">
    <div className="container-fluid">
      <Link className="navbar-brand fs-1 fst-italic" to={'/'}>GoFood</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2">
          <li className="nav-item">
            <Link className="nav-link active fs-5" aria-current="page" to={'/'}>Home</Link>
          </li>
        {
          localStorage.getItem("token")?
          <li className="nav-item">
            <Link className="nav-link active fs-5" aria-current="page" to={'/myorder'}>My Orders</Link>
          </li>
          :
          ""
        }  
        </ul>
        {
          localStorage.getItem("token")?
          <div>
           <div className="btn bg-white text-success mx-2" onClick={()=>setCartView(true)}>MyCart{" "}
           {data.length!=0 ? <Badge pill bg='danger'>{data.length}</Badge>:null}
           </div>
           {cartView ? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
           <div className="btn bg-white text-danger mx-2" to={'/login'} onClick={handleLogout}>Logout</div>
          
          </div>
          
          :
         <div className='d-flex'>
         <Link className="btn bg-white text-success mx-1" to={'/login'}>Login</Link>
         <Link className="btn bg-white text-success mx-1" to={'/signup'}>SignUp</Link>
         </div>
        }  
      </div>
    </div>
  </nav>
  </div>
  )
}

export default Navbar