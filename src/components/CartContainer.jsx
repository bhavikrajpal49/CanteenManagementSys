import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";

import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";
import { orderItem,orderHistory } from "../utils/firebaseFunctions";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  ///
  const [status, setStatus] = useState("Pending");

  
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };




  const PayCash = () => {
    const data = { 
      cartItems,user,
      status: status }
    
    orderItem(data);
    orderHistory(data);
    console.log("Data Uploaded successfully to db 😊");
    
    clearCart();
    
    toast.success("Order Placed Successfully ",{
      position: "top-center",
      theme: "colored",
    }
  )


  }

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag]);



  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));

  };



//online payment
const loadScript = (src) =>{
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src;
    
    script.onload = () => {
      resolve(true);
  
    }
  
    script.onerror = () => {
      resolve(false); 
    }
     document.body.appendChild(script);
  }) 
  }
  
      const displayRazorpay = async (amount) => {
         const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
         if (!res) {
          alert('Failed to load RazorPay SDK!');
          return;
         }
     
         const options = {
          key: 'rzp_test_H0QjiELPFlYNHm',
          currency: "INR",
          amount: amount*100,
          name: "Just Eat It!",
          image: "https://res.cloudinary.com/djww0nfoy/image/upload/v1667057057/web%20dev/restaurant_nm5ipb.png",
          description:"Here's your bill",
  
          handler: function (response) {
            // alert(response.razorpay_payment_id);
            toast.success("Payment is Successful Order Placed Sucessfully !! ",{
              position: "top-center",
              theme: "colored",
            })
          },
          prefill: {
            name: "Your Payment"
          }

          
          


         };
  
         const paymentObject = new window.Razorpay(options)
        paymentObject.open(); 

        //for loading to database
        const data = { 
          cartItems,user,
          status: status }
        
        orderItem(data);
        orderHistory(data);
        console.log("Data Uploaded successfully to db 😊");
        
        clearCart();
        
        // toast.success("Order Placed Successfully ",{
        //   position: "top-center",
        //   theme: "colored",
        // })
      }



  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart Items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart Item */}
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          {/* cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">Rs {tot}</p>
            </div>
            {/* {<div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">18% Tax</p>
              <p className="text-gray-400 text-lg">{(18 * tot) / 100}</p>
            </div>} */}

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Grand Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                {/* Rs {tot + (18 * tot) / 100}/- */}
                Rs {tot} /-
              </p>
            </div>

            {user ? (
              
              <div className="w-full">
                {/* <Link to={"/orderHistory"}> */}
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                onClick={PayCash}
                >
                  Cash On Delivery
                </motion.button>
                {/* </Link> */}

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                  onClick={()=>displayRazorpay(tot)}
                >
                  Pay Online
                </motion.button>

              </div>

            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login to check out

              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
      <ToastContainer />
    </motion.div>
  );
  
};

export default CartContainer;
