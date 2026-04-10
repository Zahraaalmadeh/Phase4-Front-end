import Logo from './assets/Logo2.png';
import Bell from './assets/bell.png';
import HomeIcon from './assets/home.png';
import Logout from './assets/logout.png';
import { useNavigate } from "react-router-dom";
function Layout({ children }) {
  const navigate = useNavigate();
  return (
    <>
      <section className="header">
       <img src={Logo} alt="Logo" className="logo" />
        <div className="actionIcon">
          <img src={Bell} alt="Notifications" className="icon-img" />
          <img src={HomeIcon} alt="Home" className="icon-img"
           onClick={() => navigate("/im-dashboard")}/>
          <img src={Logout} alt="Logout" className="icon-img"
          onClick={() => navigate("/login")}/>

        </div>
      </section>
      <div className="container">{children}</div>
    </>
  );
}

export default Layout;