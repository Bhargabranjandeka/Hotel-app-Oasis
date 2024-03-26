import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentbookings() {
  const [searchParams] = useSearchParams();
  const Numdays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"));
  const querydate = subDays(new Date(), Numdays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(querydate),
    queryKey: ['Bookings', `last-${Numdays}`]
  })

  return { isLoading, bookings }
}