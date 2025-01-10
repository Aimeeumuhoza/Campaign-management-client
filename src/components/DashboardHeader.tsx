import { FaBars } from "react-icons/fa";

const DashboardHeader = () => {
 

  return (
    <div className="flex items-center fixed justify-between shadow-lg bg-[#1c2237] p-4 w-full">
      <div className="flex items-center space-x-6">
        <h1 className="text-white text-2xl font-semibold">Campains Track</h1>
        <button className="text-white text-2xl">
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
