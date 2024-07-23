import { createContext, useState,useContext } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, editRequest, putImage, getInfo } from "../api/auth";
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
            setError([])
          const token = Cookies.get();
          console.log("Token from cookie: ", token); // Verifica que esto imprima el token correctamente
      
          if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
          }
      
          try {
            const res = await verifyTokenRequest(token);
            console.log("Verify token response: ", res.data);
            if (!res.data) {
              setIsAuthenticated(false);
            } else {
              setIsAuthenticated(true);
              setUser(res.data);
            }
          } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
          } finally {
            setLoading(false);
          }
        };
        checkLogin();
      }, []);
    const signup = async(user) => {
        setError([])
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
            await setProfile()
            // setUser(user)
            setError([])
            setIsAuthenticated(true)
            
        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
            // console.log(error.response.data)
        }
    }

    const editProfile = async(user) => {
        try {
            console.log(user)
            const res = await editRequest(user)
            await setProfile()
        } catch (error) {
            console.log(error)
        }
    }

    const setProfile = async() => {
        try {
            const res = await getInfo()
            console.log(res)
            setUser(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const formImage = async(image) => {
        try {
            console.log("parametro: ",image)
            const res = await putImage(image)
            await setProfile()
            console.log("respuesta: ",res)
        } catch(error) {
            console.log("error: ",error)
        }
    }

    const logout = () => {
        Cookies.remove();
        setUser(null);
        setIsAuthenticated(false);
      };

      const clearErrors = () => {
        setError([]);
      };

    return (
        <AuthContext.Provider 
            value={{ 
                signup,
                signin,
                user,
                formImage,
                setProfile,
                editProfile,
                isAuthenticated,
                error,
                loading,
                logout,
                clearErrors
            }}>
            {children}
        </AuthContext.Provider>
    )
}