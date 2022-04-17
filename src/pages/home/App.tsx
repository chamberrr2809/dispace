import React from "react";
import { signOut } from "firebase/auth";
import auth from "../../firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        signOut(auth).then(() => {
          navigate("/login", {
            replace: true,
          });
        });
      }}
    >
      Sign Out
    </button>
  );
};

export default Home;
