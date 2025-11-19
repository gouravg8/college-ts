"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Home,
    BookOpen,
    FileText,
    CreditCard,
    Download,
    MessageSquare,
    LogOut,
    ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/my-subject", label: "My Subject", icon: BookOpen },
    {
        href: "/active-exams",
        label: "Active Exams",
        icon: FileText,
        submenu: [{ href: "/active-exams/exam-forum", label: "Exam Forum" }],
    },
    { href: "/admit-card", label: "Admit Card", icon: CreditCard },
    { href: "/download-result", label: "Download Result", icon: Download },
    { href: "/student-feedback", label: "Student Feedback", icon: MessageSquare },
];

export function AppSidebar() {
    const pathname = usePathname();
    const [expandedItems, setExpandedItems] = useState<string[]>(["/active-exams"]);

    const toggleExpanded = (href: string) => {
        setExpandedItems((prev) =>
            prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]
        );
    };

    const handleLogout = async () => {
        await fetch("/api/auth/sign-out", { method: "POST" });
        window.location.href = "/login";
    };

    return (
        <div className="flex h-full w-64 flex-col border-r bg-white">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-blue-600">College Portal</h2>
                <p className="text-sm text-muted-foreground">Student Dashboard</p>
            </div>

            <nav className="flex-1 space-y-1 px-3">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    const isExpanded = expandedItems.includes(item.href);

                    return (
                        <div key={item.href}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-700 hover:bg-gray-100"
                                )}
                                onClick={(e) => {
                                    if (item.submenu) {
                                        e.preventDefault();
                                        toggleExpanded(item.href);
                                    }
                                }}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="flex-1">{item.label}</span>
                                {item.submenu && (
                                    <ChevronDown
                                        className={cn(
                                            "h-4 w-4 transition-transform",
                                            isExpanded && "rotate-180"
                                        )}
                                    />
                                )}
                            </Link>

                            {item.submenu && isExpanded && (
                                <div className="ml-8 mt-1 space-y-1">
                                    {item.submenu.map((subItem) => (
                                        <Link
                                            key={subItem.href}
                                            href={subItem.href}
                                            className={cn(
                                                "block rounded-lg px-3 py-2 text-sm transition-colors",
                                                pathname === subItem.href
                                                    ? "bg-blue-50 text-blue-600"
                                                    : "text-gray-600 hover:bg-gray-100"
                                            )}
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            <div className="border-t p-3">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={handleLogout}
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </Button>
            </div>
        </div>
    );
}
