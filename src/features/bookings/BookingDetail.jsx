import styled from "styled-components";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Modal from "../../ui/Modal";
import { useMoveBack } from "../../hooks/useMoveBack";
import useBookingdetails from "./useBookingdetail";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeletebooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
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

function BookingDetail() {
  const { isLoading, booking, } = useBookingdetails()
  const { checkout, isCheckingout } = useCheckout();
  const moveBack = useMoveBack();
  const Navigate = useNavigate()
  const { id: bookingId, status } = booking;
  const { deleteBooking, isDeleting } = useDeleteBooking()

  if (isLoading) return <Spinner />
  if (!booking) return <Empty resource="Booking" />

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };



  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && <Button onClick={() => Navigate(`/checkin/${bookingId}`)}>
          Check in
        </Button>}

        {status === 'checked-in' && <Button disabled={isCheckingout} onClick={() => checkout(bookingId)}>
          Check out
        </Button>}

        <Modal>
          <Modal.Open opens="delete">
            <Button disabled={isDeleting} variation="danger">Delete Booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete resourceName="booking" onConfirm={() => deleteBooking(bookingId, {
              onSettled: () => Navigate(-1)
            })} />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup >
    </>
  );
}

export default BookingDetail;
