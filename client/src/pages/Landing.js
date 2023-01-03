import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import {Logo} from '../components'
import { Link } from 'react-router-dom';
 
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby trust fund 8-bit food truck twee chartreuse retro craft
            beer vibecession williamsburg wolf banh mi locavore fingerstache
            health goth. 90's organic YOLO hot chicken. Food truck pork belly
            pour-over viral gatekeep disrupt intelligentsia, mlkshk sus
            distillery humblebrag. Bespoke biodiesel man bun try-hard ennui,
            mukbang vegan big mood yuccie pickled hot chicken slow-carb.
          </p>
          <Link to='/register' className='btn btn-hero'>Login/Register</Link>
        </div>
        <img src={main} alt="job hunt" className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
