import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Empty from '../../ui/Empty'
import useBookings from "./useBookins";
import Spinner from '../../ui/Spinner'
import Pagination from "../../ui/Pagination";

function BookingTable() {

  const { isLoading, bookingdata, count } = useBookings();

  if (isLoading) return <Spinner />

  if (!bookingdata) return <Empty resource='bookings' />

  return <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 8rem">
    <Table.Header>
      <div>Cabin</div>
      <div>Guest</div>
      <div>Dates</div>
      <div>Status</div>
      <div>Amount</div>
      <div></div>
    </Table.Header>

    <Table.Body
      data={bookingdata}
      render={(booking) => (
        <BookingRow key={booking.id} booking={booking} />
      )} />
    <Table.Footer>
      <Pagination count={count} />
    </Table.Footer>
  </Table>


}

export default BookingTable;
