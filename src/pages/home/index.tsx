import {FC} from "react";
import backgroundImage from 'assets/images/bkg.webp';
import AppHeader from "components/AppHeader";
import './style.scss';

const Home: FC = () => {
  return (
    <div className="app-home">
      <AppHeader />
      <div className="app-body" style={{backgroundImage: `url(${backgroundImage})`}}>

      </div>
    </div>
  )
}

export default Home;