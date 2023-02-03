
        {/*<div className='flex flex-row  gap-4 md:flex-row sm:flex-row '>
              <div>
                <p className="beats-solo">{heroBanner.smallText}</p>
                <h1>{heroBanner.largeText1}</h1>
                <h3>{heroBanner.midText}</h3>
              </div>
              <div>
                 <img src={urlFor(heroBanner.image)} alt="headphones" className="hero-banner-image" />
              </div>
          </div>
  <div>*/}
  import React from 'react';
  import Link from 'next/link';
  
  import { urlFor } from '../lib/client';
  
  const HeroBanner = ({ heroBanner }) => {
    return (
      <div className="hero-banner-container">
        <div>
            <div className='grid-container'>
                  <div className='grid-child'>
                    <p className="beats-solo">{heroBanner.smallText}</p>
                    <h1>{heroBanner.largeText1}</h1>
                    <h3>{heroBanner.midText}</h3>
                  </div>
                  <div className='grid-child'>
                    <img src={urlFor(heroBanner.image)} alt="headphones" className="hero-banner-image" />
                  </div>
            </div>  
            <div>
                <Link href={`/product/${heroBanner.product}`}>
                  <button type="button">{heroBanner.buttonText}</button>
                </Link>
                <div className="desc">
                  <h5>Description</h5>
                  <p>{heroBanner.desc}</p>
                </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default HeroBanner