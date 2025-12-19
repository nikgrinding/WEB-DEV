import "./HomePage.css";
import Header from "../../components/Header.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductsGrid from "./productsGrid.jsx";

export default function HomePage({ cart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("/api/products").then((response) => {
            setProducts(response.data);
        });
    }, []);

    return (
        <>
            <link rel="icon" href="home-favicon.png"></link>
            <title>Ecommerce Project</title>

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    );
}
