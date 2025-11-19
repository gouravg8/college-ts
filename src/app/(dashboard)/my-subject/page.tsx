import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User, TrendingUp } from "lucide-react";

export default function MySubjectPage() {
    const subjects = [
        {
            name: "Data Structures and Algorithms",
            code: "CS301",
            credits: 4,
            instructor: "Dr. Sarah Johnson",
            attendance: 92,
            progress: 75,
        },
        {
            name: "Database Management Systems",
            code: "CS302",
            credits: 4,
            instructor: "Prof. Michael Chen",
            attendance: 88,
            progress: 68,
        },
        {
            name: "Web Development",
            code: "CS303",
            credits: 3,
            instructor: "Dr. Emily Rodriguez",
            attendance: 95,
            progress: 82,
        },
        {
            name: "Operating Systems",
            code: "CS304",
            credits: 4,
            instructor: "Prof. David Kim",
            attendance: 85,
            progress: 60,
        },
        {
            name: "Computer Networks",
            code: "CS305",
            credits: 3,
            instructor: "Dr. Lisa Wang",
            attendance: 90,
            progress: 70,
        },
        {
            name: "Software Engineering",
            code: "CS306",
            credits: 3,
            instructor: "Prof. James Miller",
            attendance: 87,
            progress: 65,
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">My Subjects</h2>
                <p className="text-muted-foreground">
                    View and manage your enrolled subjects
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {subjects.map((subject) => (
                    <Card key={subject.code} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                                    <CardDescription className="mt-1">
                                        {subject.code} • {subject.credits} Credits
                                    </CardDescription>
                                </div>
                                <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 text-sm">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{subject.instructor}</span>
                            </div>

                            {/* Hidden attendance tracking - remove 'hidden' to show */}
                            <div className="hidden space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Attendance</span>
                                    <Badge variant={subject.attendance >= 75 ? "default" : "destructive"}>
                                        {subject.attendance}%
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Progress</span>
                                    <span className="font-medium">{subject.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-600 transition-all"
                                        style={{ width: `${subject.progress}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Badge variant="outline" className="text-xs">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    Active
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
