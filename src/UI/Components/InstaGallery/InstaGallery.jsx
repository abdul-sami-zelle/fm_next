import React, { useState } from 'react'
import './InstaGallery.css';
import galleryimageOne from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 874.png';
import galleryImageTwo from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 875.png';
import galleryImageThree from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 876.png';
import galleryImageFour from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 877.png';
import galleryImageFive from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 878.png';
import galleryImageSix from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 879.png';
import galleryImageSeven from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 880.png';
import galleryImageEight from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 881.png';
import galleryImageNine from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 882.png';
import galleryImageTen from '../../../Assets/Furniture Mecca/Landing Page/instagram images/Rectangle 883.png';
import instaIcon from '../../../Assets/Furniture Mecca/Landing Page/instagram images/insta-icon.png'
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from 'next/link';


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
                return <img key={index} src={image} alt={`image ${index + 1}`} effect='blur' />
            })}
        </div>
        <div className={`icon ${animateMouse ? 'animate' : ''}`}>
            <Link target='_blank' href={'https://www.instagram.com/myfurnituremecca/?igshid=MzRlODBiNWFlZA%3D%3D'}>
                <img src={'/Assets/Furniture Mecca/Landing Page/instagram images/insta-icon.png'} alt='icon' className={`${animateMouse ? 'animate' : ''}`} effect='blur'/>
            </Link>
        </div>
    </div>
  )
}

export default InstaGallery
