import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Home from './screens/Home'
import{
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  BrowserRouter

} from 'react-router-dom';
import Login from './screens/Login'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup.jsx'
import { CartProvider } from './components/ContextReducer.jsx'
import MyOrder from './screens/MyOrder.jsx'

function App() {
  const [count, setCount] = useState(0)
  const route = createBrowserRouter(
    createRoutesFromElements(
      
      <Route >
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/myorder' element={<MyOrder/>}/>

      </Route>
      

    )
  )
  return (
    <CartProvider>
    <RouterProvider router={route}/>
    </CartProvider>
  )
}

export default App
