import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [filterusers, setFilterusers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "", age: "", city: "" });

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      setUsers(response.data);
      setFilterusers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  //Search Function
  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchText) ||
        user.city.toLowerCase().includes(searchText)
    );
    setFilterusers(filteredUsers);
  };

  //Delete User Function
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/users/${id}`
        );
        setUsers(response.data);
        setFilterusers(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  //Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //Add User Details
  const handleAddRecord = () => {
    setUserData({ name: "", age: "", city: "" });
    setIsModalOpen(true);
  };

  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData.id) {
        const response = await axios.patch(
          `http://localhost:8000/api/users/${userData.id}`,
          userData
        );
        setUsers(response.data);
        setFilterusers(response.data);
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/users",
          userData
        );
        setUsers(response.data);
        setFilterusers(response.data);
      }
    } catch (error) {
      console.error(error);
    }
    closeModal();
    setUserData({ name: "", age: "", city: "" });
  };

  //Update User Function
  const handleUpdateRecord = (user) => {
    setUserData(user);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="container" style={{ userSelect: "none" }}>
        <h3>CRUD Application with React.js Frontend and Node.js Backend</h3>
        <div className="input-search">
          <input
            type="search"
            placeholder="Search Text here"
            onChange={handleSearchChange}
          />
          <button className="btn green" id="A1" onClick={handleAddRecord}>
            Add Record
          </button>
        </div>
        <table className="table" style={{ userSelect: "none" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterusers &&
              filterusers.map((user, index) => {
                return (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td>
                      <button
                        className="btn green "
                        onClick={() => handleUpdateRecord(user)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn red"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;{" "}
              </span>
              <h2>{userData.id ? "Update Record" : "Add Record"} </h2>
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  value={userData.name}
                  name="name"
                  id="name"
                  onChange={handleData}
                />
              </div>

              <div className="input-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  value={userData.age}
                  name="age"
                  id="age"
                  onChange={handleData}
                />
              </div>

              <div className="input-group">
                <label htmlFor="">City</label>
                <input
                  type="text"
                  value={userData.city}
                  name="city"
                  id="city"
                  onChange={handleData}
                />
              </div>

              <button className="btn green" onClick={handleSubmit}>
                {userData.id ? "Update User" : "Add User"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
