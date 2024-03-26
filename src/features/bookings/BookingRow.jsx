import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { HiArrowDownOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import useDeletecabin from "./useDeletebooking";
import useDeleteBooking from "./useDeletebooking";
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Buttondiv = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem;
  font-size: 1rem;
  transition: all 0.2s;
  

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 2rem;
    height: 100%;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    Startdate,
    Enddate,
    Numnights,
    numGuests,
    Totalprice,
    status,
    guests: { Fullname: guestName, Email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const Navigate = useNavigate()
  const { checkout, isCheckingout } = useCheckout()
  const { deleteBooking, isDeleting } = useDeleteBooking()
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{Email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(Startdate))
            ? "Today"
            : formatDistanceFromNow(Startdate)}{" "}
          &rarr; {Numnights} night stay
        </span>
        <span>
          {format(new Date(Startdate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(Enddate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(Totalprice)}</Amount>
      <Buttondiv>
        <StyledButton onClick={() => Navigate(`/bookings/${bookingId}`)}>
          <HiEye />
          <p>Details</p>
        </StyledButton>

        {status === 'unconfirmed' && <StyledButton onClick={() => Navigate(`/checkin/${bookingId}`)}>
          <HiArrowDownOnSquare />
          <p>Check-in</p>
        </StyledButton>}

        {status === 'checked-in' && <StyledButton onClick={() => checkout(bookingId)}>
          <HiArrowUpOnSquare />
          <p>Check-out</p>
        </StyledButton>}
        <StyledButton>
          <Modal>
            <Modal.Open opens="delete">
              <HiTrash />
            </Modal.Open>

            <Modal.Window name="delete">
              <ConfirmDelete resourceName="booking" onConfirm={() => deleteBooking(bookingId)} />
            </Modal.Window>
          </Modal>
        </StyledButton>

      </Buttondiv>



    </Table.Row>
  );
}

export default BookingRow;
