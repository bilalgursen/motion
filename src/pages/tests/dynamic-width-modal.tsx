import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	motion,
	MotionConfig,
	AnimatePresence,
	LayoutGroup,
} from "motion/react";
import { Textarea } from "@/components/ui/textarea";

const DynamicWidthModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showInput, setShowInput] = useState(false);

	const containerSmooth = {
		giris: {
			opacity: 1,
		},
		animasyon: {
			opacity: 1,
			transition: {
				delayChildren: 0.2,
			},
		},
	};
	const contentSmooth = {
		giris: {
			y: -200,
		},
		animasyon: {
			y: 0,
		},
	};

	return (
		<MotionConfig
			transition={{
				duration: 0.2,
				ease: "linear",
				type: "spring",
				stiffness: 80,
				damping: 20,
			}}
		>
			<div className="p-8  min-h-screen flex justify-center items-center">
				<LayoutGroup>
					<AnimatePresence mode="wait">
						{!isOpen && (
							<motion.button
								key="button"
								layoutId="container"
								variants={containerSmooth}
								initial="giris"
								animate="animasyon"
								exit="cikis"
								style={{
									borderRadius: "10px",
								}}
								onClick={() => setIsOpen(true)}
								className="bg-accent border shadow-xs text-black px-6 py-3 rounded-lg font-medium overflow-hidden"
							>
								<motion.div layoutId="content" variants={contentSmooth}>
									Modal Aç
								</motion.div>
							</motion.button>
						)}
						{isOpen && (
							<motion.div
								layoutId="container"
								key="modal"
								variants={containerSmooth}
								initial="giris"
								animate="animasyon"
								exit="cikis"
								className="bg-accent border shadow-xs overflow-hidden"
								style={{
									borderRadius: "10px",
								}}
							>
								<motion.div
									layout="position"
									layoutId="content"
									variants={contentSmooth}
									className="p-6"
								>
									<CardHeader className="p-0 mb-4">
										<CardTitle>
											<div className="flex justify-between items-center">
												<h2 className="text-xl font-semibold">
													Genişleyen Modal
												</h2>
												<button
													type="button"
													onClick={() => setIsOpen(false)}
													className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
												>
													×
												</button>
											</div>
										</CardTitle>
									</CardHeader>

									<CardContent className="p-0 mb-6">
										<p className="text-gray-600 leading-relaxed">
											Bu modal, butondan doğrudan genişleyerek açılır. Layout
											animasyonu sayesinde smooth bir geçiş yaşanır.
										</p>
										<div className="mt-4 p-4 bg-gray-50 rounded-lg">
											<p className="text-sm text-gray-500">
												Motion'un{" "}
												<code className="bg-white px-2 py-1 rounded">
													layoutId
												</code>{" "}
												özelliği kullanılarak bu efekt elde edildi.
											</p>
										</div>
										<Button
											variant="outline"
											onClick={() => setShowInput((v) => !v)}
										>
											{showInput ? "Gizle" : "Göster"}
										</Button>
										<motion.div
											layout="position"
											layoutId="input"
											className="mt-6 flex items-center gap-3"
										>
											<AnimatePresence mode="wait">
												{showInput && (
													<motion.div
														initial={{ height: 0 }}
														animate={{ height: "auto" }}
														exit={{ height: 0 }}
														transition={{
															type: "tween",
														}}
														className="flex-1 overflow-hidden"
													>
														<Textarea placeholder="Bir şey yazın..." />
													</motion.div>
												)}
											</AnimatePresence>
										</motion.div>
									</CardContent>

									<CardFooter className="p-0 flex gap-3 justify-end">
										<Button variant="outline" onClick={() => setIsOpen(false)}>
											İptal
										</Button>
										<Button className="bg-blue-500 hover:bg-blue-600">
											Kaydet
										</Button>
									</CardFooter>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</LayoutGroup>
			</div>
		</MotionConfig>
	);
};

export default DynamicWidthModal;
