import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
const Profile = () => {
  return (
    <section className="profile">
      <Sidebar />
      <ClothesSection />
    </section>
  );
};

export default Profile;
