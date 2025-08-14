import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MenuIcon, XIcon } from "lucide-react";

const testRoutes = [
	{ path: "/", label: "Ana Sayfa" },
	{ path: "/tests/floating-menu", label: "Floating Menu" },
	{
		path: "/tests/floating-menu-vibe-coding",
		label: "Floating Menu Vibe Coding",
	},
	{ path: "/tests/gemini", label: "Gemini" },
	{ path: "/tests/dynamic-width-modal", label: "Dynamic Width Modal" },
	{ path: "/tests/playground", label: "Playground" },
	{ path: "/tests/yeni-sayfa", label: "Yeni Sayfa" },
	{ path: "/tests/magic-emoji", label: "Magic Emoji" },
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
						className="w-64 bg-muted/30 border-r p-4 relative flex flex-col"
					>
						<div className="mb-6">
							<h2 className="text-lg font-semibold">Motion Tests</h2>
							<p className="text-sm text-muted-foreground">Test sayfaları</p>
						</div>

						<nav className="space-y-2 flex-1">
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

						{/* Bottom pinned action */}
						<div className="mt-auto w-full flex justify-center">
							<Button
								variant="ghost"
								className="w-32 justify-start items-center overflow-hidden hover:bg-indigo-500 bg-indigo-500 px-0 hover:scale-110 hover:-rotate-2"
							>
								<div className="relative w-full overflow-hidden">
									<motion.div
										className="flex w-max whitespace-nowrap text-amber-100"
										animate={{ x: ["-50%", "0%"] }}
										transition={{
											duration: 8,
											ease: "linear",
											repeat: Infinity,
										}}
									>
										<div className="flex items-center gap-1 pr-1">
											<Link to="/tests/bagis-modal">Bagis Modal 😂</Link>
											<Link to="/tests/bagis-modal">Bagis Modal 😂</Link>
										</div>
										<div className="flex items-center gap-1 pr-1">
											<Link to="/tests/bagis-modal">Bagis Modal 😂</Link>
											<Link to="/tests/bagis-modal">Bagis Modal 😂</Link>
										</div>
									</motion.div>
								</div>
							</Button>
						</div>

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
