import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signingup, isLoading } = useMutation({
    mutationFn: signup,
    onSuccess: (user) => {
      console.log(user);
      toast.success("account is successfully created, please verify the mail from your mailbox")
    }
  })

  return { signingup, isLoading }
}