"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Settings } from "lucide-react";
import Link from "next/link";

interface ProfileCardProps {
  student: {
    name: string;
    enrollmentNumber: string;
    image?: string;
  };
}

export function ProfileCard({ student }: ProfileCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col items-center space-y-3">
          <Avatar className="h-16 w-16">
            <AvatarImage src={student.image} alt={student.name} />
            <AvatarFallback className="bg-blue-600 text-white text-xl">
              {getInitials(student.name)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="font-semibold">{student.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {student.enrollmentNumber}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Link href="/edit-profile">
          <Button variant="outline" size="sm" className="w-full cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
        {/*<Button variant="outline" size="sm" className="w-full">
          <Settings className="mr-2 h-4 w-4" />
          Account
        </Button>*/}
      </CardContent>
    </Card>
  );
}
