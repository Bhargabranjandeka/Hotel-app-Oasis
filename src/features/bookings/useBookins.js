import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/Constants";

export default function useBookings() {
  const [searchparam] = useSearchParams();
  const queryclient = useQueryClient();

  // filtering //
  const filtervalue = searchparam.get('status')
  const filter = !filtervalue || filtervalue === 'all' ? null : { field: 'status', value: filtervalue };

  // sorting //
  const sortbyraw = searchparam.get('sortby') || 'Startdate-desc'
  const [field, direction] = sortbyraw.split('-');
  const sortby = { field, direction }

  //pagination //

  const page = !searchparam.get('page') ? 1 : Number(searchparam.get('page'));

  const { isLoading, data: { data: bookingdata, count } = {}, error } = useQuery({
    queryKey: ['Bookings', filter, sortby, page],
    queryFn: () => getBookings({ filter, sortby, page }),
  })

  // prefetching //
  const Pagecount = Math.ceil(count / PAGE_SIZE)
  if (page < Pagecount) {
    queryclient.prefetchQuery({
      queryKey: ['Bookings', filter, sortby, page + 1],
      queryFn: () => getBookings({ filter, sortby, page: page + 1 }),
    })
  }

  if (page > 1) {
    queryclient.prefetchQuery({
      queryKey: ['Bookings', filter, sortby, page - 1],
      queryFn: () => getBookings({ filter, sortby, page: page - 1 }),
    })
  }

  return { isLoading, bookingdata, error, count }
}