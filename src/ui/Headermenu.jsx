import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import Logout from "../features/authentication/logout";
import { useNavigate } from "react-router-dom";
import DarkmodeToggle from "./DarkmodeToggle";
import { useUser } from "../features/authentication/useUser";

const Styleheadermenu = styled.ul`
display: flex;
gap: 0.4rem;
`;

const Styledlist = styled.li`
  display: flex;
  align-items: center;
`

function Headermenu() {
  const navigate = useNavigate()
  const { isAuthenticated } = useUser()

  return <Styleheadermenu>
    {isAuthenticated && <Styledlist>
      <ButtonIcon onClick={() => navigate("/account")}>
        <HiOutlineUser />
      </ButtonIcon>
    </Styledlist>}
    <Styledlist>
      <DarkmodeToggle />
    </Styledlist>
    <Styledlist>
      <Logout />
      {isAuthenticated ? 'Logout' : 'Login'}
    </Styledlist>
  </Styleheadermenu>
}

export default Headermenu
