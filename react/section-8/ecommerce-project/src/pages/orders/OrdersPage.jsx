import "./OrdersPage.css";
import Header from "../../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import OrdersGrid from "./OrdersGrid";

export default function OrdersPage({ cart, loadCart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrdersPage = async () => {
            const response = await axios.get("/api/orders?expand=products");
            setOrders(response.data);
        };
        fetchOrdersPage();
    }, []);
    return (
        <>
            <link rel="icon" href="orders-favicon.png"></link>
            <title>Orders</title>

            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} loadCart={loadCart} />
            </div>
        </>
    );
}
