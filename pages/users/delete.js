import { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";

export default function DeleteUser({modal, toggle, user, added, setAdded}) {
  const [userID, setUserID] = useState("")

  const deleteUser = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+userID, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    added += 1;
    if(res) setAdded(added)
    toggle()
  }

  useEffect(() => {
    setUserID(user.id)
  },[user]);
  return (
    <div>
      <Modal className="show" toggle={() => toggle()} isOpen={modal}>
        <ModalHeader toggle={() => toggle()}>Delete User</ModalHeader>
        <ModalBody>
          Are you sure you want to delete? 
          <br />
          This action cannot be undone.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => deleteUser()}>Delete</Button>{" "}
          <Button onClick={() => toggle()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
