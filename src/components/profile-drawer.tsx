"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { User, Settings, HelpCircle, Palette } from "lucide-react";
import Link from "next/link";

interface ProfileDrawerProps {
    student: {
        name: string;
        email: string;
        enrollmentNumber: string;
        department?: string;
        semester?: number;
        image?: string;
    };
}

export function ProfileDrawer({ student }: ProfileDrawerProps) {
    const [open, setOpen] = useState(false);

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                        <AvatarImage src={student.image} alt={student.name} />
                        <AvatarFallback className="bg-blue-600 text-white">
                            {getInitials(student.name)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Profile</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    {/* Profile Info */}
                    <div className="flex flex-col items-center space-y-3">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={student.image} alt={student.name} />
                            <AvatarFallback className="bg-blue-600 text-white text-2xl">
                                {getInitials(student.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-center">
                            <h3 className="font-semibold text-lg">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                            <p className="text-sm font-medium text-blue-600 mt-1">
                                {student.enrollmentNumber}
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Student Details */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700">Details</h4>
                        <div className="space-y-1 text-sm">
                            {student.department && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Department:</span>
                                    <span className="font-medium">{student.department}</span>
                                </div>
                            )}
                            {student.semester && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Semester:</span>
                                    <span className="font-medium">{student.semester}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Action Buttons */}
                    <div className="space-y-2">
                        <Link href="/edit-profile" onClick={() => setOpen(false)}>
                            <Button variant="outline" className="w-full justify-start">
                                <User className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>
                        </Link>
                        <Button variant="outline" className="w-full justify-start">
                            <Settings className="mr-2 h-4 w-4" />
                            Account Settings
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                            <HelpCircle className="mr-2 h-4 w-4" />
                            Help & Support
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                            <Palette className="mr-2 h-4 w-4" />
                            Theme Preferences
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
