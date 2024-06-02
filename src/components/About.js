import React from 'react';
import './About.css';
import about1 from '../images/about1.jpg';
import about2 from '../images/about2.jpg';
import about3 from '../images/about3.jpg';
import about4 from '../images/about4.jpg';


function About() {
    return ( 
      <div>
        <div className="box0">
          <div className="text-center"> 
            <h1>Here's Our Story</h1>
          </div>
        </div>
        <div className="box1">
          <div className="container1">
            <div className="row">
              <div className="col-md-6">
                <div className="text1">
                  <h2>About Us</h2>
                  <p>At SOIL Organics, we're rooted in a commitment to nourishing communities with premium, organic produce. As a long-standing organic food grocer in Melbourne, we've cultivated a legacy of providing fresh, high-quality food while fostering education on sustainable living practices.</p>
                </div>
              </div>
              <div className="col-md-6">
                <img src={about1} alt="About1" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>

        <div className="box2">
          <div className ="container2">
            <div className="row">
              <div className="col-md-6">
                <img src={about2} alt="About2" className="img-fluid" />
              </div>
              <div className="col-md-6">
                <div className="text2">
                  <h2>Our Mission</h2>
                  <p>We believe in more than just selling groceries. We're dedicated to empowering individuals to make informed choices about their health and the planet. That's why we offer face-to-face seminars on topics ranging from diet and nutrition to small-scale organic farming. At SOIL, we're committed to cultivating a deeper understanding of the impact our food choices have on our bodies and the environment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="box3">
          <div className ="container3">
            <div className="row">
              <div className="col-md-6">
                <div className="text3">
                  <h2>Our Services</h2>
                  <p>Beyond being a traditional food grocer, SOIL Organics is a hub for community engagement and education. Our seminars provide a platform for learning and discussion, fostering a sense of connection among our customers. Whether you're a seasoned organic enthusiast or just starting your journey toward a healthier lifestyle, we welcome you to join us in exploring the benefits of sustainable living.</p>
                </div>
              </div>
              <div className="col-md-6">
                <img src={about3} alt="About3" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>

        <div className="box4">
          <div className ="container4">
            <div className="row">
              <div className="col-md-6">
                <img src={about4} alt="About4" className="img-fluid" />
              </div>
              <div className="col-md-6">
                <div className="text4">
                  <h2>Our Products</h2>
                  <p>From farm-fresh fruits and vegetables to locally sourced pantry staples, our shelves are stocked with a curated selection of premium organic goods. We partner with local farmers and producers who share our commitment to quality and sustainability, ensuring that every item we offer meets our rigorous standards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box0">
          <div className="text-center"> 
            <h2>Together, we can cultivate a healthier, more sustainable future for all.</h2>
          </div>
        </div>
      </div>
    );
}

export default About;
