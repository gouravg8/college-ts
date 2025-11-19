import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, TrendingUp } from "lucide-react";

export default function DownloadResultPage() {
    const results = [
        {
            id: 1,
            semester: "Semester 5",
            year: "2024",
            cgpa: 8.5,
            status: "published",
            publishedDate: "2024-11-15",
        },
        {
            id: 2,
            semester: "Semester 4",
            year: "2024",
            cgpa: 8.3,
            status: "published",
            publishedDate: "2024-06-20",
        },
        {
            id: 3,
            semester: "Semester 3",
            year: "2023",
            cgpa: 8.7,
            status: "published",
            publishedDate: "2023-12-10",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Download Result</h2>
                <p className="text-muted-foreground">
                    View and download your semester results
                </p>
            </div>

            {/* Overall Performance */}
            <Card>
                <CardHeader>
                    <CardTitle>Overall Performance</CardTitle>
                    <CardDescription>Your academic performance summary</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-3">
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Current CGPA</p>
                            <p className="text-2xl font-bold text-blue-600">8.5</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Total Credits</p>
                            <p className="text-2xl font-bold">120</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Rank</p>
                            <p className="text-2xl font-bold">12/150</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Semester Results */}
            <div className="grid gap-4">
                {results.map((result) => (
                    <Card key={result.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle>{result.semester}</CardTitle>
                                    <CardDescription>Academic Year {result.year}</CardDescription>
                                </div>
                                <Badge variant="default">
                                    {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-green-600" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">CGPA</p>
                                            <p className="text-xl font-bold">{result.cgpa}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Published</p>
                                        <p className="text-sm font-medium">
                                            {new Date(result.publishedDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <Button className="w-full sm:w-auto">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download PDF
                                </Button>

                                {/* Hidden detailed marksheet */}
                                <div className="hidden mt-4 p-4 border rounded-lg">
                                    <p className="text-sm font-medium mb-3">Subject-wise Marks</p>
                                    <div className="space-y-2 text-sm">
                                        {[
                                            { subject: "Data Structures", marks: "85/100", grade: "A" },
                                            { subject: "DBMS", marks: "90/100", grade: "A+" },
                                            { subject: "Web Dev", marks: "88/100", grade: "A" },
                                        ].map((sub, i) => (
                                            <div key={i} className="flex justify-between items-center">
                                                <span>{sub.subject}</span>
                                                <div className="flex gap-4">
                                                    <span className="text-muted-foreground">{sub.marks}</span>
                                                    <Badge variant="outline">{sub.grade}</Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
