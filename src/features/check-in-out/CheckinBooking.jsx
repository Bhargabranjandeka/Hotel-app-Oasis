import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBookingdetails from "../bookings/useBookingdetail";
import Spinner from "../../ui/Spinner";
import Checkbox from '../../ui/Checkbox'
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import useSettings from "../settings/Settingsapi";
import { useCheckout } from "./useCheckout";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBookingdetails();
  const [confirmPaid, setconfirmPaid] = useState(false);
  const [addbreakfast, setaddbreakfast] = useState(false);

  const { checkin, isCheckingIn } = useCheckin();
  const { checkout, isCheckingout } = useCheckout();

  const { isLoading: isLoadingsettings, settings } = useSettings()
  console.log(settings)

  const moveBack = useMoveBack();

  useEffect(() => {
    setconfirmPaid(booking?.isPaid ?? false)
  }, [booking])

  if (isLoading || isLoadingsettings) return <Spinner />

  const {
    id: bookingId,
    guests,
    Totalprice,
    numGuests,
    Hasbreakfast,
    Numnights,
  } = booking;

  const optionalbreakfast = settings.Breakfastprice * Numnights * numGuests
  console.log(optionalbreakfast)
  function handleCheckin() {
    if (!confirmPaid) return
    if (addbreakfast) {
      checkin({
        bookingId,
        breakfast: {
          Hasbreakfast: true,
          extrasPrice: optionalbreakfast,
          Totalprice: Totalprice + optionalbreakfast
        }
      })
    } else {
      checkin({ bookingId, breakfast: {} })
    }
  }



  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {Hasbreakfast && <Box>
        <Checkbox id="breakfast" onChange={() => {
          setaddbreakfast((breakfast) => !breakfast);
          setconfirmPaid(false)
        }}>
          Want to add breakfast for {formatCurrency(optionalbreakfast)}?
        </Checkbox>
      </Box>}

      <Box>
        <Checkbox id='confirm' checked={confirmPaid} disabled={confirmPaid || isCheckingIn} onChange={() => setconfirmPaid((confirm) => !confirm)}>
          I confirm that {guests.Fullname} has paid the total amount of {!addbreakfast ? formatCurrency(Totalprice) : `${formatCurrency(Totalprice + optionalbreakfast)} (${formatCurrency(Totalprice)} + ${formatCurrency(optionalbreakfast)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={() => handleCheckin()}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
