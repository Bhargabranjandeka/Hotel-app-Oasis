import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export default function useSettings() {
  const { isLoading, data: settings, } = useQuery({
    queryKey: ['Settings'],
    queryFn: getSettings,
  })
  console.log(settings)
  return { isLoading, settings }
}