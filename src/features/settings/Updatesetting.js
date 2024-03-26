import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: Settingupdate } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("settings successfully updated");
      queryClient.invalidateQueries({ queryKey: ["Settings"] });

    },

    onError: (err) => toast.error(err)
  })

  return { isUpdating, Settingupdate }
}