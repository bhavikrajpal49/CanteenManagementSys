import React from 'react'
import {useState, useEffect,useReducer} from "react";
import {firestore} from "../firebase.config";
import {collection, getDocs,doc,deleteDoc} from "firebase/firestore";
import "./css/OrderDetails.css"
import { async } from '@firebase/util';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



const ManageProd = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(firestore, "foodItems")
  const [ignored, forceupdate]=useReducer(x => x + 1, 0);
  
//   useEffect(() => {

  const deliverstat = async (user) => {
    await deleteDoc(doc(firestore,"foodItems",user.id))
    toast.error("Food Item Removed !",{
        position: "top-right",
        theme: "colored",
      }
    )
    
  }
//   deliverstat();
//   }, []);

  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
      console.log(data);

      
    //   forceupdate();
    };

    getUsers();
  },[ignored]);


  
    

  return (
    
    <div className="w-full min-h-screen flex py-3 justify-center">
      
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 items-center justify-center gap-4">
        <p className='w-full flex items-center text-2xl py-3'>Manage Products : </p>
        <table>
      
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Calories</th>
                <th>Category</th>
                
                <th>Price</th>
                <th>Qty</th>
                <th>Action</th>

              </tr>
              </thead>
          
      {users.map((user)=> {
        return <tr>
            <td>{user.id}</td>
            <td>{user.title}</td>
            <td>{user.calories}</td>
            <td>{user.category}</td>
            
            <td>{user.price}</td>
            <td>{user.qty}</td>
            <td>
            <button class="px-4 py-1 text-sm text-geen-600 font-semibold rounded-full 
                border border-red-200 hover:text-white hover:bg-red-600 hover:border-transparent 
                focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2" onClick={()=>deliverstat(user)}>Delete</button>
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

export default ManageProd;
