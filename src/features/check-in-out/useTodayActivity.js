import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { data: stays, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['Today-Activity'],
  })
  console.log(stays)
  return { stays, isLoading }
}