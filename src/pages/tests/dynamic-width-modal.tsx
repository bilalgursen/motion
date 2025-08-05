import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import useMeasure from "react-use-measure";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

const DynamicWidthModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [cardRef, { width }] = useMeasure();

	return (
		<>
			<div className="p-8">{width}</div>
			<motion.div className="p-8" layout>
				<LayoutGroup>
					<AnimatePresence mode="popLayout">
						<motion.div
							style={{
								visibility: isOpen ? "hidden" : "visible",
							}}
						>
							<Button
								variant="secondary"
								type="button"
								onClick={() => setIsOpen(true)}
							>
								Open Modal
							</Button>
						</motion.div>

						<motion.div
							style={{
								visibility: isOpen ? "visible" : "hidden",
							}}
						>
							<Card
								ref={cardRef}
								className="w-fit bg-secondary border-none shadow-none"
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
							</Card>
						</motion.div>
					</AnimatePresence>
				</LayoutGroup>
			</motion.div>
		</>
	);
};

export default DynamicWidthModal;
