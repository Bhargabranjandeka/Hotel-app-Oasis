import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

function Protectedroute({ children }) {

  const { user, isLoading, isAuthenticated } = useUser()
  const navigate = useNavigate();

  /*useEffect(function () {
    if (!isAuthenticated && !isLoading) navigate('/login')
  }, [isAuthenticated, navigate, isLoading])*/

  if (isLoading) return <Spinner />




  return children

}

export default Protectedroute
