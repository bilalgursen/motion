import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { Button } from "../../components/ui/button";
import { FilterIcon, PlusIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";
import useMeasure from "react-use-measure";

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
	const [ref, bounds] = useMeasure();

	const handleButtonClick = () => {
		if (!showText) {
			setShowText(true);
		} else {
			setTextIndex((prev) => (prev + 1) % buttonTexts.length);
		}
	};

	return (
		<div className="h-screen">
			<div className="p-8">
				<h1 className="text-2xl font-bold mb-4">Floating Menu Test</h1>
				<p className="text-muted-foreground mb-8">
					Animasyonlu floating menu testi
				</p>
				<div className="mb-4 p-4 bg-muted rounded-lg">
					<h3 className="font-semibold mb-2">Element Boyutları:</h3>
					<p>Genişlik: {Math.round(bounds.width)}px</p>
					<p>Yükseklik: {Math.round(bounds.height)}px</p>
					<p>Top: {Math.round(bounds.top)}px</p>
					<p>Left: {Math.round(bounds.left)}px</p>
				</div>
			</div>

			<MotionConfig
				transition={{
					duration: 1,
					type: "spring",
				}}
			>
				<motion.div
					layout="position"
					initial={{
						y: 300,
						filter: "blur(40px)",
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
					className="fixed bottom-15 left-1/2 -translate-x-1/2  h-16  flex items-center justify-center gap-1"
				>
					<motion.div
						initial={{
							width: "0px",
						}}
						animate={{
							width: "auto",
						}}
					>
						<motion.div
							key={buttonTexts[textIndex]}
							initial={{
								width: bounds.width,
							}}
							animate={{
								width: "auto",
							}}
							ref={ref}
							className="flex items-center gap-1 bg-red-500 rounded-full p-3"
						>
							<motion.button className="border bg-background rounded-full shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3">
								<PlusIcon className="w-4 h-4" />
							</motion.button>
							<motion.div
								whileTap={{
									transition: {
										duration: 0.3,
										type: "spring",
									},
									scale: 0.9,
								}}
								animate={{
									scale: 1,
								}}
								className=""
							>
								<Button
									variant="outline"
									className="rounded-full cursor-pointer border-dashed bg-transparent  border-black"
									onClick={handleButtonClick}
								>
									<PlusIcon className="w-4 h-4" />
									{showText && (
										<AnimatePresence key={buttonTexts[textIndex]}>
											<motion.span
												initial={{
													filter: "blur(2px)",
												}}
												animate={{
													filter: "blur(0px)",
												}}
												className="text-sm"
											>
												{buttonTexts[textIndex]}
											</motion.span>
										</AnimatePresence>
									)}
								</Button>
							</motion.div>
							<Button variant="outline" className="rounded-full">
								<SettingsIcon className="w-4 h-4" />
								<span className="text-sm">Ayarlar</span>
							</Button>
						</motion.div>
					</motion.div>
					<div className="flex items-center p-3 gap-1 bg-accent rounded-full">
						<motion.button className="border bg-background rounded-full shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3">
							<FilterIcon className="w-4 h-4" />
						</motion.button>
					</div>
				</motion.div>
			</MotionConfig>
		</div>
	);
}
