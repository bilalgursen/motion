// Motion kütüphanesinden animasyon için gerekli fonksiyon ve tipler içe aktarılıyor
import {
	AnimatePresence,
	motion,
	MotionConfig,
	type Variants,
	useMotionValue,
	useTransform,
	useMotionValueEvent,
	animate,
	useReducedMotion,
} from "motion/react";
import { Button } from "../../components/ui/button";
import { FilterIcon, PlusIcon, SettingsIcon, XIcon } from "lucide-react";
import { useState, useEffect } from "react";
import useMeasure from "react-use-measure";

// Kullanıcıya gösterilecek buton metinleri
const buttonTexts = [
	"Veri Ekle",
	"Modül Ekleeeeeee",
	"Dosya Ekle",
	"İçerik Ekleeeeeeeeee",
	"Görev Ekle",
];

// Menü konteyneri için animasyon variantları (giriş/çıkış ve çocuk animasyonları)
const containerVariants: Variants = {
	hidden: {
		y: 300,
		filter: "blur(40px)",
	},
	visible: {
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.8,
			type: "spring",
			stiffness: 300,
			damping: 25,
			// Parent-children orchestration
			delayChildren: 0.2,
			staggerChildren: 0.1,
		},
	},
};

// Menü içeriği için animasyon variantları (opacity, scale ve çocukların sıralı animasyonu)
const contentVariants: Variants = {
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.4,
			type: "spring",
			stiffness: 400,
			damping: 20,
			// Stagger menu items
			delayChildren: 0.1,
			staggerChildren: 0.05,
		},
	},
	hidden: {
		opacity: 0,
		scale: 0.8,
		transition: {
			duration: 0.3,
			// Stagger exit animations backwards
			staggerChildren: 0.05,
			staggerDirection: -1,
		},
	},
};

// Ayarlar kartı içeriği için animasyon variantları
const cardContentVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.5,
			type: "spring",
			stiffness: 300,
			damping: 25,
			// Stagger card elements
			delayChildren: 0.4,
			staggerChildren: 0.1,
		},
	},
	exit: {
		opacity: 0,
		y: 20,
		scale: 0.95,
		transition: {
			duration: 0.2,
		},
	},
};

// Butonlar için mikro etkileşimli animasyon variantları
const buttonVariants: Variants = {
	initial: {
		scale: 1,
		y: 0,
	},
	hover: {
		scale: 1.05,
		y: -2,
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 10,
		},
	},
	tap: {
		scale: 0.95,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 600,
			damping: 15,
		},
	},
};

// Ana buton için animasyon variantları
const mainButtonVariants: Variants = {
	initial: {
		scale: 1,
		rotateZ: 0,
	},
	hover: {
		scale: 1.02,
		rotateZ: 1,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20,
		},
	},
	tap: {
		scale: 1.05,
		rotateZ: 5,
		transition: {
			duration: 0.2,
			type: "spring",
			stiffness: 600,
			damping: 10,
		},
	},
};

// Buton metni için animasyon variantları
const textVariants: Variants = {
	hidden: {
		filter: "blur(3px)",
		scale: 0.8,
		x: -10,
	},
	visible: {
		filter: "blur(0px)",
		scale: 1,
		x: 0,
		transition: {
			duration: 0.3,
			type: "spring",
			stiffness: 400,
			damping: 25,
		},
	},
};

// Menüdeki her bir item için animasyon variantları
const menuItemVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.8,
		y: 20,
	},
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20,
		},
	},
};

// Kart içindeki elementler için animasyon variantları
const cardElementVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 10,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 25,
		},
	},
};

