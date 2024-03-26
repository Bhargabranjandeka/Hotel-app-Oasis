import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Sortby from "../../ui/Sortby";

function Cabintableoperations() {
  return <TableOperations>
    <Filter filterfield='discount' options={[
      { value: 'all', label: 'All' },
      { value: 'with-discount', label: 'With discount' },
      { value: 'no-discount', label: 'No-discount' }
    ]} />

    <Sortby options={[
      { value: 'name-asc', label: 'Sort by name (A-Z)' },
      { value: 'name-des', label: 'Sort by name (Z-A)' },
      { value: 'regular_price-asc', label: 'Sort by price (low-high)' },
      { value: 'regular_price-dsc', label: 'Sort by price (high-low)' },
      { value: 'max_capacity-asc', label: 'Sort by capacity (low first)' },
      { value: 'max_capacity-dsc', label: 'Sort by capacity (high first)' }
    ]} />
  </TableOperations>
}

export default Cabintableoperations
