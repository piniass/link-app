import { createContext, useState,useContext } from "react";
import Cookies from 'js-cookie'
import { useEffect } from "react";
import axios from "axios";
import { getLinkRequest, getLinksRequest, createLinkRequest, updateLinkRequest, deleteLinkRequest } from "../api/link";

const LinkContext = createContext()

export const useLinks = () => {
    const context = useContext(LinkContext)
    if(!context){
        throw new Error("useAuth no debe usarse sin un LinkProvider")
    }
    return context;
}

export const LinkProvider = ({children}) => {
    const [link, setLink] = useState([])

    const createLink = async(link) => {
        console.log("link", link)
        try {
            const res = await createLinkRequest(link)

        } catch (error) {
            console.log(error)
        }
    }

    const getLinks = async () => {
        const res = await getLinksRequest();
        setLink(res.data);
      };

    return (
        <LinkContext.Provider
            value={{
                link,
                createLink,
                getLinks
            }}
        >
            {children}
        </LinkContext.Provider>
    )
}