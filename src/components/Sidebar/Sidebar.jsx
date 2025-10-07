import avatar from "../../assets/Avatar.png";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const username = "Terrence Tegegne";
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__user">
          <img src={avatar} alt="user avatar" className="sidebar__avatar" />
          <p className="sidebar__username">{username}</p>
        </div>

        <button
          type="button"
          className="sidebar__back-home-btn"
          onClick={() => navigate("/")}
        >
          Back Home
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
