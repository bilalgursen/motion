import React, { useState } from "react";
import { motion } from "motion/react"; // Motion for React'i import ediyoruz

function GeminiTest() {
	const [isBarExpanded, setIsBarExpanded] = useState(false);

	// Çubuğun genişliği, isBarExpanded durumuna göre değişecek
	const barWidth = isBarExpanded ? "400px" : "150px"; // Genişletilmiş ve daraltılmış genişlik değerleri

	return (
		<div className="h-screen p-8">
			<h1 className="text-2xl font-bold mb-4">
				Notebooklm tarafından oluşturulan kodların test alanı
			</h1>
			<p className="text-muted-foreground mb-8">
				Notebooklm tarafından oluşturulan kodların test alanı
			</p>
			<div
				style={{ padding: "50px", display: "flex", justifyContent: "center" }}
			>
				{/* Çok fonksiyonlu çubuk bileşeni */}
				<motion.div
					// 'layout' prop'u, genişlik gibi düzen değişikliklerini sorunsuz bir şekilde animasyonlandırır.
					// Bu sayede çubuk genişleyip daralırken akıcı bir geçiş sağlar [11, 12, 15-23].
					layout
					style={{
						width: barWidth, // Genişlik durumu tarafından kontrol ediliyor
						height: "60px",
						backgroundColor: "#2a2a2a",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-around",
						borderRadius: "15px",
						padding: "0 10px",
						boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
						gap: isBarExpanded ? "10px" : "0px", // Butonlar arası boşluk
						overflow: "hidden", // İçerik taşmasını engeller
					}}
					// Genişlik animasyonuna yay (spring) geçişi uyguluyoruz [35, 38-40, 59].
					// Bu, animasyona doğal ve esnek bir his verir.
					transition={{ type: "spring", stiffness: 250, damping: 25, mass: 1 }}
				>
					{/* Buton 1 */}
					<motion.button
						// Butonun üzerine gelindiğinde çubuğun genişlemesini tetikler [51-56].
						onHoverStart={() => setIsBarExpanded(true)}
						// Butonun üzerinden ayrıldığında çubuğun eski haline dönmesini tetikler.
						onHoverEnd={() => setIsBarExpanded(false)}
						// Butonun kendisine üzerine gelindiğinde ufak bir ölçek animasyonu ekler [41-47, 54, 57, 58].
						whileHover={{ scale: 1.05 }}
						style={{
							padding: "10px 20px",
							backgroundColor: "#4CAF50",
							color: "white",
							border: "none",
							borderRadius: "8px",
							cursor: "pointer",
							fontSize: "16px",
							fontWeight: "bold",
							whiteSpace: "nowrap", // Buton metninin sarmalanmasını engeller
						}}
					>
						Anasayfa
					</motion.button>

					{/* Çubuk genişletildiğinde gösterilecek ek butonlar */}
					{isBarExpanded && (
						<>
							{/* Buton 2 */}
							<motion.button
								onHoverStart={() => setIsBarExpanded(true)}
								onHoverEnd={() => setIsBarExpanded(false)}
								whileHover={{ scale: 1.05 }}
								style={{
									padding: "10px 20px",
									backgroundColor: "#2196F3",
									color: "white",
									border: "none",
									borderRadius: "8px",
									cursor: "pointer",
									fontSize: "16px",
									fontWeight: "bold",
									whiteSpace: "nowrap",
								}}
								// Bu butonun görünür hale gelirken ve kaybolurken animasyon yapmasını sağlar
								initial={{ opacity: 0, x: -20 }} // Başlangıç durumu
								animate={{ opacity: 1, x: 0 }} // Bitiş durumu
								exit={{ opacity: 0, x: -20 }} // Çıkış durumu (AnimatePresence ile kullanılırsa)
								transition={{ delay: 0.1, type: "tween", duration: 0.2 }}
							>
								Hizmetler
							</motion.button>

							{/* Buton 3 */}
							<motion.button
								onHoverStart={() => setIsBarExpanded(true)}
								onHoverEnd={() => setIsBarExpanded(false)}
								whileHover={{ scale: 1.05 }}
								style={{
									padding: "10px 20px",
									backgroundColor: "#FFC107",
									color: "black",
									border: "none",
									borderRadius: "8px",
									cursor: "pointer",
									fontSize: "16px",
									fontWeight: "bold",
									whiteSpace: "nowrap",
								}}
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ delay: 0.2, type: "tween", duration: 0.2 }}
							>
								İletişim
							</motion.button>
						</>
					)}
				</motion.div>
			</div>
		</div>
	);
}

export default GeminiTest;
