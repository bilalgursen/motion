import "./index.css";

import { motion, MotionConfig, AnimatePresence } from "motion/react";
import { Button } from "./components/ui/button";
import { FilterIcon, PlusIcon, SettingsIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function App() {
	const [buttonText, setButtonText] = useState("Veri Ekle");

	useEffect(() => {
		const interval = setInterval(() => {
			setButtonText((prev) =>
				prev === "Veri Ekle" ? "Modül Ekle" : "Veri Ekle",
			);
		}, 1000); // 3 saniyede bir değişir

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="h-screen">
			<MotionConfig
				transition={{
					duration: 1,
					type: "spring",
				}}
			>
				<motion.div
					initial={{
						width: "0px",
						y: 300,
						filter: "blur(40px)",
					}}
					animate={{
						width: "auto",
						y: 0,
						filter: "blur(0px)",
					}}
					transition={{
						duration: 1,
						type: "spring",
						bounce: 0,
					}}
					className="fixed bottom-15 left-1/2  -translate-x-1/2  h-16  flex items-center justify-center gap-1"
				>
					<AnimatePresence mode="popLayout">
						<motion.div
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
							}}
							className="flex items-center p-3 gap-1 bg-accent rounded-full"
						>
							<Button variant="outline" size="icon" className="rounded-full">
								<PlusIcon className="w-4 h-4" />
							</Button>
							<Button
								variant="outline"
								className="rounded-full border-dashed bg-transparent border-black"
							>
								<PlusIcon className="w-4 h-4" />
								<motion.span
									key={buttonText}
									initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
									animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
									exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
									transition={{ duration: 0.5, type: "spring", bounce: 0 }}
									className="text-sm"
								>
									{buttonText}
								</motion.span>
							</Button>
							<Button variant="outline" className="rounded-full">
								<SettingsIcon className="w-4 h-4" />
								<span className="text-sm">Ayarlar</span>
							</Button>
						</motion.div>
					</AnimatePresence>
					<motion.div
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						className="flex items-center p-3 gap-1 bg-accent rounded-full"
					>
						<Button variant="outline" className="rounded-full">
							<FilterIcon className="w-4 h-4" />
						</Button>
					</motion.div>
				</motion.div>
			</MotionConfig>
		</div>
	);
}
