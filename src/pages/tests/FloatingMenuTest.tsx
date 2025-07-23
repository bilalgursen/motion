import { motion, MotionConfig, AnimatePresence } from "motion/react";
import { Button } from "../../components/ui/button";
import { FilterIcon, PlusIcon, SettingsIcon } from "lucide-react";
import { useState, useEffect } from "react";

const buttonTexts = [
	"Veri Ekle",
	"Modül Ekleeeeeee",
	"Dosya Ekle",
	"İçerik Ekleeeeeeeeee",
	"Görev Ekle",
];

export default function FloatingMenuTest() {
	const [textIndex, setTextIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setTextIndex((prev) => (prev + 1) % buttonTexts.length);
		}, 3000); // 3 saniyede bir değişir

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="h-screen">
			<div className="p-8">
				<h1 className="text-2xl font-bold mb-4">Floating Menu Test</h1>
				<p className="text-muted-foreground mb-8">
					Animasyonlu floating menu testi
				</p>
			</div>

			<MotionConfig>
				<motion.div
					layout="position"
					initial={{
						y: 300,
						width: "0px",
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
					}}
					className="fixed bottom-15 left-1/2 -translate-x-1/2  h-16  flex items-center justify-center gap-1"
				>
					<motion.div
						layout="position"
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						className="overflow-hidden"
					>
						<div className="flex items-center gap-1 bg-accent rounded-full p-3">
							<Button variant="outline" size="icon" className="rounded-full">
								<PlusIcon className="w-4 h-4" />
							</Button>
							<Button
								variant="outline"
								className="rounded-full border-dashed bg-transparent overflow-hidden border-black"
							>
								<PlusIcon className="w-4 h-4" />
								<span className="text-sm">{buttonTexts[textIndex]}</span>
							</Button>
							<Button variant="outline" className="rounded-full">
								<SettingsIcon className="w-4 h-4" />
								<span className="text-sm">Ayarlar</span>
							</Button>
						</div>
					</motion.div>
					<div className="flex items-center p-3 gap-1 bg-accent rounded-full">
						<Button variant="outline" className="rounded-full">
							<FilterIcon className="w-4 h-4" />
						</Button>
					</div>
				</motion.div>
			</MotionConfig>
		</div>
	);
}
