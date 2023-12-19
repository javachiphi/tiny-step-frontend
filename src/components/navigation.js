import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants";
import { useUserProfile } from "./useUserProfile";
import { Link } from "react-router-dom";

// decide whehter to put this in navigation or specific components that need access token 
export default function Navigation() {
    const {  isAuthenticated } = useAuth0();

    return(
        <>
        {
            isAuthenticated ? (
                <>
                <Profile />
                 ✅  Checklist
                <Link to="/diary">Diary Page  </Link>

                <Link to="/situation">Situation ✅  </Link>
                <Link to="/mindfulness">Mindfulness ✅  </Link>

                <Link to="/tags">Tags Page</Link>
                <LogoutButton />
                </>
            ): (
                <LoginButton />
            )
        }
        </>
    )
}

// I am not sure where to call backend API that finds or create the user.
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
    const { logout } = useAuth0();

    return(
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out 
        </button>
    )

}

const Profile = () => {
    const { user, isLoading } = useAuth0();
    // const userProfile = useUserProfile();
  
    if (isLoading) {
        return <div>Loading ...</div>;
      }
 
    return (
        <div>
           hello
        </div>
    );
  };
  