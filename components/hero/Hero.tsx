import React from 'react'
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsArrowDownCircle
} from 'react-icons/bs'



const Hero = () => {
  return (
      <section className="bg-cover">
        <div className="middle-text-cont container">
          <div className="test">

            <div className="middle-text text-[14px] font-bold sm:text-[18px] text-[#050505]">
              <button>
                <a href="#content">Kindly bless our wedding day.</a>          
              </button>
            </div>
            <div className="middle-text-2 text-[12px] font-bold lg:text-[18px] text-[#050505]">
              <button>
                <a href="#content"><BsArrowDownCircle size={24} className="text-[#050505] " /></a>          
              </button>
            </div>
          </div>


          
        </div>


      {/* <div className="container">
        <div className="flex flex-col justify-center items-center text-center p-[5rem_2rem]">
          <div className="text-[28px] font-bold lg:text-[32px] text-[#050505]">
            OHMOJI
          </div>
          <div className="text-[#050505]">
            A fun and interactive emoji collection website for sharing and copying your favorite emojis.
          </div>
          <div className="flex gap-[1.2rem] mt-[1rem]">
            <a
              href="/about"
              className="footer_link"
              rel="noreferrer"
            >
              <BsFacebook className="text-[#4267B2]" size={24} />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/ur.ddream"
              className="footer_link"
              rel="noreferrer"
            >
              <BsInstagram size={24} className="text-[#E1306C] " />
            </a>
            <a
              target="_blank"
              href="https://github.com/DEATHTINYZ"
              className="footer_link"
              rel="noreferrer"
            >
              <BsGithub size={24} className="text-[#6E5494] " />
            </a>
          </div>
        </div>
      </div> */}
    </section>
  )
}

export default Hero
