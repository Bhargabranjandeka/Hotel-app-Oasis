import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentuser } from "../../services/apiAuth";

export default function useUpdateuser() {
  const queryClient = useQueryClient();

  const { isLoading: isupdating, mutate: Updateuser } = useMutation({
    mutationFn: updateCurrentuser,
    onSuccess: ({ user }) => {
      toast.success("User has been updated successfully");
      queryClient.setQueryData(["user"], user)
      //queryClient.invalidateQueries({ queryKey: ["user"] });

    },

    onError: (err) => toast.error(err)
  })

  return { isupdating, Updateuser }
}