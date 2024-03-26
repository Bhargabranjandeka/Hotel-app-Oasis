import { useDarkmode } from '../Context/context'
import ButtonIcon from '../ui/ButtonIcon'
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"


function DarkmodeToggle() {
  const { isDarkmode, ToggleDarkmode } = useDarkmode()
  return <ButtonIcon onClick={ToggleDarkmode}>
    {isDarkmode ? <HiOutlineSun /> : <HiOutlineMoon />}
  </ButtonIcon>
}

export default DarkmodeToggle
