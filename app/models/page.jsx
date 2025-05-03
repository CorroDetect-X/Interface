"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LineChart, CartesianGrid, XAxis, YAxis, Legend, Line } from "recharts"; // Removed unused imports: Tooltip, BarChart, Bar
import { ChartTooltipContent, ChartContainer } from "@/components/ui/chart";

const accuracyData = [
	{ epoch: "1", MobileNetV3: 0.75, YOLOv9: 0.72 },
	{ epoch: "5", MobileNetV3: 0.82, YOLOv9: 0.8 },
	{ epoch: "10", MobileNetV3: 0.88, YOLOv9: 0.85 },
	{ epoch: "15", MobileNetV3: 0.91, YOLOv9: 0.89 },
	{ epoch: "20", MobileNetV3: 0.98, YOLOv9: 0.91 },
];

const lossData = [
	{ epoch: "1", MobileNetV3: 0.5, YOLOv9: 0.55 },
	{ epoch: "5", MobileNetV3: 0.35, YOLOv9: 0.4 },
	{ epoch: "10", MobileNetV3: 0.25, YOLOv9: 0.3 },
	{ epoch: "15", MobileNetV3: 0.18, YOLOv9: 0.22 },
	{ epoch: "20", MobileNetV3: 0.15, YOLOv9: 0.19 },
];

const modelInfo = [
	{
		name: "MobileNetV3 (Large)",
		version: "3.0 (Large variant)",
		description:
			"A lightweight and efficient convolutional neural network designed for mobile and embedded vision applications. Excels at classification tasks.",
		accuracy: "94%",
		keyFeatures: [
			"High efficiency",
			"Low latency",
			"Optimized for resource-constrained devices",
			"Good for classification",
		],
		accuracyData: accuracyData.map((d) => ({
			epoch: d.epoch,
			value: d.MobileNetV3,
		})),
		lossData: lossData.map((d) => ({ epoch: d.epoch, value: d.MobileNetV3 })),
		chartColor: "hsl(var(--chart-1))", // Rust Orange
	},
	{
		name: "YOLOv9",
		version: "9.0",
		description:
			"An advanced real-time object detection system known for its speed and accuracy. It identifies and locates objects within an image.",
		accuracy: "91%",
		keyFeatures: [
			"Real-time detection",
			"High accuracy object localization",
			"Detects multiple objects",
			"State-of-the-art performance",
		],
		accuracyData: accuracyData.map((d) => ({
			epoch: d.epoch,
			value: d.YOLOv9,
		})),
		lossData: lossData.map((d) => ({ epoch: d.epoch, value: d.YOLOv9 })),
		chartColor: "hsl(var(--chart-2))", // Muted Blue
	},
];

// ChartConfig type annotation removed for JS conversion
const chartConfig = {
	value: { label: "Value" },
	MobileNetV3: { label: "MobileNetV3", color: "hsl(var(--chart-1))" },
	YOLOv9: { label: "YOLOv9", color: "hsl(var(--chart-2))" },
};

export default function ModelsOverviewPage() {
	return (
		<div className="container mx-auto px-4 py-12">
			<h1 className="text-4xl font-bold text-center mb-12">Model Overview</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{modelInfo.map((model) => (
					<Card key={model.name} className="flex flex-col">
						<CardHeader>
							<CardTitle className="text-2xl">{model.name}</CardTitle>
							<CardDescription>Version: {model.version}</CardDescription>
						</CardHeader>
						<CardContent className="flex-grow flex flex-col">
							<p className="mb-4 text-muted-foreground">{model.description}</p>
							<h4 className="font-semibold mb-2">Key Features:</h4>
							<ul className="list-disc list-inside mb-4 text-sm text-muted-foreground space-y-1">
								{model.keyFeatures.map((feature) => (
									<li key={feature}>{feature}</li>
								))}
							</ul>
							<p className="font-semibold mb-4">
								Reported Accuracy:{" "}
								<span className="text-primary font-bold">{model.accuracy}</span>
							</p>

							<div className="mt-auto space-y-6">
								<div>
									<h4 className="font-semibold mb-2 text-center text-sm">
										Accuracy Over Epochs
									</h4>
									<ChartContainer
										config={chartConfig}
										className="h-[200px] w-full"
									>
										<LineChart
											data={model.accuracyData}
											margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
										>
											<CartesianGrid strokeDasharray="3 3" vertical={false} />
											<XAxis
												dataKey="epoch"
												tickLine={false}
												axisLine={false}
												tickMargin={8}
											/>
											<YAxis
												domain={[0.7, 1]}
												tickLine={false}
												axisLine={false}
												tickMargin={8}
											/>
											<ChartTooltipContent indicator="line" />
											<Line
												type="monotone"
												dataKey="value"
												stroke={model.chartColor}
												strokeWidth={2}
												dot={false}
												name={model.name}
											/>
										</LineChart>
									</ChartContainer>
								</div>

								<div>
									<h4 className="font-semibold mb-2 text-center text-sm">
										Loss Over Epochs
									</h4>
									<ChartContainer
										config={chartConfig}
										className="h-[200px] w-full"
									>
										<LineChart
											data={model.lossData}
											margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
										>
											<CartesianGrid strokeDasharray="3 3" vertical={false} />
											<XAxis
												dataKey="epoch"
												tickLine={false}
												axisLine={false}
												tickMargin={8}
											/>
											<YAxis
												domain={[0, 0.6]}
												tickLine={false}
												axisLine={false}
												tickMargin={8}
											/>
											<ChartTooltipContent indicator="line" />
											<Line
												type="monotone"
												dataKey="value"
												stroke={model.chartColor}
												strokeWidth={2}
												dot={false}
												name={model.name}
											/>
										</LineChart>
									</ChartContainer>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
