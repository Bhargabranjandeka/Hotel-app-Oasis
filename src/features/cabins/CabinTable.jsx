
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./UseCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";



function CabinTable() {

  const { isLoading, cabins } = useCabins()
  const [searchParam] = useSearchParams()


  if (isLoading) return <Spinner />

  // filtering ///

  const filtervalue = searchParam.get('discount') || 'all';

  let filteredcabins;

  if (filtervalue === 'all') filteredcabins = cabins;
  if (filtervalue === 'with-discount') filteredcabins = cabins.filter((cabin) => cabin.discount > 0)
  if (filtervalue === 'no-discount') filteredcabins = cabins.filter((cabin) => cabin.discount === 0)

  //sorting //

  const sortby = searchParam.get('sortby') || 'startDate-asc'
  const [field, direction] = sortby.split('-')

  const modifier = direction === 'asc' ? 1 : -1
  const sortedcabins = filteredcabins.sort((a, b) => (a[field] - b[field]) * modifier)
  return < Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr' >
    <Table.Header role="table">
      <div></div>
      <div>cabin</div>
      <div>capacity</div>
      <div>price</div>
      <div>discount</div>
      <div></div>
    </Table.Header>

    <Table.Body data={sortedcabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />} />
  </Table >


}

export default CabinTable

