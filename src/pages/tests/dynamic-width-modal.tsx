import { useState } from "react";

import {
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { motion, MotionConfig, AnimatePresence } from "motion/react";
import { IoIosClose, IoIosOpen } from "react-icons/io";
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
		},
	};
	const contentSmooth = {
		giris: {
			y: 80,
		},
		animasyon: {
			y: 0,
		},
	};

	return (
		<MotionConfig
			transition={{
				duration: 0.1,
				ease: "linear",
				type: "spring",
				stiffness: 90,
				damping: 20,
			}}
		>
			<div className="p-8  min-h-screen flex justify-center items-center">
				<motion.div layout="position">
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
							className="bg-accent flex items-center gap-2 shadow-xs text-black px-6 py-3 rounded-lg font-medium overflow-hidden"
						>
							<motion.div
								layout="position"
								layoutId="button"
								variants={contentSmooth}
								className="flex items-center gap-2"
							>
								Modal Aç
							</motion.div>
							<motion.div
								layout="position"
								layoutId="icon"
								variants={contentSmooth}
							>
								<IoIosOpen />
							</motion.div>
						</motion.button>
					)}
					{isOpen && (
						<motion.div
							key="modal"
							layoutId="container"
							variants={containerSmooth}
							initial="giris"
							animate="animasyon"
							exit="cikis"
							className="bg-accent  shadow-xs overflow-hidden"
							style={{
								borderRadius: "10px",
							}}
						>
							<AnimatePresence>
								<motion.div layout="position" variants={contentSmooth}>
									<CardHeader className="p-6 mb-4">
										<CardTitle>
											<div className="flex justify-between items-center">
												<motion.div layout="position" layoutId="button">
													Modal Açıldı
												</motion.div>

												<motion.div
													layout="position"
													layoutId="icon"
													variants={contentSmooth}
													className="text-4xl"
													onClick={() => setIsOpen(false)}
												>
													<IoIosClose />
												</motion.div>
											</div>
										</CardTitle>
									</CardHeader>

									<CardContent className="p-6 mb-6">
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
										<motion.div
											layout="position"
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
									<CardFooter className="flex items-bottom gap-3 p-0 px-6">
										<motion.div
											className=" w-full px-4 flex items-center justify-center rounded-t-lg"
											onClick={() => setShowInput((v) => !v)}
										>
											{
												<motion.button
													layout={false}
													className="bg-white"
													animate={{ width: showInput ? 288 : 128 }}
												>
													<span className="block text-center w-full">
														{showInput ? "Göster" : "Gizle"}
													</span>
												</motion.button>
											}
										</motion.div>
									</CardFooter>
								</motion.div>
							</AnimatePresence>
						</motion.div>
					)}
				</motion.div>
			</div>
		</MotionConfig>
	);
};

export default DynamicWidthModal;
