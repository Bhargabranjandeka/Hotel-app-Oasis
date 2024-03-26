import styled from "styled-components";
import Tag from "../../ui/Tag"
import Button from "../../ui/Button"
import { useNavigate } from "react-router-dom";
import CheckoutButton from "../check-in-out/CheckoutButton"
const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ stay }) {
  const { id, status, guests, Numnights } = stay;
  const navigate = useNavigate()
  return <StyledTodayItem>
    {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
    {status === 'checked-in' && <Tag type="blue">Departing</Tag>}
    <Guest>{guests.Fullname}</Guest>
    <div>{Numnights} nights</div>
    {status === 'unconfirmed' && <Button size="small" variation="primary" onClick={() => navigate(`/checkin/${id}`)}>Check-in</Button>}
    {status === 'checked-in' && <CheckoutButton bookingId={id} />}
  </StyledTodayItem>
}

export default TodayItem
