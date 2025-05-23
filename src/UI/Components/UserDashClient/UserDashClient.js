'use client'

import React ,{useState,useEffect}from 'react'
import './UserDashboard.css';
import DashboardTabs from '../../Components/User-Dashboard-Components/DashboardTabs/DashboardTabs';
import { url } from '../../../utils/api';
// import { useLocation, useParams  } from 'react-router-dom';
import { useUserDashboardContext } from '../../../context/userDashboardContext/userDashboard';
import { useGlobalContext } from '../../../context/GlobalContext/globalContext';
import { useRouter } from 'next/navigation';

const UserDashboardClient = ({id}) => {
  // const navigate = useNavigate();
const router = useRouter();
  const { setMainLoader } = useGlobalContext();
  const { setUserToken } = useUserDashboardContext();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [userData,setUserData] = useState({})

  // const id = params.id;

  const checkToken = async () => {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        setMainLoader(true);
        const response = await fetch(`${url}/api/v1/web-users/verify-token`, {
          method: "GET",
          headers: {
            authorization: `${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const response2 = await fetch(`${url}/api/v1/web-users/get/${id}`, {
            method: "GET",
            headers: {
              authorization: `${token}`,
            },
          });
          if (response2.ok) {
            const data = await response2.json();
            setUserData(data.data)
            setIsTokenValid(true);
            setMainLoader(false);
          }else{

          }
          
        } else {
          localStorage.removeItem('userToken');
          setUserToken(null);
          setIsTokenValid(false);
          setMainLoader(false);
          router.push("/my-account")
        }
      } catch (error) {
        localStorage.removeItem('userToken');
        setUserToken(null);
        setIsTokenValid(false);
        setMainLoader(false);
        router.push("/my-account")
      }

      setMainLoader(false);
    }
    else {
      setMainLoader(false);
      router.push("/my-account")
    }

  };


  const moveToLoginDash = async () => {
    await checkToken();
  }

  const [prevState, setPrevState] = useState(null);
    useEffect(() => {
      // Ensure this runs only in the browser
      const storedUuid = localStorage.getItem('uuid');
      if (storedUuid) {
        setPrevState(storedUuid);
      }
    }, []);

    // Get location and state from the previous route
    // const location = useLocation();
    // const prevState = location.state;
  
    // Check if the state exists and set default values accordingly
    useEffect(() => {
      if (!prevState) {
          moveToLoginDash();
      }
    }, [prevState]);
    
  return (
    <div className='user-dashboard-main-page'>
      <div className='user-dashboard-main-heading'>
        <h3>My Account</h3>
      </div>
      <DashboardTabs data={userData}  />
    </div>
  )
}

export default UserDashboardClient
