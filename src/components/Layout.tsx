import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MenuIcon, XIcon } from "lucide-react";

const testRoutes = [
	{ path: "/", label: "Ana Sayfa" },
	{ path: "/tests/floating-menu", label: "Floating Menu" },
	{ path: "/tests/gemini", label: "Gemini" },
];

export default function Layout() {
	const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(true);

	return (
		<div className="flex h-screen">
			{/* Sidebar Navigation */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.aside
						initial={{ x: -256, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: -256, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className="w-64 bg-muted/30 border-r p-4 relative"
					>
						<div className="mb-6">
							<h2 className="text-lg font-semibold">Motion Tests</h2>
							<p className="text-sm text-muted-foreground">Test sayfaları</p>
						</div>

						<nav className="space-y-2">
							{testRoutes.map((route) => (
								<Button
									key={route.path}
									variant={
										location.pathname === route.path ? "secondary" : "ghost"
									}
									className={cn(
										"w-full justify-start",
										location.pathname === route.path && "bg-secondary",
									)}
									asChild
								>
									<Link to={route.path}>{route.label}</Link>
								</Button>
							))}
						</nav>

						{/* Close Button */}
						<Button
							variant="ghost"
							size="icon"
							className="absolute top-4 right-4"
							onClick={() => setIsMenuOpen(false)}
						>
							<XIcon className="w-4 h-4" />
						</Button>
					</motion.aside>
				)}
			</AnimatePresence>

			{/* Main Content */}
			<main className="flex-1 overflow-auto relative">
				{/* Menu Toggle Button */}
				{!isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						className="fixed top-4 left-4 z-10"
					>
						<Button
							variant="outline"
							size="icon"
							onClick={() => setIsMenuOpen(true)}
							className="bg-background/80 backdrop-blur-sm"
						>
							<MenuIcon className="w-4 h-4" />
						</Button>
					</motion.div>
				)}

				<Outlet />
			</main>
		</div>
	);
}
