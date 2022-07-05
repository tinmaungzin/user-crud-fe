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
import { useState } from "react";

export default function CreateUser({ users, added, setAdded}) {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("")
  const toggle = () =>{
    setName("")
    setEmail("")
    setEmailError("")
    setModal(!modal);
  }

  const validEmail = (data) => {
    let emails = [];
    for(let i in users){
      emails.push(users[i].email)
    }
    if (emails.includes(data.email)){
      setEmailError("Email is already in use!")
      return false
    }
    return true
  }

  const submitForm = async event => {
    event.preventDefault()
    let data = {
      name,
      email
    }
    if(validEmail(data))
    {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const user = await res.json();
      added += 1;
      if(user) setAdded(added)
      toggle()
    }
    
}

  return (
    <div>
      <Button className="mb-3" color="primary" onClick={() => toggle()}>
        Add New User
      </Button>
      <Modal  className="show" toggle={() => toggle()} isOpen={modal}>
        <form onSubmit={submitForm} autoComplete="off">
          <ModalHeader toggle={() => toggle()}>Create New User</ModalHeader>
          <ModalBody>
            <div>
              <InputGroup>
                <InputGroupText>Name</InputGroupText>
                <Input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
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
