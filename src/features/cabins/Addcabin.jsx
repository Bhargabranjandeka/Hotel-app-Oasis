import Button from "../../ui/Button"
import CreateCabinForm from "./CreateCabinForm"
import Modal from "../../ui/Modal"


function Addcabin() {

  return <div>
    <Modal>

      <Modal.Open opens='cabin-form'>
        <Button>Add Cabin</Button>
      </Modal.Open>

      <Modal.Window name='cabin-form'>
        <CreateCabinForm />
      </Modal.Window>





      {/*<Button onClick={() => { setmodal((showmodal) => !showmodal) }}>Add Cabin</Button>
     {showmodal && <Modal onClose={() => setmodal(!showmodal)}>
      <CreateCabinForm onClosemodal={() => setmodal(!showmodal)} />
     </Modal>}*/}

    </Modal>
  </div>

}

export default Addcabin
