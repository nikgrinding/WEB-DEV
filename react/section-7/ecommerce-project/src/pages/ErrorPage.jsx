import Header from "../components/Header";
import "./ErrorPage.css";

export default function ErrorPage() {
    return (
        <>
            <title>404 - Page Not Found</title>
            <Header />
            <div className="error-message">404 - Page Not Found</div>
        </>
    );
}
