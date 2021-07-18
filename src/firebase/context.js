import React, { useEffect, useState } from "react";
import app from "./firebase";
import firebaseConfig from "./firebase";



export const FirebaseContext = React.createContext();


/*export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};*/
