import { motion } from "motion/react";

const boxVariants = {
	out: {
		y: 0,
	},
	in: {
		y: 0,
		transition: {
			duration: 0.6,
			delayChildren: 1.2,
			staggerChildren: 0.5,
		},
	},
};

const iconVariants = {
	out: {
		x: -600,
	},
	in: {
		x: 0,
	},
};

export default function MagicEmojiPage() {
	return (
		<div className="min-h-screen p-8">
			<h1 className="text-2xl font-bold mb-6">Magic Emoji</h1>
			<motion.div
				variants={boxVariants}
				initial="out"
				animate="in"
				className="flex items-center gap-4 text-5xl"
			>
				<motion.span role="img" aria-label="magic wand" variants={iconVariants}>
					🚀
				</motion.span>
				<motion.span role="img" aria-label="sparkles" variants={iconVariants}>
					✨
				</motion.span>
			</motion.div>
		</div>
	);
}
