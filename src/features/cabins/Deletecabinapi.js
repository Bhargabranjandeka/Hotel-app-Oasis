import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins as deleteCabinApi } from "../../services/apicabins";
import toast from "react-hot-toast";



export default function useDeletecabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("cabin successfully deleted")
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },

    onError: (err) => toast.error(err.message)
  })

  return { isDeleting, deleteCabin }
}

