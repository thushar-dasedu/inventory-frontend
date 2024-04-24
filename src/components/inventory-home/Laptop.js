import './Laptop.css';
import eadv from '../asset/la1.webp';
import ecom2 from '../asset/onli1.jpg';
import ecom3 from '../asset/images.jpg';
import Carousel from 'react-bootstrap/Carousel';

const Laptop = () => {
  return (
    <div className='laptop-main'>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
          style={{height:'25vh'}}
            className="d-block w-100 "
            src={eadv}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
           style={{height:'25vh'}}
            className="d-block w-100 "
            src={ecom2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
           style={{height:'25vh'}}
            className="d-block w-100 "
            src={ecom3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Laptop;
