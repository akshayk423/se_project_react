import "./Sidebar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

const Sidebar = () => {
  const { currentUser, handleLogOut, handleEditProfile } =
    useContext(CurrentUserContext);

  const username = currentUser?.name || "Guest";
  const avatar =
    currentUser?.avatar ||
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__user">
          <img src={avatar} alt="user avatar" className="sidebar__avatar" />
          <p className="sidebar__username">{username}</p>
        </div>

        <button
          type="button"
          className="sidebar__edit-profile-btn"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>

        <button
          type="button"
          className="sidebar__logout-btn"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
