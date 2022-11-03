import React from 'react'
import "./css/AboutUs.css"
import Image from "../img/logoside.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";




function AboutUs() {
  return (
    <div class="section">
      <div class="container">
        <div class="content-section">
          <div class="title">
            <h1>About Us</h1>
          </div>
          <div class="content">
            <h3>Best Dishes and Beverages in the college</h3>
            <p>We make the best food in your college. Best food in budget.What,we propose is a Canteen Automation System, which is a technique of ordering foods online applicable in any food delivery industry. The main advantage of this system is that it greatly simplifies the ordering process for both the customer and the canteen. </p>
            <div class="button">
						<a href="">Read More</a>
					</div>
          </div>
          <div class="social">
        <a href=""><i class="fab fa-facebook-f"><FontAwesomeIcon icon={faYoutube} size="null" /></i></a>
					<a href=""><i class="fab fa-twitter"><FontAwesomeIcon icon={faFacebook} size="null" /></i></a>
					<a href=""><i class="fab fa-instagram"><FontAwesomeIcon icon={faInstagram} size="null" /></i></a>          
					<a href=""><i class="fab fa-instagram"><FontAwesomeIcon icon={faTwitter} size="null" /></i></a>          
				</div>
        </div>
        
        <div className="image-section my-300">
          <img src={Image} alt="/" />
        </div>
        
        
      </div>
      
    </div>
  )
}

export default AboutUs;