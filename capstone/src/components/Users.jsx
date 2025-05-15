import { useFetchUsersQuery } from "../api/API";
import { useSelector } from "react-redux";
import { getIsAdmin } from "./UserSlice";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
  const { data: users, isLoading, isError } = useFetchUsersQuery();
  const isAdmin = useSelector(getIsAdmin);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <section>
        <h1>Loading users...</h1>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <h1>Error loading users</h1>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section>
        <h1>Access Denied</h1>
        <p>You must be an admin to view this page.</p>
      </section>
    );
  }

  return (
    <>
      <div className="admin-section">
        <h2>Admin Controls</h2>
        <button className="admin-nav-button" onClick={() => navigate("/")}>
          View Products
        </button>
      </div>
      <div className="users-wrapper">
        <h1 className="users-title">Users</h1>
        <div className="users-container">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-info">
                <h3>{user.username}</h3>
                <p>Name: {user.name}</p>
                <p>Address: {user.mailing_address}</p>
                <p>Admin: {user.is_admin ? "Yes" : "No"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Users;
