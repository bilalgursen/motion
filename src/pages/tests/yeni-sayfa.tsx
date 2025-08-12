import { useState, type ComponentType } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import {
	BellIcon,
	HomeIcon,
	PlusIcon,
	SearchIcon,
	UserIcon,
	XIcon,
	FilterIcon,
	SettingsIcon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { cn } from "../../lib/utils";

type TabKey = "home" | "search" | "notifications" | "profile";

const TABS: {
	key: TabKey;
	label: string;
	Icon: ComponentType<{ className?: string }>;
}[] = [
	{ key: "home", label: "Ana Sayfa", Icon: HomeIcon },
	{ key: "search", label: "Ara", Icon: SearchIcon },
	{ key: "notifications", label: "Bildirimler", Icon: BellIcon },
	{ key: "profile", label: "Profil", Icon: UserIcon },
];

export default function YeniSayfa() {
	const [active, setActive] = useState<TabKey>("home");
	const [actionsOpen, setActionsOpen] = useState(false);

	return (
		<div className="h-screen overflow-hidden">
			<div className="p-8 pb-28">
				<h1 className="text-3xl font-bold mb-2">Yeni Sayfa</h1>
				<p className="text-muted-foreground">
					Aşağıdaki interaktif toolbar ile sekmeler arasında geçiş
					yapabilirsiniz.
				</p>
			</div>

			<LayoutGroup>
				<motion.nav
					layout
					initial={{ y: 80, opacity: 0, filter: "blur(8px)" }}
					animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
					transition={{ duration: 0.4, type: "spring" }}
					className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[min(92%,720px)]"
				>
					<motion.div
						layoutId="toolbar-surface"
						className={cn(
							"relative mx-auto rounded-2xl border bg-background/80 backdrop-blur-md shadow-lg",
							actionsOpen ? "px-5 py-5" : "px-3 py-2",
						)}
					>
						<AnimatePresence initial={false} mode="popLayout">
							{!actionsOpen ? (
								<motion.div
									key="compact"
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="flex items-center justify-between"
								>
									<div className="flex items-center gap-1 flex-1">
										{TABS.map(({ key, label, Icon }) => (
											<button
												key={key}
												type="button"
												onClick={() => setActive(key)}
												className={cn(
													"relative h-12 flex-1 rounded-xl px-2 text-xs font-medium",
													"flex items-center justify-center gap-2 transition-colors",
													active === key
														? "text-foreground"
														: "text-muted-foreground",
												)}
											>
												{active === key && (
													<motion.span
														layoutId="active-pill"
														className="absolute inset-0 rounded-xl bg-secondary/70"
														transition={{
															type: "spring",
														}}
													/>
												)}

												<Icon className="relative z-10 h-5 w-5" />

												<AnimatePresence initial={false}>
													{active === key && (
														<motion.span
															key="label"
															initial={{
																opacity: 0,
																y: 6,
																filter: "blur(3px)",
															}}
															animate={{
																opacity: 1,
																y: 0,
																filter: "blur(0px)",
															}}
															exit={{ opacity: 0, y: 6, filter: "blur(3px)" }}
															transition={{ duration: 0.18 }}
															className="relative z-10 hidden sm:inline"
														>
															{label}
														</motion.span>
													)}
												</AnimatePresence>
											</button>
										))}
									</div>

									<div className="relative flex items-center justify-center">
										<Button
											variant="default"
											size="icon"
											onClick={() => setActionsOpen(true)}
											className="h-12 w-12 rounded-xl shadow-md"
										>
											<PlusIcon className="h-5 w-5" />
										</Button>
									</div>
								</motion.div>
							) : (
								<motion.div
									key="expanded"
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="space-y-4"
								>
									<div className="flex items-center justify-between gap-2">
										<div>
											<h3 className="text-base font-semibold leading-none">
												Hızlı Eylemler
											</h3>
											<p className="text-xs text-muted-foreground">
												{(() => {
													switch (active) {
														case "home":
															return "Genel işlemler";
														case "search":
															return "Arama ile ilgili eylemler";
														case "notifications":
															return "Bildirimlere yönelik eylemler";
														case "profile":
															return "Profil ayarlarına hızlı erişim";
													}
												})()}
											</p>
										</div>
										<Button
											variant="secondary"
											size="icon"
											onClick={() => setActionsOpen(false)}
											className="h-10 w-10 rounded-xl"
										>
											<XIcon className="h-4 w-4" />
										</Button>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
										<div className="col-span-1 sm:col-span-2">
											<Input placeholder="Hızlı arama..." className="h-10" />
										</div>
										<Button
											variant="outline"
											className="justify-start h-11 rounded-xl"
										>
											<FilterIcon className="h-4 w-4 mr-2" /> Filtre oluştur
										</Button>
										<Button
											variant="outline"
											className="justify-start h-11 rounded-xl"
										>
											<SettingsIcon className="h-4 w-4 mr-2" /> Ayarları aç
										</Button>
										<Button
											variant="default"
											className="justify-start h-11 rounded-xl"
										>
											<PlusIcon className="h-4 w-4 mr-2" /> Yeni öğe ekle
										</Button>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				</motion.nav>
			</LayoutGroup>
		</div>
	);
}
