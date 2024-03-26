import Stat from '../dashboard/Stat'
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2"
import { formatCurrency } from '../../utils/helpers';
function Stats({ bookings, confirmedstays, Numdays, Cabincount }) {

  const Numlength = bookings?.length

  const sales = bookings?.reduce((acc, cur) => acc + cur.Totalprice, 0);
  const checkins = confirmedstays?.length;
  const occupancy = confirmedstays?.reduce((acc, cur) => acc + cur.Numnights, 0) / (Numdays * Cabincount)
  console.log(Numlength)
  return <>
    <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={Numlength} />
    <Stat title="Sales" color="green" icon={<HiOutlineBanknotes />} value={formatCurrency(sales)} />
    <Stat title="Check-ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkins} />
    <Stat title="Occupancy Rate" color="yellow" icon={<HiOutlineChartBar />} value={Math.round(occupancy * 100) + "%"} />

  </>
}

export default Stats
