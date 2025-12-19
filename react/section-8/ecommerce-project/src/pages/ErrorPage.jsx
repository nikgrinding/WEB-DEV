import Header from "../components/Header";
import "./ErrorPage.css";

export default function ErrorPage({ cart }) {
    return (
        <>
            <title>404 - Page Not Found</title>
            <Header cart={cart} />
            <div className="error-message">404 - Page Not Found</div>
        </>
    );
}
