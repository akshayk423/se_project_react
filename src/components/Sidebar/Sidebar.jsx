import avatar from "../../assets/Avatar.png";
import "./Sidebar.css";

const Sidebar = () => {
  const username = "Terrence Tegegne";

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img src={avatar} alt="user avatar" className="sidebar__avatar" />
        <p className="sidebar__username">{username}</p>
      </div>
    </aside>
  );
};

export default Sidebar;
