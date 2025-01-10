import axios from "axios";
import { useEffect, useState } from "react";

const Influencers = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);

  const getAllCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:3000/campaigns/all");
      setCampaigns(res.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  const getCampaignSubmissions = async (campaignId: string) => {
   
    try {
      const res = await axios.get(
        `http://localhost:3000/campaigns/influencers/status/${campaignId}`
      );
      console.log("res", res);
      setSubmissions(res.data.influencers); 
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  const handleSubmissionStatus = async (
    campaignId: string,
    influencerId: string,
    status: string
  ) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/campaigns/submission/${campaignId}`,
        {
          influencerId,
          status,
        }
      );
      if (res.status === 200) {
        alert(
          `${status.charAt(0).toUpperCase() + status.slice(1)} successfully!`
        );
        getCampaignSubmissions(campaignId); 
      }
    } catch (error) {
      console.error("Error updating submission status:", error);
    }
  };

  useEffect(() => {
    getAllCampaigns();
  }, []);

  return (
    <div className="lg:ml-60 mt-10">
      <div className="font-semibold mt-20 text-xl mb-12 col-span-full">
        <h1 className="font-bold ml-2 text-black">My Influencers!</h1>
        <div className="bg-[#F9FEFB] border border-gray-800 mr-28 rounded-md mt-10">
          <div className="flex space-x-4 mb-4 justify-around items-center">
            {campaigns.map((campaign: any) => (
              <button
                key={campaign._id}
                className={`px-4 py-2 rounded mt-5 ${
                  activeTab === campaign._id ? "bg-green-500 text-white" : ""
                }`}
                onClick={() => {
                  setActiveTab(campaign._id);
                  getCampaignSubmissions(campaign._id);
                }}
              >
                {campaign.name}
              </button>
            ))}
          </div>
        </div>

        {activeTab && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {submissions && submissions.length === 0 ? (
              <p>No submissions yet for this campaign.</p>
            ) : (
              submissions &&
              submissions.map((submission: any) => (
                <div
                  key={submission._id}
                  className="block rounded-lg bg-white p-4 shadow-lg"
                >
                  <h5 className="text-2xl font-bold text-gray-700 mb-2">
                    {submission.influencerId}
                  </h5>
                  <p className="text-gray-600 text-sm mb-4">{submission.url}</p>
                  <p className="text-gray-800 font-semibold">
                    Status:{" "}
                    <span className="text-gray-600">{submission.status}</span>
                  </p>

                  <div className="space-x-2 mt-4">
                    <button
                      onClick={() =>
                        handleSubmissionStatus(
                          activeTab,
                          submission.influencerId,
                          "approved"
                        )
                      }
                      className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleSubmissionStatus(
                          activeTab,
                          submission.influencerId,
                          "rejected"
                        )
                      }
                      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Influencers;
