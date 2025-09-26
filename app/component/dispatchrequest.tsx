import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BASE_URL } from '~/constant';  // Make sure this points to your API base URL

const DispatchRequests = () => {
  const { user } = useSelector((state) => state.auth);  // Get logged-in user's information
  const [dispatchRequests, setDispatchRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchDispatchRequests(user._id);  // Fetch dispatch requests for the police officer
    }
  }, [user]);

  const policeId = user?._id

  const fetchDispatchRequests = async (policeId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/user/dispatch-requests/${policeId}`);
      setDispatchRequests(response.data.dispatchRequests);  // Set the fetched dispatch requests
      setLoading(false);
    } catch (err) {
      setError('Error fetching dispatch requests');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-8">Dispatch Requests</h2>

      {dispatchRequests.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No dispatch requests available</p>
      ) : (
        <div className="space-y-4">
          {dispatchRequests.map((dispatch) => (
            <div key={dispatch._id} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-600">Room ID: {dispatch.roomId}</h3>
              <p className="text-sm text-gray-500">Status: {dispatch.status}</p>

              <div className="mt-4">
                <p><strong>User ID:</strong> {dispatch.userId}</p>
                <p><strong>Police ID:</strong> {dispatch.policeId}</p>
                <p><strong>User Location:</strong> Latitude: {dispatch.userLocation.lat}, Longitude: {dispatch.userLocation.lon}</p>
                <p><strong>Police Location:</strong> Latitude: {dispatch.policeLocation.
                  latitude}, Longitude: {dispatch.policeLocation.longitude}</p>
                <p><strong>Timestamp:</strong> {new Date(dispatch.timestamp).toLocaleString()}</p>
              </div>

              {dispatch.status === 'pending' && (
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none">
                  Accept Dispatch
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DispatchRequests;
