import React from 'react'
import {useState, useEffect,useReducer} from "react";
import {firestore} from "../firebase.config";
import {collection, getDocs,doc,deleteDoc,updateDoc} from "firebase/firestore";
import "./css/OrderDetails.css"
import { async } from '@firebase/util';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const OrderDetails = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(firestore, "orderDetails")
  const [ignored, forceupdate]=useReducer(x => x + 1, 0);

  // useEffect(() => {

  const deliverstat = async (user,updates) => {
    await deleteDoc(doc(firestore,"orderDetails",user.id))
    // await updateDoc(doc(firestore,"orderHistory",user.id).update(updates))
    // var ref = doc(firestore,"orderHistory",user.id).update(updates);
    // await updateDoc(
    //   ref,{
    //     user:user.id,
        
    //   }
    // )
    toast.success("Food Delivered SuccessFully !!",{
      position: "top-right",
      theme: "colored",
    }
  )}
  // deliverstat();
  // }, [ignored]);


  //update func
  

  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
      console.log(data);
      // forceupdate();
    };

    getUsers();
  },[ignored]);

    

  return (
    
    <div className="w-full min-h-screen flex py-3 justify-center">
      
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 items-center justify-center gap-4">
        <p className='w-full flex items-center text-2xl py-3'>Order Details : </p>
        <table>
      
            <thead>
              <tr>
                <th>OrderId</th>
                <th>CustName</th> 
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>OrdStatus</th>
              </tr>
              </thead>
          
      {users.map((user)=> {
        return <tr>
            <td>{user.id}</td>
            <td>{user.user.displayName}</td>
            <td>{user.cartItems[0].title}</td>
            <td>{user.cartItems[0].qty}</td>
            <td>{user.cartItems[0].price}</td>
            <td>
            <button class="px-4 py-1 text-sm text-geen-600 font-semibold rounded-full 
                border border-green-200 hover:text-white hover:bg-green-600 hover:border-transparent 
                focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2" onClick={()=>deliverstat(user)}>Delivered</button>
            </td>
            
          </tr>
          
          {/* <h1>id : {user.id}</h1>
          <h1>customerName : {user.user.displayName}</h1>
          <h1>title : {user.cartItems[0].title}</h1>
          <h1>qty : {user.cartItems[0].qty}</h1>
          <h1>price : {user.cartItems[0].price}</h1>
          <h1>status : {user.status}</h1> */}
          
        })}
        
        </table>
        
     </div>
     <ToastContainer />
     </div>
    
  )
}

export default OrderDetails;
