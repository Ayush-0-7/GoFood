import React, {useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatchCart, usecart } from './ContextReducer.jsx';

const Card = (props) => {
    let dispatch = useDispatchCart();
    let data = usecart();
    let optionss = props.options;
    let priceOptions = Object.keys(optionss[0]);
    let Reference = useRef();
    let [qty,setQty] = useState(1);
    let [size,setSize] = useState('');
    //let [finalPrice,setFinalPrice] = useState(0);
    //  useEffect(()=>{
    //    setFinalPrice(qty*parseInt(optionss[0][size]))
    //  },[qty,size])
    //OR:-
    let finalPrice = (qty*parseInt(optionss[0][size]))
    // since as size changes the page will get re-render every time .
    useEffect(()=>{
         setSize(Reference.current.value)
     },[]);
     const handleAddtoCart = async() => {
            let food = [] ;
            for(const items of data){
                if(props.foodData._id == items.id  ){
                     food = items;
                     break;
                }
            }
          
            if(food != []){
                if(food.size == size){
                    await dispatch({type:"UPDATE" , id:props.foodData._id,price:finalPrice,qty:qty});
                    return ;
                }
                else if(food.size != size){
                    await dispatch({type:"ADD",id:props.foodData._id,name:props.foodData.name,img:props.foodData.img,qty:qty,price:finalPrice,size:size}) 
                    return ;
                }
                return ;
            }
            await dispatch({type:"ADD",id:props.foodData._id,name:props.foodData.name,img:props.foodData.img,qty:qty,price:finalPrice,size:size})
    }
  return (

    <div>
          <div className="card mt-3" style={{"width": '16rem',"maxHeight":"360px"}}>
              <img src={props.foodData.img} className="card-img-top" alt="..." style={{height:"140px",objectFit:"fill"}}/>
                  <div className="card-body">
                      <h5 className="card-title">{props.foodData.name}</h5>
                      <p className="card-text fst-italic"></p>
                  </div>
                  <div className='container w-100 '>
                    <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)} >
                        {
                            Array.from(Array(6),(e,i)=>{
                                return (
                                    <option id={i+1} value={i+1}>{i+1}</option>
                                )
                            })
                        }
                    </select>
                    <select className='m-2 h-100 bg-success rounded ' ref={Reference}  onChange={(e)=>setSize(e.target.value)} >
                        {
                            priceOptions.map((data)=>{
                                return <option key={data} value={data}>{data}</option>
                            })
                        }

                    </select>
                    <div className='fs-5 d-inline h-100'>
                      ₹{finalPrice}/-
                    </div>
                    

                  </div>
                  <hr></hr>
                  <button className={'btn btn-success justify-center ms-2 me-auto mb-3'} onClick={handleAddtoCart}>Add to Cart</button>
          </div>
    </div>

  )
}

export default Card