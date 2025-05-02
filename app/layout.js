import { Inter } from "next/font/google"; // Using Inter as a clean sans-serif font
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

// Metadata type definition removed for JS conversion
export const metadata = {
	title: "Rust Detective",
	description: "Detect corrosion in images using AI models.",
};

// Type annotation for children removed for JS conversion
export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					inter.variable
				)}
			>
				<div className="relative flex min-h-screen flex-col">
					<Header />
					<main className="flex-1">{children}</main>
				</div>
				<Toaster />
			</body>
		</html>
	);
}
