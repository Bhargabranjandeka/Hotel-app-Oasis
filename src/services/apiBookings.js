import { getToday } from "../utils/helpers";
import supabase from "./Supabase";
import { PAGE_SIZE } from "../utils/Constants";

export async function getBookings({ filter, sortby, page }) {

  let query = supabase.from('Bookings').select('* , cabins(name) , guests(Fullname,Email)', { count: 'exact' });

  //filtering//

  if (filter) query = query.eq(filter.field, filter.value)

  // sorting //

  if (sortby) query = query.order(sortby.field, {
    ascending: sortby.direction === 'asc',
  })

  //pagination //

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query.range(from, to)
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error)
    throw new Error("can't find the table")
  }

  return { data, count };
}


export async function getBooking(id) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    .select("created_at, Totalprice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("Bookings")
    // .select('*')
    .select("*, guests(Fullname)")
    .gte("Startdate", date)
    .lte("Startdate", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("Bookings")
    .select("*, guests(Fullname, Nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,Startdate.eq.${getToday()}),status.eq.checked-in,Enddate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  console.log(data)
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("Bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("Bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
