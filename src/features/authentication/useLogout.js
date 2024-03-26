import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loggedout } from '../../services/apiAuth'

export function useLogout() {
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: loggedout,
    onSuccess: () => navigate('/login', { replace: true })
  })

  return { logout, isLoading }
}