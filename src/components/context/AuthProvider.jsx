import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import auth from "../firebase/firebaseConfig";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        try {
          const userPayload = { email: currentUser.email };
          await axios.post(
            `${import.meta.env.VITE_API}/jwt`,
            userPayload,
            { withCredentials: true }
          );
        } catch (error) {
          console.error("Error fetching JWT token:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        try {
          await axios.post(
            `${import.meta.env.VITE_API}/logout`,
            {},
            { withCredentials: true }
          );
        } catch (error) {
          console.error("Error during logout:", error);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe(); 
  }, []);

  const register = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Registration Error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        googleSignIn,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
