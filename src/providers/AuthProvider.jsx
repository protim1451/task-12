import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { createContext, useState } from "react";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }


    const authInfo = {
        user,
        loading,
        googleProvider,
        createUser,
    }

    return (
       <AuthContext.Provider>
            {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;