import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { TokenContext } from '../context/TokenContext';

export const AllOrders = createContext();

export default function AllOrdersProvider(props) {
    const { decodedToken } = useContext(TokenContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userid, setUserid] = useState(null);  // Initialize with null
    const [allOrdersNum , setallOrdersNum] = useState(null)
    useEffect(() => {
        // Set userid only if decodedToken is available
        if (decodedToken && decodedToken.id) {
            setUserid(decodedToken.id);
        }
    }, [decodedToken]);

    const headers = {
        token: localStorage.getItem("userToken"),
    };

    const api = userid ? `https://ecommerce.routemisr.com/api/v1/orders/user/${userid}` : null;

    async function getAllOrders() {
        if (!api) return;  // Return early if api is not defined

        try {
            const res = await axios.get(api, { headers });
            setOrders(res);        
            setallOrdersNum(res.data.length);
            console.log(allOrdersNum);
            
                
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (userid) {
            getAllOrders();  // Fetch orders when userid is set
        }
    }, [userid]);

    return (
        <AllOrders.Provider value={{ orders, getAllOrders, loading , allOrdersNum}}>
            {props.children}
        </AllOrders.Provider>
    );
}
