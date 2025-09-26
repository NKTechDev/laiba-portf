import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // To access the Redux store
import axios from 'axios';
import { BASE_URL } from '~/constant';
import { fetchUser } from '~/redux/slices/authSlice';

const UpdateLocation = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state: any) => state.auth);

    // init auth user
    useEffect(() => {
        if (!user) dispatch(fetchUser() as any);
    }, [dispatch, user]);

    // Request for location access and update location
    useEffect(() => {
        if (navigator.geolocation) {
            // Request location access
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('User location:', latitude, longitude);

                    try {
                        // Send the location and userId to your backend to update the user data
                        const response = await axios.put(`${BASE_URL}/api/v1/user/update-location`, {
                            userId: user?._id,        // Include userId from Redux store
                            latitude,
                            longitude,
                        });

                        console.log('Location updated:', response.data);
                    } catch (error) {
                        console.error('Error updating location:', error);
                    }
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        console.log("Permission denied. Please enable location access.");
                        alert("Location permission denied. Please enable it to use this feature.");
                    } else if (error.code === error.POSITION_UNAVAILABLE) {
                        console.log("Location information is unavailable.");
                        alert("Location information is unavailable.");
                    } else if (error.code === error.TIMEOUT) {
                        console.log("The request to get user location timed out.");
                        alert("Request to get location timed out.");
                    } else {
                        console.log("An unknown error occurred.");
                        alert("An unknown error occurred.");
                    }
                },
                { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    }, [user]); // Dependency on user to ensure it's available when updating

};

export default UpdateLocation;
