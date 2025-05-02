"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScanSearch, Home, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
	{ href: "/", label: "Home", icon: Home },
	{ href: "/models", label: "Models Overview", icon: Layers },
	{ href: "/detection", label: "Image Detection", icon: ScanSearch },
];

export default function Header() {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center px-6 w-full mx-auto">
				<div className="mr-4 flex items-center justify-between w-full">
					<Link href="/" className="mr-6 flex items-center space-x-2">
						<span className="font-extrabold">
							<span className="text-accent ">Rust </span> Detective
						</span>
					</Link>
					<nav className="flex items-center space-x-1">
						{navItems.map((item) => (
							<Button
								key={item.href}
								variant="ghost"
								size="sm"
								asChild
								className={cn(
									"transition-colors hover:bg-accent/80",
									pathname === item.href
										? "bg-accent text-accent-foreground"
										: "text-foreground/60 hover:text-foreground"
								)}
							>
								<Link
									href={item.href}
									className="flex items-center justify-center gap-1.5"
								>
									<item.icon className="h-4 w-4" />
									{item.label}
								</Link>
							</Button>
						))}
					</nav>
				</div>
			</div>
		</header>
	);
}
