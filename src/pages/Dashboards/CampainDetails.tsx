import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const CampaignsDetails = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applyStatus, setApplyStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [url, setUrl] = useState(""); 
  const token: any = localStorage.getItem("authToken");
  const decoded: any = jwtDecode(token);

  const fetchCampaignDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/campaigns/${id}`);
      setCampaign(res.data); // Set campaign details
      setLoading(false);
    } catch (err) {
      console.error("Error fetching campaign details:", err);
      setError("Failed to load campaign details.");
      setLoading(false);
    }
  };

  const handleApply = async () => {
    setIsModalOpen(true); 
  };

  const handleSubmitApplication = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3000/campaigns/submit/${id}`,
        {
          influencerId: decoded.id,
          url: url,
        }
      );
      setApplyStatus("Application successful!");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error applying to campaign:", err);
      setApplyStatus("Application failed. Please try again.");
      setIsModalOpen(false); 
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal without submitting
  };

  useEffect(() => {
    fetchCampaignDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="lg:ml-60 mt-10">
      <div className="font-semibold text-xl mb-12 mt-20 col-span-full">
        <h1 className="font-bold ml-2 text-black text-center">
          Campaign Details
        </h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mx-10">
        <p className="text-gray-800 mb-4">
          <strong>Name:</strong> {campaign?.name}
        </p>
        <p className="text-gray-800 mb-4">
          <strong>Description:</strong> {campaign?.description}
        </p>
        <p className="text-gray-800 mb-4">
          <strong>Deadline:</strong> {campaign?.deadline}
        </p>

        {/* Apply button */}
        <div className="mt-6 text-center">
          <button
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={handleApply}
          >
            Apply to be a Influencer
          </button>
        </div>

        {/* Application status message */}
        {applyStatus && (
          <div
            className={`mt-4 text-center text-lg ${
              applyStatus.includes("successful")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {applyStatus}
          </div>
        )}
      </div>

      {/* Modal for URL input */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl mb-4">Apply to be a Influencer</h2>
            <p className="mb-4">Please provide a URL:</p>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter your URL"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSubmitApplication}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignsDetails;
