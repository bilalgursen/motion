import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/home-page";
import FloatingMenuTest from "./pages/tests/floating-menu-test";
import GeminiTest from "./pages/tests/gemini-test";
import FloatingVibeCoding from "./pages/tests/floating-vibe-coding";
import DynamicWidthModal from "./pages/tests/dynamic-width-modal";
import Playground from "./pages/tests/playground";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="tests/floating-menu" element={<FloatingMenuTest />} />
					<Route path="tests/gemini" element={<GeminiTest />} />
					<Route
						path="tests/floating-menu-vibe-coding"
						element={<FloatingVibeCoding />}
					/>
					<Route
						path="tests/dynamic-width-modal"
						element={<DynamicWidthModal />}
					/>
					<Route path="tests/playground" element={<Playground />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
