import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUsers } from "react-icons/fa";
import SideNavLink from "../components/SideNavLink";
import Tooltip from "./Tooltip";
import { IoHome } from "react-icons/io5";
import { ImStatsBars2 } from "react-icons/im";
import { jwtDecode } from "jwt-decode";

const Sidebar = ({ style, toggle }: { style: string; toggle: () => void }) => {
  const token: any = localStorage.getItem("authToken");
  const decoded: any = jwtDecode(token);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div
      className={`${style} flex-col fixed h-[100%] w-1/4 md:w-[13%] shadow-lg pt-[3vh] lg:pt-[11vh]  `}
    >
      <div className="list-none mt-12 ">
        <SideNavLink onClick={toggle} name="Dashboard" to="/dashboard">
          <IoHome className=" mt-1  w-5 mr-2 " />
        </SideNavLink>

        <SideNavLink onClick={toggle} name="Campains" to="/dashboard/campains">
          <ImStatsBars2 className=" mt-1  w-5 mr-2 " />
        </SideNavLink>

        {decoded.role === "brand" && (
          <SideNavLink
            onClick={toggle}
            name="Influencers"
            to="/dashboard/influencers"
          >
            <FaUsers className="w-5 mt-1 mr-2  text-dark-text-fill" />
          </SideNavLink>
        )}

      </div>
      <hr className="mt-auto -mb-72" />
      <div className="flex flex-row ml-10 mt-auto mb-10 list-none">
        <li className="px-2">
          <a onClick={logout}>
            <Tooltip message="Logout">
              <FaSignOutAlt className="w-5 text-red-700 dark:text-red-600 hover:text-red-900" />
            </Tooltip>
          </a>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
