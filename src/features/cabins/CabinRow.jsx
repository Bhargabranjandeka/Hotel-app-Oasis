import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import useDeletecabin from "./Deletecabinapi";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./CreateCabinapi";
import Modal from "../../ui/Modal";
import ConfirmDelete from '../../ui/ConfirmDelete'
import Table from "../../ui/Table";


const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {


  const { isDeleting, deleteCabin } = useDeletecabin()
  const { iscreating, creating } = useCreateCabin()
  const { id: cabinsId, name, max_capacity, regular_price, discount, description, image } = cabin;

  function handleduplicate() {
    creating({
      name: `Copy of ${name}`,
      max_capacity,
      regular_price,
      discount,
      description,
      image
    })
  }



  return <>
    <Table.Row role="row">
      <Img src={image}></Img>
      <Cabin>{name}</Cabin>
      <div>fits up to {max_capacity} guests</div>
      <Price>{formatCurrency(regular_price)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
      <div>
        <button disabled={iscreating} onClick={handleduplicate}><HiSquare2Stack /></button>
        <Modal>
          <Modal.Open opens='edit'>
            <button ><HiPencil /></button>
          </Modal.Open>

          <Modal.Window name='edit'>
            <CreateCabinForm cabintoedit={cabin}></CreateCabinForm>
          </Modal.Window>

          <Modal.Open opens='delete'>
            <button><HiTrash /></button>
          </Modal.Open>

          <Modal.Window name='delete'>
            <ConfirmDelete resourceName='cabins' disabled={isDeleting}
              onConfirm={() => deleteCabin(cabinsId)} />
          </Modal.Window>

        </Modal>

      </div>
    </Table.Row>

  </>
}

export default CabinRow;

