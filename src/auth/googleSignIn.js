import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebaseConfig"; // Ensure correct relative path

const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User Info:", user); // Handle signed-in user details
    return user; // Return user for further use
  } catch (error) {
    console.error("Error during Google sign-in:", error.message);
    throw error; // Handle error in calling component
  }
};

export default googleSignIn;
