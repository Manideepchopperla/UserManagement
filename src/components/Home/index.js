import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { BeatLoader } from "react-spinners";

const Home = () => {
  const { users, loading, error, setUsers } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleNext = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredUsers = currentUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>User List</h1>
      <div className="search-cont">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={handleSearch}
          className="search-bar"
        />
        <button onClick={handleSort} className="sort-button">
          Sort by Name ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </button>
      </div>
      {loading ? (
        <div className="main-loader-container">
          <BeatLoader size={30} color="#4A90E2" loading={loading} />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <ul className="user-list">
            {filteredUsers.map((user) => (
              <Link to={`/user/${user.id}`} className="user-link">
              <li key={user.id} className="user-item">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>City:</strong> {user.address.city}</p>
              </li>
              </Link>
            ))}
          </ul>
          <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1} className="prev">
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === Math.ceil(users.length / usersPerPage)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
