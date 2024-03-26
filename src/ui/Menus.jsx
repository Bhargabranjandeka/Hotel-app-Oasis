import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext()

function Menus({ children }) {
  const [openId, setopenId] = useState('')
  const close = () => setopenId('');
  const open = setopenId;
  return <MenusContext.Provider value={{ close, open, openId }}>
    {children}
  </MenusContext.Provider>
}

function Menu() { }
function Toggle({ id }) {
  const { close, open, openId } = useContext(MenusContext);

  function handleclick() {
    openId === '' || openId !== id ? open(id) : close()
  }

  return <StyledToggle onClick={handleclick}>
    <HiEllipsisVertical />
  </StyledToggle>
}

function List({ id, children }) {
  const { openId } = useContext(MenusContext);
  if (openId !== id) return null;

  return createPortal(<StyledList position={{ x: 20, y: 20 }}>{children}</StyledList>, document.body)
}


function Button({ children }) {
  return <li>
    <StyledButton>
      {children}
    </StyledButton>
  </li>
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List
Menus.Button = Button

export default Menus
