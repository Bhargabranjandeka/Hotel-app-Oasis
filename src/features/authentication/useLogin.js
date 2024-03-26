import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const querclient = useQueryClient()

  const { mutate: login, isLoading: isLogging } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      navigate('/dashboard', { replace: true })
      querclient.setQueryData(['user'], user.user)
    },
    onError: (err) => {
      console.log(err)
      toast.error('Provided email and password are incorrect')
    }
  });

  return { login, isLogging }
}