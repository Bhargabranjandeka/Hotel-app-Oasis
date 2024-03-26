import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import Addcabin from "../features/cabins/Addcabin";
import Cabintableoperations from "../features/cabins/Cabintableoperations";

function Cabins() {
  const [showform, setform] = useState(false)

  return <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <Cabintableoperations />
    </Row>

    <Row>
      <CabinTable />
      <Addcabin />
    </Row>
  </>;
}

export default Cabins;
