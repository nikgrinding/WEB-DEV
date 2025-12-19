import "./TrackingPage.css";
import Header from "../components/Header";
import { Link, useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function TrackingPage({ cart }) {
    const params = useParams();
    const [order, setOrder] = useState(null);
    const { orderId, productId } = params;
    useEffect(() => {
        const loadTrackingPage = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        };
        loadTrackingPage();
    }, [orderId]);
    if (!order) {
        return null;
    }
    const matchingProduct = order.products.find((orderProduct) => {
        return orderProduct.productId === productId;
    });
    const totalDeliveryTimeMs = matchingProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
    let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
    let deliveryStatusMessage = "Arriving on";
    if (deliveryPercent >= 100) {
        deliveryPercent = 100;
        deliveryStatusMessage = "Delivered on";
    }
    let isPreparing = "";
    let isShipped = "";
    let isDelivered = "";
    if (deliveryPercent < 33) {
        isPreparing = deliveryPercent;
    } else if (deliveryPercent < 100) {
        isShipped = deliveryPercent;
    } else {
        isDelivered = deliveryPercent;
    }
    return (
        <>
            <link rel="icon" href="tracking-favicon.png"></link>
            <title>Tracking</title>

            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {deliveryStatusMessage} {dayjs(matchingProduct.estimatedDeliveryTimeMs).format("MMMM D")}
                    </div>

                    <div className="product-info">{matchingProduct.product.name}</div>

                    <div className="product-info">Quantity: {matchingProduct.quantity}</div>

                    <img className="product-image" src={matchingProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing && "current-status"}`}>Preparing</div>
                        <div className={`progress-label ${isShipped && "current-status"}`}>Shipped</div>
                        <div className={`progress-label ${isDelivered && "current-status"}`}>Delivered</div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${deliveryPercent}%` }}></div>
                    </div>
                </div>
            </div>
        </>
    );
}
