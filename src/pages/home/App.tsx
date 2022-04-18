import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase";

const login = () => {
  signInWithEmailAndPassword(auth, "test@test.com", "password");
};
const logout = () => {
  signOut(auth);
};

const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <p>Current User: {user.email}</p>
        <button onClick={logout}>Log out</button>
      </div>
    );
  }
  return <button onClick={login}>Log in</button>;
};

export default Home;
