import { createContext, useState,useContext } from "react";
import {createAvatarRequest, getAvatarRequest} from "../api/avatar"
const AvatarContext = createContext()

export const useAvatar = () => {
    const context = useContext(AvatarContext)
    if(!context){
        throw new Error("useAuth no debe usarse sin un AvatarProvider")
    }
    return context;
}

export const AvatarProvider = ({children}) => {
    const [avatar, setAvatar] = useState()
    const createAvatar = async (avatar) => {
        try {
            const res = await createAvatarRequest(avatar);
            setAvatar(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    
    const getAvatar = async (id) => {
        try {
            const res = await getAvatarRequest(id);
            setAvatar(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <AvatarContext.Provider
            value={{
                avatar,
                createAvatar,
                getAvatar
            }}
        >
            {children}
        </AvatarContext.Provider>
    )
}

