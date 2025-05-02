import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScanSearch, Layers } from "lucide-react";

export default function Home() {
	return (
		<div className="container mx-auto px-4 py-12">
			<section className="text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-bold mb-4">
					Welcome to Rust Detective
				</h1>
				<p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
					Leveraging the power of AI to identify corrosion in images. Upload
					your images and get instant analysis using state-of-the-art models
					like MobileNetV3 and YOLOv9.
				</p>
				<div className="flex justify-center gap-4">
					<Button asChild size="lg">
						<Link href="/detection">
							<ScanSearch className="mr-2 h-5 w-5" /> Start Detecting
						</Link>
					</Button>
					<Button variant="secondary" size="lg" asChild>
						<Link href="/models">
							<Layers className="mr-2 h-5 w-5" /> Learn About Models
						</Link>
					</Button>
				</div>
			</section>

			<section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
				<div>
					<h2 className="text-3xl font-semibold mb-4">How It Works</h2>
					<p className="text-muted-foreground mb-6">
						Rust Detective simplifies the process of corrosion detection. Just
						upload an image, and our system, powered by advanced deep learning
						models, will analyze it for signs of rust and corrosion.
					</p>
					<ul className="space-y-4">
						<li className="flex items-start">
							<span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground mr-3 mt-1 text-sm font-bold">
								1
							</span>
							<div>
								<h3 className="font-semibold">Upload Image</h3>
								<p className="text-sm text-muted-foreground">
									Select or drag & drop an image containing potentially corroded
									structures or materials.
								</p>
							</div>
						</li>
						<li className="flex items-start">
							<span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground mr-3 mt-1 text-sm font-bold">
								2
							</span>
							<div>
								<h3 className="font-semibold">AI Analysis</h3>
								<p className="text-sm text-muted-foreground">
									Our MobileNetV3 and YOLOv9 models process the image to
									identify areas of corrosion.
								</p>
							</div>
						</li>
						<li className="flex items-start">
							<span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground mr-3 mt-1 text-sm font-bold">
								3
							</span>
							<div>
								<h3 className="font-semibold">View Results</h3>
								<p className="text-sm text-muted-foreground">
									Get clear results indicating the presence and potential extent
									of corrosion detected by each model.
								</p>
							</div>
						</li>
					</ul>
				</div>
				<div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg">
					{
						//put image here
						<Image
							src=""
							alt="Corrosion example"
							fill // Changed from layout="fill"
							style={{ objectFit: "cover" }} // Changed from objectFit="cover"
							data-ai-hint="rusted metal bridge"
							className="transform hover:scale-105 transition-transform duration-300"
						/>
					}
				</div>
			</section>

			<section className="mt-16 text-center">
				<h2 className="text-3xl font-semibold mb-8">Why Use Rust Detective?</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Fast & Efficient</CardTitle>
							<CardDescription>
								Get rapid corrosion analysis without manual inspection.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								Save time and resources by quickly identifying potential issues.
							</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>AI-Powered Accuracy</CardTitle>
							<CardDescription>
								Utilizes robust machine learning models for detection.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>Benefit from the pattern recognition capabilities of AI.</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Dual Model Approach</CardTitle>
							<CardDescription>
								Cross-reference results from MobileNetV3 and YOLOv9.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								Gain more confidence in the detection results through multiple
								perspectives.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>
		</div>
	);
}
