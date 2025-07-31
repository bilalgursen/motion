import CopyToClipboardButton from "@/components/test/copy";

export default function Playground() {
	return (
		<div className="grid grid-cols-6 grid-rows-6 gap-4 place-items-center border-primary h-screen">
			<CopyToClipboardButton />

			<CopyToClipboardButton />
		</div>
	);
}
