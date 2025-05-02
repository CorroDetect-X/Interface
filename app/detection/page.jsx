"use client";

import { useState } from "react";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, UploadCloud, CheckCircle, XCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
export default function ImageDetectionPage() {
	const [selectedImage, setSelectedImage] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(null);
	const [detectionResult, setDetectionResult] = useState(null);
	const [explanationResult, setExplanationResult] = useState(null);
	const [status, setStatus] = useState("idle"); // 'idle' | 'uploading' | 'detecting' | 'explaining' | 'success' | 'error'
	const [error, setError] = useState(null);
	const { toast } = useToast();
	const handleImageChange = (event) => {
		const file = event.target.files?.[0];
		if (file) {
			// Basic validation
			if (!file.type.startsWith("image/")) {
				setError("Please select a valid image file (PNG, JPG, etc.).");
				setStatus("error");
				setSelectedImage(null);
				setPreviewUrl(null);
				setDetectionResult(null);
				setExplanationResult(null);
				return;
			}
			// Max size 5MB
			if (file.size > 5 * 1024 * 1024) {
				setError("Image size should not exceed 5MB.");
				setStatus("error");
				setSelectedImage(null);
				setPreviewUrl(null);
				setDetectionResult(null);
				setExplanationResult(null);
				return;
			}

			setSelectedImage(file);
			setPreviewUrl(URL.createObjectURL(file));
			setDetectionResult(null);
			setExplanationResult(null);
			setError(null);
			setStatus("idle");
		}
	};

	const handleDetectClick = async () => {
		toast({
			variant: "destructive",
			title: "Error ",
			description: "something went wrong",
		});
		if (!selectedImage) {
			setError("Please select an image first.");
			setStatus("error");
			return;
		}
	};

	const renderResultIcon = (resultText) => {
		const lowerCaseText = resultText.toLowerCase();
		if (
			lowerCaseText.includes("no corrosion") ||
			lowerCaseText.includes("not detected")
		) {
			return <CheckCircle className="h-5 w-5 text-green-600" />;
		} else if (
			lowerCaseText.includes("corrosion detected") ||
			lowerCaseText.includes("detected")
		) {
			// Assuming primary color is rust-like for detected corrosion
			return <XCircle className="h-5 w-5 text-primary" />;
		}
		// Default icon for ambiguous or other statuses
		return <Info className="h-5 w-5 text-muted-foreground" />;
	};

	return (
		<div className="container mx-auto px-4 py-12">
			<h1 className="text-4xl font-bold text-center mb-8">
				Image Corrosion Detection
			</h1>
			<p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
				Upload an image to analyze it for corrosion using simulated MobileNetV3
				and YOLOv9 models, followed by an AI-generated explanation of the
				potential impact.
			</p>

			<Card className="max-w-2xl mx-auto mb-8 shadow-md">
				<CardHeader>
					<CardTitle>Upload Image</CardTitle>
					<CardDescription>
						Select an image file (PNG, JPG, etc.) up to 5MB.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex flex-col items-center space-y-4">
						<label
							htmlFor="image-upload"
							className="cursor-pointer w-full border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center hover:border-primary transition-colors duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
						>
							<UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
							<span className="block font-medium text-foreground">
								{selectedImage
									? `Selected: ${selectedImage.name}`
									: "Click or drag file to upload"}
							</span>
							<span className="block text-sm text-muted-foreground mt-1">
								Max file size: 5MB
							</span>
							<Input
								id="image-upload"
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								className="hidden" // Visually hide, label handles interaction
								aria-label="Upload image file"
							/>
						</label>

						{previewUrl && (
							<div className="w-full max-w-xs h-48 relative rounded-md overflow-hidden border shadow-sm bg-muted/30">
								<Image
									src={previewUrl}
									alt="Selected image preview"
									fill // Use fill instead of layout="fill"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Provide sizes
									style={{ objectFit: "contain" }} // Use style for objectFit
								/>
							</div>
						)}
					</div>

					<Button
						onClick={handleDetectClick}
						disabled={
							!selectedImage ||
							status === "detecting" ||
							status === "explaining"
						}
						className="w-full"
						size="lg"
						aria-live="polite" // Announce changes for screen readers
					>
						{status === "detecting" && (
							<Loader2
								className="mr-2 h-5 w-5 animate-spin"
								aria-hidden="true"
							/>
						)}
						{status === "explaining" && (
							<Loader2
								className="mr-2 h-5 w-5 animate-spin"
								aria-hidden="true"
							/>
						)}
						{status === "detecting"
							? "Analyzing Image..."
							: status === "explaining"
							? "Generating Explanation..."
							: "Detect Corrosion"}
					</Button>
				</CardContent>
			</Card>

			{/* Error Alert - Displayed only when error is not null */}
			{error && (
				<Alert
					variant="destructive"
					className="max-w-2xl mx-auto mb-8"
					role="alert"
				>
					<XCircle className="h-4 w-4" aria-hidden="true" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{/* Loading Indicator - Displayed during detection or explanation */}
			{(status === "detecting" || status === "explaining") && (
				<div
					className="text-center max-w-2xl mx-auto mt-8 flex items-center justify-center text-muted-foreground"
					aria-live="polite"
				>
					<Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
					<span>
						{status === "detecting"
							? "Processing image and detecting corrosion..."
							: "Generating AI explanation..."}
					</span>
				</div>
			)}

			{/* Results Section - Displayed on success or if detection finished but explanation failed */}
			{(status === "success" || (status === "error" && detectionResult)) &&
				detectionResult && (
					<div className="max-w-2xl mx-auto space-y-6">
						<Card className="shadow-sm">
							<CardHeader>
								<CardTitle>Detection Results</CardTitle>
								<CardDescription>
									Simulated analysis results from AI models.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
									<span className="font-medium text-sm sm:text-base">
										MobileNetV3:
									</span>
									<div className="flex items-center gap-2">
										{renderResultIcon(detectionResult.mobileNetV3)}
										<span className="text-sm font-semibold text-right">
											{detectionResult.mobileNetV3}
										</span>
									</div>
								</div>
								<div className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
									<span className="font-medium text-sm sm:text-base">
										YOLOv9:
									</span>
									<div className="flex items-center gap-2">
										{renderResultIcon(detectionResult.yolov9)}
										<span className="text-sm font-semibold text-right">
											{detectionResult.yolov9}
										</span>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Display Explanation Card only if explanation succeeded (status is success) */}
						{status === "success" && explanationResult && (
							<Card className="shadow-sm">
								<CardHeader>
									<CardTitle>AI Explanation</CardTitle>
									<CardDescription>
										Impact of detected corrosion on structural integrity.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{explanationResult.explanation}
									</p>
								</CardContent>
							</Card>
						)}
						{/* Optionally, add a note if explanation failed but detection succeeded */}
						{status === "error" && detectionResult && !explanationResult && (
							<Alert variant="default" className="mt-4">
								<Info className="h-4 w-4" />
								<AlertTitle>Note</AlertTitle>
								<AlertDescription>
									Detection results are shown above. The AI explanation could
									not be generated due to an error.
								</AlertDescription>
							</Alert>
						)}
					</div>
				)}
		</div>
	);
}
