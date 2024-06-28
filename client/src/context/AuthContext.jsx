import { createContext, useState,useContext } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookie'
import { useEffect } from "react";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth no debe usarse sin un AuthProvider")
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const checkLogin = async () => {
          const cookies = Cookies.get();
          if (!cookies.token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
          }
    
          try {
            const res = await verifyTokenRequest(cookies.token);
            if (!res.data) return setIsAuthenticated(false);
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
          } catch (error) {
            console.log(error)
            setIsAuthenticated(false);
            setLoading(false);
          }
        };
        checkLogin();
      }, []);
    const signup = async(user) => {
        try {
            const res = await registerRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            setError(error.response.data)
        }
        
    }

    const signin = async(user) => {
        try {
            const res = await loginRequest(user)
            setUser(user)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
            // setError(error.response.data)
            // console.log(error.response.data)
        }
    }

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
      };

    return (
        <AuthContext.Provider 
            value={{ 
                signup,
                signin,
                user,
                isAuthenticated,
                error,
                loading,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    )
}