
import { jwtDecode } from "jwt-decode";
import DashCard from "../../components/DashCard";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const token: any = localStorage.getItem("authToken");
  const decoded: any = jwtDecode(token);
  const [influencers, setInfluencers] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);

  const fetchInfluencers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/getAllInfluencers');
      console.log('Response:', response); // Log the response
      setInfluencers(response.data);
    } catch (error) {
      console.error('Error fetching influencers:', error);
    }
  };
  const getAllCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:3000/campaigns/all");
      setCampaigns(res.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };
  useEffect(() => {
    fetchInfluencers();
    getAllCampaigns();
  }, []);

  return (
    <div className="lg:ml-60 mt-10 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-x-hidden">
      <div className="font-semibold text-xl mb-12 mt-11 col-span-full">
        {new Date().getHours() < 12
          ? "Good Morning,"
          : new Date().getHours() < 18
          ? "Good Afternoon,"
          : "Good Evening,"}
        <span className="font-bold ml-2 text-black">{decoded.email}</span>
      </div>

      {/* Each DashCard item below is wrapped with a responsive flex and max-w styling */}
      <div className="flex justify-center h-full">
        <DashCard
          description="Influencers"
          customClass="w-full max-w-xs border"
          number={influencers.length}
        />
      </div>
      <div className="flex justify-center h-full">
        <DashCard
          description="Campains"
          customClass="w-full max-w-xs border"
          number={campaigns.length}
        />
      </div>
    </div>
  );
};

export default Dashboard;
