import {FC} from "react";
import {useAppSelector} from "hooks/useAppSelector";
import {authSelector} from "storage/slices/auth";
import MQButton from "../../modules/MQButton";
import {NavLink} from "react-router-dom";
import MQImage from "modules/MQImage";
import appLogo from 'assets/images/logo.png';
import './style.scss';

const AppHeader: FC = () => {
  const authData = useAppSelector(({auth}) => authSelector(auth));

  return (
    <div className="app-header">
      <MQImage src={appLogo} height="100%" width="auto" />
      {!authData ? (
        <MQButton as={NavLink} to={"/login"}>
          Sign In
        </MQButton>
      ) : (
        <NavLink to={"/profile"}>
          {authData.user.email}
        </NavLink>
      )}
    </div>
  )
}

export default AppHeader