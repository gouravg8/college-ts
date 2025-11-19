import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, MapPin } from "lucide-react";

export default function AdmitCardPage() {
    const admitCards = [
        {
            id: 1,
            exam: "Mid-Semester Examination",
            semester: "Fall 2024",
            date: "2024-12-25",
            venue: "Main Examination Hall",
            status: "available",
        },
        {
            id: 2,
            exam: "End-Semester Examination",
            semester: "Fall 2024",
            date: "2025-01-15",
            venue: "Main Examination Hall",
            status: "upcoming",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Admit Card</h2>
                <p className="text-muted-foreground">
                    Download your examination admit cards
                </p>
            </div>

            <div className="grid gap-4">
                {admitCards.map((card) => (
                    <Card key={card.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle>{card.exam}</CardTitle>
                                    <CardDescription>{card.semester}</CardDescription>
                                </div>
                                <Badge variant={card.status === "available" ? "default" : "secondary"}>
                                    {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>{new Date(card.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>{card.venue}</span>
                                    </div>
                                </div>

                                {card.status === "available" && (
                                    <Button className="w-full sm:w-auto">
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Admit Card
                                    </Button>
                                )}

                                {/* Hidden hall ticket preview */}
                                <div className="hidden mt-4 p-4 border rounded-lg bg-gray-50">
                                    <p className="text-sm font-medium mb-2">Hall Ticket Preview</p>
                                    <div className="text-xs text-muted-foreground space-y-1">
                                        <p>• Bring this admit card to the examination hall</p>
                                        <p>• Carry a valid photo ID</p>
                                        <p>• Report 30 minutes before exam time</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Exam Schedule Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Examination Schedule</CardTitle>
                    <CardDescription>Complete schedule for all subjects</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-2">Subject</th>
                                    <th className="text-left p-2">Code</th>
                                    <th className="text-left p-2">Date</th>
                                    <th className="text-left p-2">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { subject: "Data Structures", code: "CS301", date: "Dec 25", time: "10:00 AM" },
                                    { subject: "DBMS", code: "CS302", date: "Dec 28", time: "2:00 PM" },
                                    { subject: "Web Development", code: "CS303", date: "Jan 2", time: "10:00 AM" },
                                ].map((exam, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="p-2">{exam.subject}</td>
                                        <td className="p-2">{exam.code}</td>
                                        <td className="p-2">{exam.date}</td>
                                        <td className="p-2">{exam.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
