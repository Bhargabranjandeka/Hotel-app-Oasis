import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardLayout from "../ui/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";

function Dashboard() {
  return <>
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <DashboardFilter />
    </Row>

    <DashboardLayout />
  </>;
}

export default Dashboard;
