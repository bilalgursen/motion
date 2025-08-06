import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { motion, MotionConfig, AnimatePresence } from "motion/react";

const DynamicWidthModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<MotionConfig transition={{ duration: 1, ease: "linear" }}>
			<motion.div className="p-8">
				<AnimatePresence>
					{!isOpen && (
						<motion.button
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ width: "500px" }}
							onClick={() => setIsOpen(true)}
							className="bg-secondary text-primary p-3 rounded-lg w-fit"
						>
							Open Modal
						</motion.button>
					)}
					{/* {isOpen && (
						<motion.div
							initial={{ width: "0" }}
							animate={{ width: "auto" }}
							exit={{ opacity: 0 }}
							className="w-fit bg-secondary border-none shadow-none overflow-hidden p-3 rounded-lg"
						>
							<CardHeader>
								<CardTitle>
									<div className="flex justify-between items-center">
										<h2>Dynamic Width Modal</h2>
										<button type="button" onClick={() => setIsOpen(false)}>
											×
										</button>
									</div>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p>Bu modal tıklandığında belirli bir genişliğe açılır.</p>
							</CardContent>

							<CardFooter className="flex gap-2">
								<Button type="button" onClick={() => setIsOpen(false)}>
									İptal
								</Button>
								<Button type="button">Kaydet</Button>
							</CardFooter>
						</motion.div>
					)} */}
				</AnimatePresence>
			</motion.div>
		</MotionConfig>
	);
};

export default DynamicWidthModal;
