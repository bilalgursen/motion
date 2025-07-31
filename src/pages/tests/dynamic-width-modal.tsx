import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const DynamicWidthModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="p-8">
			{!isOpen && (
				<Button type="button" onClick={() => setIsOpen(true)}>
					Open Modal
				</Button>
			)}

			{isOpen && (
				<Card className="w-fit">
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
			)}
		</div>
	);
};

export default DynamicWidthModal;
