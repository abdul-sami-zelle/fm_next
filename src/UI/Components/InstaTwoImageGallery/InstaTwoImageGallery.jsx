import React, {useState} from 'react'
import './InstaTwoImageGallery.css';
// import instaIcon from '../../../Assets/Furniture Mecca/Landing Page/instagram images/insta-icon.png'
import Link from 'next/link';

const InstaTwoImageGallery = () => {
    const [animateMouse, setAnimateMouse] = useState(false);
    const handleMouseMove = () => {
        setAnimateMouse(true)

        setTimeout(() => {
            setAnimateMouse(false);
        }, 1500)
    }
  return (
    <div className={`insta-two-image-gallery ${animateMouse ? 'animate' : ''}`} onMouseMove={handleMouseMove}>
        <Link target='_blank' href={'https://www.instagram.com/myfurnituremecca/?igshid=MzRlODBiNWFlZA%3D%3D'}>
            <img src={'/Assets/Furniture Mecca/Landing Page/instagram images/insta-icon.png'} alt='icon' className={`${animateMouse ? 'animate' : ''}`}/>
        </Link>
        {/* <div className='insta-image-one'>
            <img src={instaOne} alt='img one' />
        </div> */}
        {/* <div className='insta-image-one'>
            <img src={instaTwo} alt='img one' />
        </div> */}
    </div>
  )
}

export default InstaTwoImageGallery
