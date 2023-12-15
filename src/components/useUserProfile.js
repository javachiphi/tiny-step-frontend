import { useAuthToken } from './useAuthToken';
import React, {useEffect, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { BACKEND_URL } from '../constants';

export const useUserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const { isAuthenticated } = useAuth0();
    const jwtToken = useAuthToken();

    useEffect(() => {
        const getUserProfile = async () => {
            if (isAuthenticated && jwtToken) {
                try {
                    axios.get(`${BACKEND_URL}/user`, {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        }
                    })
                } catch (error) {
                    console.error('Error fetching user profile', error);
                }
            }
        };

        getUserProfile();
    }, [isAuthenticated, jwtToken]);

    return userProfile;
};
