import { useSearchParams } from "react-router-dom"
import Select from "./Select"

function Sortby({ options }) {
  const [searchparam, setSearchparam] = useSearchParams()

  const sortby = searchparam.get('sortby') || "";

  function Handleclick(e) {
    searchparam.set('sortby', e.target.value);
    setSearchparam(searchparam)
  }

  return (
    <Select options={options} type='white' value={sortby} onChange={Handleclick} />


  )
}

export default Sortby