// Ana component: FloatingVibeCoding
// Gelişmiş animasyonlu, ayarlanabilir, erişilebilir floating menü örneği
export default function FloatingVibeCoding() {
	// Buton metni için index state'i
	const [textIndex, setTextIndex] = useState(0);
	// Buton metni gösterilsin mi?
	const [showText, setShowText] = useState(false);
	// Ayarlar menüsü açık mı?
	const [settingsOpen, setSettingsOpen] = useState(false);
	// Ayarlar içeriği gösterilsin mi?
	const [showContent, setShowContent] = useState(true);
	// Menü boyutunu ölçmek için referans
	const [ref, bounds] = useMeasure();

	// Kullanıcının erişilebilirlik (reduced motion) tercihini al
	const shouldReduceMotion = useReducedMotion();

	// Animasyon ilerlemesini tutan motion value
	const progress = useMotionValue(0);

	// Animasyonlu genişlik, yükseklik, padding, border-radius ve gap değerleri
	const width = useTransform(progress, [0, 1], ["auto", "24rem"]);
	const height = useTransform(progress, [0, 1], ["4rem", "20rem"]);
	const padding = useTransform(progress, [0, 1], ["0rem", "1.5rem"]);
	const borderRadius = useTransform(progress, [0, 1], ["2rem", "1rem"]);
	const gap = useTransform(progress, [0, 1], ["0.25rem", "0rem"]);

	// Ayarlar butonuna tıklanınca aç/kapa işlemi
	const handleSettingsClick = () => {
		if (settingsOpen) {
			setShowContent(false);
			setTimeout(
				() => {
					setSettingsOpen(false);
				},
				shouldReduceMotion ? 50 : 200,
			);
		} else {
			setSettingsOpen(true);
		}
	};

	// Ayarlar açıldığında animasyon ilerlemesini dinle, içerik zamanlamasını ayarla
	useMotionValueEvent(progress, "change", (latest) => {
		if (settingsOpen && latest > 0.5 && !showContent) {
			setShowContent(true);
		}
	});

	// Ayarlar açılıp kapanırken animasyonu başlat
	useEffect(() => {
		if (settingsOpen) {
			animate(progress, 1, {
				duration: shouldReduceMotion ? 0.3 : 0.6,
				type: shouldReduceMotion ? "tween" : "spring",
				ease: shouldReduceMotion ? "easeInOut" : undefined,
				stiffness: shouldReduceMotion ? undefined : 300,
				damping: shouldReduceMotion ? undefined : 30,
			});
		} else {
			animate(progress, 0, {
				duration: shouldReduceMotion ? 0.3 : 0.6,
				type: shouldReduceMotion ? "tween" : "spring",
				ease: shouldReduceMotion ? "easeInOut" : undefined,
				stiffness: shouldReduceMotion ? undefined : 300,
				damping: shouldReduceMotion ? undefined : 30,
			}).then(() => {
				setShowContent(true);
			});
		}
	}, [settingsOpen, progress, shouldReduceMotion]);

	// Ana butona tıklanınca metni göster veya sıradaki metne geç
	const handleButtonClick = () => {
		if (!showText) {
			setShowText(true);
		} else {
			setTextIndex((prev) => (prev + 1) % buttonTexts.length);
		}
	};

	// Render: Menü ve ayarlar kartı
	return (
		<div className="h-screen">
			{/* Başlık ve açıklama alanı */}
			<div className="p-8">
				<h1 className="text-2xl font-bold mb-4">Floating Menu Test</h1>
				<p className="text-muted-foreground mb-8">
					Animasyonlu floating menu testi - Advanced Motion patterns
				</p>
				<div className="mb-4 p-4 bg-muted rounded-lg">
					<h3 className="font-semibold mb-2">Element Boyutları:</h3>
					<p>Genişlik: {Math.round(bounds.width)}px</p>
					<p>Yükseklik: {Math.round(bounds.height)}px</p>
					<p>Reduced Motion: {shouldReduceMotion ? "Aktif" : "İnaktif"}</p>
				</div>
			</div>
			<MotionConfig
				reducedMotion={shouldReduceMotion ? "always" : "never"}
				transition={{
					duration: shouldReduceMotion ? 0.3 : 1,
					type: shouldReduceMotion ? "tween" : "spring",
				}}
			>
				{/* Floating Menü Alanı */}
				<motion.div
					layout
					initial="hidden"
					animate="visible"
					variants={containerVariants}
					whileHover={!settingsOpen ? "hover" : undefined}
					whileTap={!settingsOpen ? "tap" : undefined}
					className="fixed bottom-15 left-1/2 -translate-x-1/2 flex items-center justify-center bg-accent"
					style={{ width, height, padding, borderRadius, gap }}
				>
					<AnimatePresence mode="wait">
						{/* Ayarlar açık değilse menü, açıksa ayarlar kartı gösterilir */}
						{!settingsOpen ? (
							<motion.div
								key="menu-content"
								variants={contentVariants}
								initial="hidden"
								animate="visible"
								exit="hidden"
								className="flex items-center gap-1"
							>
								{/* Menüdeki butonlar ve ayarlar butonu */}
								<motion.div
									key={buttonTexts[textIndex]}
									variants={menuItemVariants}
									transition={{ duration: 0.8, type: "spring" }}
									ref={ref}
									className="flex items-center gap-1 bg-accent rounded-full p-3"
								>
									{/* Sadece ikonlu ekle butonu */}
									<motion.button
										variants={buttonVariants}
										initial="initial"
										whileHover="hover"
										whileTap="tap"
										className="border bg-background rounded-full shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
									>
										<PlusIcon className="w-4 h-4" />
									</motion.button>
									{/* Metinli ana buton */}
									<motion.button
										onClick={handleButtonClick}
										variants={mainButtonVariants}
										initial="initial"
										whileHover="hover"
										whileTap="tap"
									>
										<Button
											variant="outline"
											className="rounded-full backdrop-blur-lg cursor-pointer hover:bg-transparent border-dashed bg-transparent border-black"
										>
											<PlusIcon className="w-4 h-4" />
											<AnimatePresence mode="wait">
												{showText && (
													<motion.span
														key={buttonTexts[textIndex]}
														variants={textVariants}
														initial="hidden"
														animate="visible"
														exit="hidden"
														className="text-sm"
													>
														{buttonTexts[textIndex]}
													</motion.span>
												)}
											</AnimatePresence>
										</Button>
									</motion.button>
									{/* Ayarlar butonu */}
									<motion.div variants={menuItemVariants}>
										<Button
											variant="outline"
											className="rounded-full"
											onClick={handleSettingsClick}
										>
											<SettingsIcon className="w-4 h-4" />
											<span className="text-sm">Ayarlar</span>
										</Button>
									</motion.div>
								</motion.div>
								{/* Filtre butonu */}
								<motion.div
									variants={menuItemVariants}
									className="flex items-center p-3 gap-1 bg-accent rounded-full"
								>
									<motion.button
										type="button"
										variants={buttonVariants}
										initial="initial"
										whileHover="hover"
										whileTap="tap"
										className="border bg-background rounded-full shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
									>
										<FilterIcon className="w-4 h-4" />
									</motion.button>
								</motion.div>
							</motion.div>
						) : showContent ? (
							// Ayarlar kartı içeriği
							<motion.div
								key="settings-card"
								variants={cardContentVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								className="w-full h-full flex flex-col"
							>
								<motion.div
									variants={cardElementVariants}
									className="flex items-center justify-between mb-4"
								>
									<motion.h3
										variants={cardElementVariants}
										className="text-lg font-semibold"
									>
										✨ Ayarlar
									</motion.h3>
									<motion.div variants={cardElementVariants}>
										<Button
											variant="ghost"
											size="sm"
											onClick={handleSettingsClick}
											className="rounded-full hover:rotate-90 transition-transform"
										>
											<XIcon className="w-4 h-4" />
										</Button>
									</motion.div>
								</motion.div>
								<motion.div
									variants={cardElementVariants}
									className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4"
								>
									<motion.div
										variants={cardElementVariants}
										className="text-4xl"
									>
										🎛️
									</motion.div>
									<motion.p
										variants={cardElementVariants}
										className="text-center"
									>
										Ayarlar içeriği buraya gelecek...
										<br />
										<span className="text-xs opacity-60">
											Advanced Motion Patterns ile güçlendirildi
										</span>
									</motion.p>
								</motion.div>
							</motion.div>
						) : null}
					</AnimatePresence>
				</motion.div>
			</MotionConfig>
		</div>
	);
}
