import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Campaigns = () => {
  const [activeTab, setActiveTab] = useState("opt-ins");
  const [campaigns, setCampaigns] = useState([]);
  const token: any = localStorage.getItem("authToken");
  const decoded: any = jwtDecode(token);
  const [completedCampaigns, setCompletedCampaigns] = useState([]);

  const navigate = useNavigate();

  const getAllCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:3000/campaigns/all");
      setCampaigns(res.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const getCompletedCampaigns = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/campaigns/influ/${decoded.id}`
      );
      setCompletedCampaigns(res.data);
    } catch (error) {
      console.error("Error fetching completed campaigns", error);
    }
  };

  useEffect(() => {
    getAllCampaigns();
  }, []);

  useEffect(() => {
    getCompletedCampaigns();
  }, []);

  return (
    <div className="lg:ml-60 mt-10">
      <div className="font-semibold mt-20 text-xl mb-12 col-span-full">
        <h1 className="font-bold ml-2 text-black">My Campaigns!</h1>
        <div className="bg-[#F9FEFB] border border-gray-800 mr-28 rounded-md mt-10">
          <div className="flex space-x-4 mb-4 justify-around items-center">
            <button
              className={`px-4 py-2 rounded mt-5 ${
                activeTab === "opt-ins" ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => setActiveTab("opt-ins")}
            >
              Opt-ins
            </button>
            <button
              className={`px-4 py-2 rounded mt-5 ${
                activeTab === "accepted" ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => setActiveTab("accepted")}
            >
              Accepted Campaigns
            </button>
            <button
              className={`px-4 py-2 rounded mt-5 ${
                activeTab === "invites" ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => setActiveTab("invites")}
            >
              Invites
            </button>
            <button
              className={`px-4 py-2 rounded mt-5 ${
                activeTab === "myposts" ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => setActiveTab("myposts")}
            >
              My Posts
            </button>
          </div>
        </div>

        {/* Render campaigns for the active tab */}
        {activeTab === "opt-ins" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {campaigns.map((campaign: any) => (
              <div
                key={campaign._id}
                className="block rounded-lg bg-white p-4 shadow-lg"
              >
                <h5 className="text-2xl font-bold text-gray-700 mb-2">
                  {campaign.name}
                </h5>
                <p className="text-gray-600 text-sm mb-4">
                  {campaign.description.slice(0, 100)}...
                </p>
                <p className="text-gray-800 font-semibold">
                  Deadline:{" "}
                  <span className="text-gray-600">{campaign.deadline}</span>
                </p>
                <button
                  onClick={() =>
                    navigate(`/dashboard/campaigns/${campaign._id}`)
                  }
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {
          activeTab === "accepted" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {completedCampaigns.map((campaign: any) => (
                <div
                  key={campaign._id}
                  className="block rounded-lg bg-white p-4 shadow-lg"
                >
                  <h5 className="text-2xl font-bold text-gray-700 mb-2">
                    {campaign.name}
                  </h5>
                  <p className="text-gray-600 text-sm mb-4">
                    {campaign.description.slice(0, 100)}...
                  </p>
                  <p className="text-gray-800 font-semibold">
                    Deadline:{" "}
                    <span className="text-gray-600">{campaign.deadline}</span>
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/dashboard/campaigns/${campaign._id}`)
                    }
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Campaigns;
