import React, { useRef, useEffect, useState } from 'react';
import pic from '../assets/1.png';
import man from '../assets/pic1.png'
import logo from '../assets/logo.png';
import '../App.css'
import frame from '../assets/frame.png'
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Box, Flex, Text } from '@chakra-ui/react';

const Home = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const parallaxRef = useRef();

  useEffect(() => {
    parallaxRef.current.scrollTo(0);
  }, []);

  const handleAnimationEnd = () => {
    setAnimationComplete(true);
  };

  return (
    <div>
      <div className='navbar'>
        <div className='nav-icons'>
          <button>Discover</button>
          <button>Creators</button>
          <button>Testimonials</button>
        </div>
        <div className='logo-div'>
          <img src={logo} alt="" className='logopic' />
        </div>
        <div className='user-btn'>
          <button className='login-btn'>Log In</button>
          <button className='sign-up'>Sign Up</button>
        </div>
      </div>
      <div>
        <Parallax pages={2.85} ref={parallaxRef} className='main'>
          <ParallaxLayer offset={0} speed={1}>
            <h6>WHERE IMAGINATION TAKES SHAPE, VIRTUALLY</h6>
            <h1>ARTIZEN</h1>
          </ParallaxLayer>
          <ParallaxLayer offset={0.08} speed={2}>
            <img src={pic} alt="" className={animationComplete ? "fade-in final-state" : "fade-in"} onAnimationEnd={handleAnimationEnd} />
          </ParallaxLayer>
          <ParallaxLayer offset={0.99} speed={1}>
            <div className="discover-section" style={{ color: 'white' }}>
              <div>
                <img src={man} alt="" />
              </div>
              <div className='discover-section-text'>
                <h2 className='sub-heading'>DISCOVER</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Commodo morbi egestas lectus ultrices sem vel. 
                  Id sem sollicitudin mi tristique duis parturient consequat aenean ut. 
                  Scelerisque id donec potenti dui aliquet. Enim ac habitant vivamus mattis egestas nisi sagittis. 
                  Id dui venenatis sed
                </p>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={1.2} speed={1}>
            <div className="featured-section" style={{ color: 'white' }}>
              <div className='featured-section-text'>
                <h2 className='sub-heading'>FEATURED</h2>
                <h5>Top Artworks</h5>
              </div>
                <div className='frame-div'>
                  <div className='frame'><img src="https://preview.redd.it/l4bpx9gkial71.jpg?width=640&crop=smart&auto=webp&s=c449fba5dc6dd76d61ee34786afdf7d9ddbc5fb7" alt="" style={{height:'100%',width:'100%'}} /></div>
                  <div className='frame'><img src="https://www.topalski.com/wp-content/uploads/2016/04/Fine-Art-Eventide-Sea-and-Waves-Original-Oil-Painting-on-Canvas-by-artist-Darko-Topalski1.jpg" alt="" style={{height:'100%',width:'100%'}} /></div>
                  <div className='frame'><img src="https://i.pinimg.com/originals/db/9b/a1/db9ba1d9f4adfcf0626fc97a3a97193c.jpg" alt="" style={{height:'100%',width:'100%'}} /></div>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={1.999} speed={1}>
            <div className="testimonial-section" style={{ color: 'white' }}>
              <div className='testimonial-section-text'>
                <h2 className='sub-heading'>TESTIMONIALS</h2>
                <h5>From Users</h5>
                <div className='box-div'>
                  <div className='grey-box'></div>
                </div>
              </div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer offset={2.45} speed={1}>
            <Box as="footer" textAlign="center" py="4" color="white" fontFamily='heverly' letterSpacing='3px'>
              <Text>© 2024 Artizen. All Rights Reserved.</Text>
            </Box>
          </ParallaxLayer>
        </Parallax>
      </div>
    </div>
  );
}

export default Home;