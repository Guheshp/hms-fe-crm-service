import PrivateHeader from "./PrivateHeader";
import PublicHeader from "./PublicHeader";

const Header = () => {
  const token = localStorage.getItem("token");

  return token ? <PrivateHeader /> : <PublicHeader />;
};

export default Header;
