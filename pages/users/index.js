import { Table, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import CreateUser from "./create";
import EditUser from "./edit";
import DeleteUser from "./delete";


export default function userList() {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [added, setAdded] = useState(0); // to track every changes with api so that browser can re-render
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  const prepareUser = async (id) => {
    if (id) {
      setUser({ name: "", email: "" });
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + id);
      const data = await res.json();
      setUser({ id: data.id, name: data.name, email: data.email });
    }
  };

  const editToggle = async (id = null) => {
    if (!editModal) await prepareUser(id);
    setEditModal(!editModal);
  };

  const deleteToggle = async (id = null) => {
    if (!deleteModal) await prepareUser(id);
    setDeleteModal(!deleteModal);
  };

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [added]);

  return (
    <Container className="bg-light border mt-5 pt-5 pb-5">
      <CreateUser users={users} added={added} setAdded={setAdded} />
      <EditUser
        users={users}
        modal={editModal}
        toggle={editToggle}
        user={user}
        added={added}
        setAdded={setAdded}
      />
      <DeleteUser
        modal={deleteModal}
        toggle={deleteToggle}
        user={user}
        added={added}
        setAdded={setAdded}
      />

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <FontAwesomeIcon
                  className="mx-2"
                  icon={faPencil}
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => editToggle(user.id)}
                />
                <FontAwesomeIcon
                  className="mx-2"
                  icon={faTrashCan}
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => deleteToggle(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
