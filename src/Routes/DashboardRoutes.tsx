/* eslint-disable */
import {useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/Dashboards/Dashboard";
import Campains from "../pages/Dashboards/Campains";
import Influencers from "../pages/Dashboards/Influencers";
import CampaignsDetails from "../pages/Dashboards/CampainDetails";

function DashboardRoutes() {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <Sidebar toggle={handleClick} style="hidden lg:flex" />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campains" element={<Campains />} />
          <Route path="/influencers" element={<Influencers />} />
          <Route path="/campaigns/:id" element={<CampaignsDetails />} />
        </Routes>
    </div>
  );
}

export default DashboardRoutes;
