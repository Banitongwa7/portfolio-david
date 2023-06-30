import React from 'react'
import Image from 'next/image'

export default function SectionOne() {


  return (
    <section>
        <div className="main">
            <div className="social">
                <a href="#"><i className="bi bi-github"></i></a>
                <a href="#"><i className="bi bi-twitter"></i></a>
                <a href="#"><i className="bi bi-linkedin"></i></a>
            </div>
            <div className="detail">
                <h1><span>Hi, It&#39;s Me</span> <br /> I&#39;m <span style={{color:'#113D6B'}}>David</span></h1>
                <p>Lorem Ipsum is simply dummy text of the printing <br /> and typesetting industry. </p>
                <div className="button">
                    <button>Download CV</button>
                </div>
            </div>
            <div className="images">
                <Image src="https://www.robohead.net/wp-content/uploads/2020/04/Project-Management-Software-Online.png" priority={true} alt="my picture" width={300} height={800} className='ml-10 mt-[-21px]' />
            </div>
        </div>
    </section>
  )
}
