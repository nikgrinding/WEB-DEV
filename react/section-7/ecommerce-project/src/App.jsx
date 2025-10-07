import { Routes, Route } from 'react-router';
import HomePage from './Pages/HomePage';
import CheckoutPage from './Pages/checkout/CheckoutPage';
import OrdersPage from './Pages/OrdersPage';
import TrackingPage from './Pages/TrackingPage';
import ErrorPage from './Pages/ErrorPage';

export default function App() {
	return (
		<>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path="/checkout" element={<CheckoutPage />} />
				<Route path="/orders" element={<OrdersPage />} />
				<Route path="/tracking" element={<TrackingPage />} />
				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</>
	);
}
