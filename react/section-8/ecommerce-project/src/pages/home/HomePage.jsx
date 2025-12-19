import "./HomePage.css";
import Header from "../../components/Header.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductsGrid from "./productsGrid.jsx";

export default function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getHomeData() {
            const response = await axios.get("/api/products");
            setProducts(response.data);
        }
        getHomeData();
    }, []);

    return (
        <>
            <link rel="icon" href="home-favicon.png"></link>
            <title>Ecommerce Project</title>

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}
