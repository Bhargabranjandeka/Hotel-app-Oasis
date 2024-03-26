import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createnewcabin } from "../../services/apicabins";
import toast from "react-hot-toast";

export default function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isediting, mutate: editing } = useMutation({
    mutationFn: ({ newcabin, id }) => createnewcabin(newcabin, id),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });

    },

    onError: (err) => toast.error(err)
  })

  return { isediting, editing }
}