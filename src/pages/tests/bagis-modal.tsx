import { useEffect, useRef, useState } from "react";

const SOUND_URL = "/ses.mp3"; // public/ses.mp3 için uygulama yolu
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
import { Input } from "@/components/ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const BagisModal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [showInput, setShowInput] = useState(false);
	const [showImage, setShowImage] = useState(false);
	const [amount, setAmount] = useState<number | null>(null);
	const [customInput, setCustomInput] = useState("");
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const presetAmounts = [10, 20, 50, 100, 250];

	useEffect(() => {
		audioRef.current = new Audio(SOUND_URL);
		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current.src = "";
				audioRef.current = null;
			}
		};
	}, []);

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
								className="bg-amber-50 border shadow-xs text-black px-6 py-3 rounded-lg font-medium overflow-hidden"
							>
								<motion.div layoutId="content" variants={contentSmooth}>
									Bağış Yap
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
								className="bg-amber-50 border shadow-xs overflow-hidden relative"
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
												<h2 className="text-2xl text-center font-semibold">
													Abdullah için Bağış Kutusu
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
											Yapacağınız bağışınızın kendinize değil, Abdullah'a
											ulaşmasını istiyoruz.
										</p>

										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Button
														variant="outline"
														onClick={() => setShowInput((v) => !v)}
														className="relative group border-dashed hover:rotate-1 hover:scale-[1.02] transition-transform"
													>
														<motion.span
															animate={{ rotate: showInput ? 0 : 0 }}
															transition={{
																type: "spring",
																stiffness: 400,
																damping: 15,
															}}
															className="flex items-center gap-2"
														>
															<span className="text-lg">
																{showInput ? "🤫" : "😂"}
															</span>
															<span>
																{showInput ? "Notu Gizle" : "Notu Göster"}
															</span>
														</motion.span>
														<span className="pointer-events-none absolute -left-2 -top-2 select-none">
															🎉
														</span>
														<span className="pointer-events-none absolute -right-2 -bottom-2 select-none animate-bounce">
															📝
														</span>
													</Button>
												</TooltipTrigger>
												<TooltipContent side="top">
													Korkma yaz, emoji serbest 😎
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
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
														<Textarea placeholder="Bağış notunuzu yazın... (emoji serbest)" />
													</motion.div>
												)}
											</AnimatePresence>
										</motion.div>

										<div className="mt-6">
											<div className="text-sm font-medium">Bağış Tutarı</div>
											<div className="mt-2 flex flex-wrap items-center gap-2">
												{presetAmounts.map((amt) => (
													<Button
														key={amt}
														variant={amount === amt ? "default" : "outline"}
														size="sm"
														onClick={() => {
															setAmount(amt);
															setCustomInput("");
														}}
													>
														₺{amt}
													</Button>
												))}
												<div className="flex items-center gap-2 ml-1">
													<span className="text-sm text-gray-500">Özel:</span>
													<Input
														type="number"
														inputMode="numeric"
														min={1}
														placeholder="₺"
														value={customInput}
														onChange={(e) => {
															const val = e.target.value;
															setCustomInput(val);
															const n = parseInt(val, 10);
															setAmount(Number.isFinite(n) && n > 0 ? n : null);
														}}
														className="w-24 h-9"
													/>
												</div>
											</div>
											{amount ? (
												<p className="mt-1 text-sm text-gray-600">
													Seçili: ₺{amount}
												</p>
											) : (
												<p className="mt-1 text-sm text-gray-500">
													Tutar seçmeden bağış yapamazsın 😅
												</p>
											)}
										</div>
									</CardContent>

									<CardFooter className="p-0 flex gap-3 justify-end">
										<Button variant="outline" onClick={() => setIsOpen(false)}>
											Vazgeç
										</Button>
										<Button
											className="bg-blue-500 hover:bg-blue-600"
											disabled={!amount || amount <= 0}
											onClick={() => {
												if (audioRef.current) {
													audioRef.current.currentTime = 0;
													audioRef.current.play().catch(() => {});
												}
												setShowImage(true);
												setTimeout(() => {
													setIsOpen(false);
													setShowInput(false);
													setAmount(null);
													setCustomInput("");
												}, 7000);
											}}
										>
											Bağışla{amount ? ` ₺${amount}` : ""}
										</Button>
									</CardFooter>
									<AnimatePresence>
										{showImage && (
											<motion.img
												initial={{ y: 500, x: -100 }}
												animate={{ y: 0, x: 0 }}
												exit={{ y: 500, x: -100 }}
												whileHover={{
													scale: 1.2,
													rotate: 2,
													transition: {
														type: "spring",
														stiffness: 800,
														damping: 1,
													},
												}}
												layoutId="image"
												className="flex absolute bottom-0 left-0 right-0 justify-center items-center w-56 h-56 object-cover"
												src="/abdullah.png"
												alt="Bağış"
											></motion.img>
										)}
									</AnimatePresence>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>
				</LayoutGroup>
			</div>
		</MotionConfig>
	);
};

export default BagisModal;
