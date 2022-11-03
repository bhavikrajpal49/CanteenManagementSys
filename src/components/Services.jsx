import React from 'react'
import userfriend from '../img/userfrnd.png';
import onlineorder from '../img/onlord.png';
import uptodate from '../img/uptodate.png';
// import resp from '../img/resp.png';

function Services() {
    
  return (
    <div name="service" className='bg-gradient-to-b from-white-800 to-white-800 w-full text-black md:h-100 overflow-hidden'>
                <h1 className='text-4xl font-bold inline border-b-4 border-grey-500 flex justify-center mt-10'>At Your Service</h1>
        <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-100'>
            <div className='pb-8'>
            </div>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-10 px-12 sm:px-0 mt-15'>
                <div className='shadow-md shadow-grey-600 rounded-lg'>
                    <img src={userfriend} alt="" className='rounded-md duration-200 hover:scale-105'/>
                    <div>
                        <br />
                        <h1 className='text-2xl'>User-Friendly</h1>
                        <br />
                        <p>Our Website is user friendly as well as easy to use and understand for different users</p>
                    </div>
                </div>
                <div className='shadow-md shadow-grey-600 rounded-lg '>
                    <img src={onlineorder} alt="" className='rounded-md duration-200 hover:scale-105 h-2.5/5.5 '/>
                    <div>
                        <br />
                        <h1 className='text-2xl'>Online Order</h1>
                        <br />
                        <p>Customer can place their order online by using this university website without any difficulty</p>
                    </div>
                </div>
                <div className='shadow-md shadow-grey-600 rounded-lg'>
                    <img src={uptodate} alt="" className='rounded-md duration-200 hover:scale-105 h-4/6'/>
                    
                    <div>
                        <br />
                        <h1 className='text-2xl px-16'>Up to Date</h1>
                        <br />
                        <p>We update dependencies to keep the canteen menu up to date </p>
                    </div>
                </div>
                
            </div>
        </div>
        <br />
        <footer>
        <div className="text-center p-6 bg-gray-200  ">
    <span>© 2022 Copyright:</span>
    <a className="text-gray-600 font-semibold" href="#">E-canteen</a>
    <br />
    <span>Contact Us : </span>
    <a className="text-gray-600 font-semibold" href="#">022-6458193</a>
    <br />
    <span>Feel free to mail us at : </span>
    <a className="text-gray-600 font-semibold" href="#">e-canteensystem@gmail.com</a>
  </div>
        </footer>
    </div>
    
       

    
  );
};

export default Services;