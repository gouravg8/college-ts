import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export default function ActiveExamsPage() {
    const exams = [
        {
            id: 1,
            subject: "Data Structures and Algorithms",
            code: "CS301",
            date: "2024-12-25",
            time: "10:00 AM - 1:00 PM",
            venue: "Hall A, Block 3",
            status: "upcoming",
        },
        {
            id: 2,
            subject: "Database Management Systems",
            code: "CS302",
            date: "2024-12-28",
            time: "2:00 PM - 5:00 PM",
            venue: "Hall B, Block 3",
            status: "upcoming",
        },
        {
            id: 3,
            subject: "Web Development",
            code: "CS303",
            date: "2025-01-02",
            time: "10:00 AM - 1:00 PM",
            venue: "Lab 1, Block 2",
            status: "upcoming",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Active Exams</h2>
                    <p className="text-muted-foreground">
                        View your scheduled examinations
                    </p>
                </div>
                <Link href="/active-exams/exam-forum">
                    <Button variant="outline">Exam Forum</Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {exams.map((exam) => (
                    <Card key={exam.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle>{exam.subject}</CardTitle>
                                    <CardDescription>{exam.code}</CardDescription>
                                </div>
                                <Badge variant="secondary">
                                    {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>{new Date(exam.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>{exam.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{exam.venue}</span>
                                </div>
                            </div>

                            {/* Hidden exam preparation resources */}
                            <div className="hidden mt-4 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm font-medium text-blue-900">Preparation Resources</p>
                                <ul className="mt-2 text-sm text-blue-700 space-y-1">
                                    <li>• Previous year papers available</li>
                                    <li>• Study materials uploaded</li>
                                    <li>• Practice tests ready</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
