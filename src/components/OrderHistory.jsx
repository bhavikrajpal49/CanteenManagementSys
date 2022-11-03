import React from 'react'
import {useState, useEffect,useReducer} from "react";
import {firestore} from "../firebase.config";
import {collection, getDocs,doc,deleteDoc, orderBy, query} from "firebase/firestore";
import "./css/OrderDetails.css"
import { async } from '@firebase/util';

const OrderHistory = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(firestore, "orderHistory")
  //const [ignored, forceupdate]=useReducer(x => x + 1, 0);

  // useEffect(() => {

  // const deliverstat = async (user) => {
  //   await deleteDoc(doc(firestore,"orderDetails",user.id))
    
  // }
  // deliverstat();
  // }, [ignored]);

  useEffect(() => {

    const getUsers = async () => {
      const hist = await getDocs(
        query(collection(firestore, "orderHistory"))
        
      );
      // console.log(hist);
      var usernew = JSON.parse(localStorage.getItem("user")).uid;
      // console.log(usernew);
      var temp = hist.docs.map((doc) => doc.data())
      console.log(temp)
      var history = temp.filter(doc => {
        if(doc.user && doc.user.uid){
          return doc.user.uid == usernew;
        }
        else{
          console.log(doc);
        }
        
      // return doc.user.uid == usernew;
      // console.log(doc.user.uid)
      } )
      console.log(history)
      setUsers(history)

    //console.log(hist);
    // var temp = hist.docs.map((doc) => {
    // return doc.data().user.uid == usernew})
    // console.log(temp);

      // var temp = hist.docs.map((doc) => doc.data());
      // console.log(temp[0].user.uid);
      // const data = await getDocs(usersCollectionRef);
      // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
      //console.log(data);
      // //forceupdate();
    };

    getUsers();
  },[]);

var serial = 0;
  
    

  return (
    
    <div className="w-full min-h-screen flex py-3 justify-center">
      
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 items-center justify-center gap-4">
        <p className='w-full flex items-center text-2xl py-3'>Order History : </p>
        <table>
      
            <thead>
              <tr>
                <th>Sr No.</th>
                {/* <th>CustName</th>  */}
                <th>Product</th>
                <th>Qty</th>
                <th>Category</th>
                <th>Calories</th>
                <th>Price</th>
                
                {/* <th>OrdStatus</th> */}
              </tr>
              </thead>
          
      {users.map((user)=> {
        return <tr>
            <td>{++serial}</td>
            {/* <td>{user.user.displayName}</td> */}
            <td>{user.cartItems[0].title}</td>
            <td>{user.cartItems[0].qty}</td>
            <td>{user.cartItems[0].category}</td>
            <td>{user.cartItems[0].calories}</td>
            <td>{user.cartItems[0].price}</td>
            {/* <td>{user.status}</td> */}

            {/* <td>
            <button class="px-4 py-1 text-sm text-geen-600 font-semibold rounded-full 
                border border-green-200 hover:text-white hover:bg-green-600 hover:border-transparent 
                focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2" onClick={()=>deliverstat(user)}>Delivered</button>
            </td> */}
          </tr>
       
    //    useEffect( () => {

    //     if(user){
    //         db.collection('users').doc(user?.uid).collection('orders').orderBy('created','desc').onSnapshot(snapshot =>{
    //             setOrders(snapshot.docs.map(doc => ({
    //                 id : doc.id,
    //                 data: doc.data()
    //             })))
    //         })
    //     }else{
    //         setOrders([])
    //     }
        
    // } , [user])















          {/* <h1>id : {user.id}</h1>
          <h1>customerName : {user.user.displayName}</h1>
          <h1>title : {user.cartItems[0].title}</h1>
          <h1>qty : {user.cartItems[0].qty}</h1>
          <h1>price : {user.cartItems[0].price}</h1>
          <h1>status : {user.status}</h1> */}
          
        })}
        
        </table>
     </div>
     </div>
    
  )
}

export default OrderHistory;
