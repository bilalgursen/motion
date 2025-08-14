import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { Button } from "../../components/ui/button";
import { FilterIcon, PlusIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";

const buttonTexts = [
	"Veri Ekle",
	"Modül Ekleeeeeee",
	"Dosya Ekle",
	"İçerik Ekleeeeeeeeee",
	"Görev Ekle",
];

export default function FloatingMenuTest() {
	const [textIndex, setTextIndex] = useState(0);
	const [showText, setShowText] = useState(false);

	const handleButtonClick = () => {
		if (!showText) {
			setShowText(true);
		} else {
			setTextIndex((prev) => (prev + 1) % buttonTexts.length);
		}
	};

	return (
		<div className="h-screen">
			<motion.div
				layout
				initial={{
					y: 300,
					filter: "blur(40px)",
				}}
				transition={{
					duration: 0.8,
					type: "spring",
				}}
				animate={{
					y: 0,
					filter: "blur(0px)",
				}}
				whileHover={{
					scale: 1.05,
					transition: {
						duration: 0.2,
					},
				}}
				whileTap={{
					scale: 0.98,
				}}
				className="fixed bottom-15 left-1/2 -translate-x-1/2  h-16  flex items-center justify-center gap-1 "
			>
				<motion.div
					transition={{
						duration: 0.8,
						type: "spring",
					}}
					className="flex items-center gap-1 bg-accent rounded-full p-3 "
				>
					<motion.button
						layoutId="toolbar"
						className="border bg-background rounded-full shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
					>
						<PlusIcon className="w-4 h-4" />
					</motion.button>
					<motion.button
						onClick={handleButtonClick}
						whileTap={{
							transition: {
								duration: 0.3,
								type: "spring",
							},
							scale: 1.05,
						}}
						animate={{
							scale: 1,
						}}
					>
						<Button
							variant="outline"
							className="rounded-full backdrop-blur-lg cursor-pointer hover:bg-transparent border-dashed bg-transparent  border-black"
						>
							<PlusIcon className="w-4 h-4" />
							{showText && (
								<motion.span
									initial={{
										filter: "blur(3px)",
										scale: 0.8,
									}}
									animate={{
										filter: "blur(0px)",
										scale: 1,
									}}
									transition={{
										duration: 0.3,
										type: "spring",
									}}
									className="text-sm"
								>
									{buttonTexts[textIndex]}
								</motion.span>
							)}
						</Button>
					</motion.button>
					<Button variant="outline" className="rounded-full">
						<SettingsIcon className="w-4 h-4" />
						<span className="text-sm">Ayarlar</span>
					</Button>
				</motion.div>

				<motion.div
					initial={{
						scale: 2,
					}}
					animate={{
						scale: 1,
					}}
					transition={{
						duration: 0.8,
						type: "spring",
					}}
					className="flex items-center p-3 gap-1 bg-accent rounded-full"
				>
					<button
						type="button"
						className="border bg-background rounded-full shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
					>
						<FilterIcon className="w-4 h-4" />
					</button>
				</motion.div>
			</motion.div>
		</div>
	);
}
