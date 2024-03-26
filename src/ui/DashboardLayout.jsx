import styled from "styled-components"
import { useRecentbookings } from "../features/dashboard/useRecentbookings"
import { useRecentStays } from "../features/dashboard/useRecentstays";
import Stats from "../features/dashboard/Stats";
import Spinner from "../ui/Spinner"
import useCabins from "../features/cabins/UseCabins";
import SalesChart from "../features/dashboard/SalesChart";
import DurationChart from "../features/dashboard/DurationChart";
import TodayActivity from "../features/check-in-out/TodayActivity"


const StyledDashboard = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-template-rows: auto 34rem auto;
gap: 2.4rem;
`

function DashboardLayout() {

  const { isLoading: isLoading1, bookings } = useRecentbookings();
  const { confirmedstays, isLoading: isLoading2, Numdays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins()

  console.log(bookings)
  console.log(`stays`, confirmedstays)

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />

  return <StyledDashboard>
    <Stats bookings={bookings} confirmedstays={confirmedstays} Numdays={Numdays} Cabincount={cabins?.length} />
    <TodayActivity />
    <DurationChart confirmedstays={confirmedstays} />
    <SalesChart bookings={bookings} Numdays={Numdays} />
  </StyledDashboard>
}

export default DashboardLayout
