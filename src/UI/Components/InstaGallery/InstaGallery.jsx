import React, { useState } from 'react'
import './InstaGallery.css';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from 'next/link';
import Image from 'next/image';


const InstaGallery = () => {
    const instaGalleryImages = [
        '/Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 874.png', 
        '/Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 875.png', 
        '/Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 876.png', 
        '/Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 877.png', 
        '/Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 878.png', 
        '/Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 879.png', 
        '/Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 880.png', 
        '/Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 881.png', 
        '/Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 882.png', 
        '/Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 883.png'
    ]
    const [animateMouse, setAnimateMouse] = useState(false);
    let intervelId;


    const handleMouseMove = () => {
        setAnimateMouse(true);

        intervelId = setInterval(() => {
            setAnimateMouse(false);
            setTimeout(() => {
                setAnimateMouse(true);
            }, 1000);
        }, 1500)

        // setTimeout(() => {
        //     setAnimateMouse(false);
        // }, 1500)
    }

    const stopAnimation = () => {
        setAnimateMouse(false);
        clearInterval(intervelId);
    };

  return (
    <div className='insta-container' onMouseEnter={handleMouseMove} onMouseLeave={stopAnimation}>
        <div className='images'>
            
            {instaGalleryImages.map((image, index) => {
                return <Image key={index} src={image} width={380} height={345} alt={`image ${index + 1}`} effect='blur' />
            })}
        </div>
        <div className={`icon ${animateMouse ? 'animate' : ''}`}>
            <Link target='_blank' href={'https://www.instagram.com/myfurnituremecca/?igshid=MzRlODBiNWFlZA%3D%3D'}>
                <Image src={'/Assets/Furniture Mecca/Landing Page/instagram images/insta-icon.png'} width={100} height={100} alt='icon' className={`${animateMouse ? 'animate' : ''}`} effect='blur'/>
            </Link>
        </div>
    </div>
  )
}

export default InstaGallery
