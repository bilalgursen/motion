import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import FloatingMenuTest from "./pages/tests/FloatingMenuTest";
import GeminiTest from "./pages/tests/GeminiTest";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="tests/floating-menu" element={<FloatingMenuTest />} />
					<Route path="tests/gemini" element={<GeminiTest />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
