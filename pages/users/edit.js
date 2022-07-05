import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import { useState, useEffect } from "react";

export default function EditUser({
  users,
  modal,
  toggle,
  user,
  added,
  setAdded,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");
  const [emailError, setEmailError] = useState("");

  const validEmail = (data) => {
    for (let i in users) 
    {
      if (users[i].email == data.email) 
      {
        if (users[i].id == userID) return true;
        else {
          setEmailError("Email is already in use!");
          return false;
        }
      }
    }
    return true
  };

  const submitForm = async (event) => {
    event.preventDefault();
    let data = {
      name,
      email,
    };
    if (validEmail(data)) {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + userID, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const user = await res.json();
      added += 1;
      if (user) setAdded(added);
      toggle();
    }
  };

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setUserID(user.id);
    setEmailError("");
  }, [user]);
  return (
    <div>
      <Modal className="show" toggle={() => toggle()} isOpen={modal}>
        <form onSubmit={submitForm} autoComplete="off">
          <ModalHeader toggle={() => toggle()}>Update User</ModalHeader>
          <ModalBody>
            <div>
              <InputGroup>
                <InputGroupText>Name</InputGroupText>
                <Input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    (user.name = setName(event.target.value))
                  }
                  placeholder="eg. Alan Smith"
                  required
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroupText>Email</InputGroupText>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="alansmith@example.com"
                  required
                />
              </InputGroup>
              <span className="text-danger">{emailError}</span>
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Submit</Button>{" "}
            <Button onClick={() => toggle()}>Cancel</Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
