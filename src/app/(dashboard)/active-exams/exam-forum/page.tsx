import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Clock } from "lucide-react";

export default function ExamForumPage() {
    const discussions = [
        {
            id: 1,
            title: "Tips for Data Structures Exam",
            author: "John Doe",
            replies: 12,
            likes: 24,
            time: "2 hours ago",
            category: "Study Tips",
        },
        {
            id: 2,
            title: "Important topics for DBMS",
            author: "Jane Smith",
            replies: 8,
            likes: 15,
            time: "5 hours ago",
            category: "Discussion",
        },
        {
            id: 3,
            title: "Previous year question papers",
            author: "Mike Johnson",
            replies: 20,
            likes: 45,
            time: "1 day ago",
            category: "Resources",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Exam Forum</h2>
                <p className="text-muted-foreground">
                    Discuss exams, share tips, and help each other
                </p>
            </div>

            <div className="grid gap-4">
                {discussions.map((discussion) => (
                    <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <CardTitle className="text-lg">{discussion.title}</CardTitle>
                                    <CardDescription className="mt-1">
                                        Posted by {discussion.author} • {discussion.time}
                                    </CardDescription>
                                </div>
                                <Badge variant="outline">{discussion.category}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>{discussion.replies} replies</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <ThumbsUp className="h-4 w-4" />
                                    <span>{discussion.likes} likes</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Hidden study group finder */}
            <div className="hidden">
                <Card>
                    <CardHeader>
                        <CardTitle>Study Groups</CardTitle>
                        <CardDescription>Find or create study groups for upcoming exams</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Study group feature will be displayed here
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
