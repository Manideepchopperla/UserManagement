import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import "./App.css";

const UserContext = createContext();

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <Router>
      <UserProvider>
        <div>
          <div className="toggle-btn">
            <button onClick={toggleTheme} className="theme-toggle">
            {theme === "light" ? "Dark" : "Light"} Mode 
            </button>
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:id" element={<UserDetailPage />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
};

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, loading, error, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

const HomePage = () => {
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
            <button onClick={handlePrev} disabled={currentPage===1} className="prev" >
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

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-button">
        Go Back
      </button>

      {loading ? (
        <div className="main-loader-container"> 
        <BeatLoader size={30} color="#4A90E2" loading={loading} /> 
      </div> 
      ) : error ? (
        <p>{error}</p>
      ) : user ? (
        <div className="user-details">
          <h1>{user.name}</h1>
          <p><strong>User Id:</strong> {user.id}</p>
          <p><strong>UserName:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>Website:</strong> {user.website}</p>
        </div>
      ) : (
        <p>No user details found.</p>
      )}
    </div>
  );
};

export default App;