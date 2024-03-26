import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createnewcabin } from "../../services/apicabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: iscreating, mutate: creating } = useMutation({
    mutationFn: createnewcabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err)
  })

  return { iscreating, creating }
}