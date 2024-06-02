import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return ( 
    <div>
      <div className="banner1">
        <div className ="container-xx1">
          <div className="row">
            <div className = "banner-details">
              <h1 className="text1">Linking Melbourne to Farm-Fresh Excellence</h1>
              <h2>We deliver premium, locally-grown produce directly to you!</h2>
              <Link className="button" to ="./Shop">Shop Now</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="banner3">
        <div className ="container-xx3">
          <div className="row">
            <div className = "banner-details">
              <h1 className="text1">Personalised Nutrition, Tailored for You</h1>
              <h2>Create custom meal plans to suit your lifestyle. Hundreds of healthy recipes to choose from!</h2>
              <Link className="button" to ="./Shop">Create now</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="banner4">
        <div className ="container-xx4">
          <div className="row">
            <div className = "banner-details">
              <h1 className="text1">Beyond Fresh: Cultivating Knowledge, Nourishing Communities</h1>
              <h2>Learn more about eating healthy. Dive into the world of small-scale farming and grow your own food!</h2>
              <Link className="button" to ="./Seminars">Discover Now</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
