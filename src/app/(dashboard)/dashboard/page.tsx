import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar, TrendingUp, Award } from "lucide-react";

export default function DashboardPage() {
    const stats = [
        {
            title: "Total Subjects",
            value: "6",
            icon: BookOpen,
            description: "This semester",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            title: "Upcoming Exams",
            value: "3",
            icon: Calendar,
            description: "Next 30 days",
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            title: "Attendance",
            value: "87%",
            icon: TrendingUp,
            description: "Overall average",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
        },
        {
            title: "CGPA",
            value: "8.5",
            icon: Award,
            description: "Current semester",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">
                    Overview of your academic progress and activities
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                                    <Icon className={`h-4 w-4 ${stat.color}`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">{stat.description}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Your latest academic activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { title: "Assignment submitted", subject: "Data Structures", time: "2 hours ago" },
                                { title: "Exam scheduled", subject: "Database Management", time: "1 day ago" },
                                { title: "Result published", subject: "Web Development", time: "3 days ago" },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{activity.title}</p>
                                        <p className="text-xs text-muted-foreground">{activity.subject}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Exams</CardTitle>
                        <CardDescription>Next scheduled examinations</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Hidden content - remove 'hidden' class to show */}
                        <div className="hidden space-y-4">
                            {[
                                { subject: "Data Structures", date: "Dec 25, 2024", time: "10:00 AM" },
                                { subject: "Database Management", date: "Dec 28, 2024", time: "2:00 PM" },
                                { subject: "Web Development", date: "Jan 2, 2025", time: "10:00 AM" },
                            ].map((exam, i) => (
                                <div key={i} className="flex items-start justify-between border-l-2 border-blue-600 pl-3">
                                    <div>
                                        <p className="text-sm font-medium">{exam.subject}</p>
                                        <p className="text-xs text-muted-foreground">{exam.time}</p>
                                    </div>
                                    <span className="text-xs font-medium text-blue-600">{exam.date}</span>
                                </div>
                            ))}
                        </div>
                        {/* Placeholder when hidden */}
                        <p className="text-sm text-muted-foreground">
                            Exam schedule will be displayed here. (Remove &apos;hidden&apos; class to show content)
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Frequently used features</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { label: "View Subjects", href: "/my-subject" },
                            { label: "Check Results", href: "/download-result" },
                            { label: "Download Admit Card", href: "/admit-card" },
                            { label: "Submit Feedback", href: "/student-feedback" },
                        ].map((action) => (
                            <a
                                key={action.label}
                                href={action.href}
                                className="flex items-center justify-center rounded-lg border border-gray-200 p-4 text-sm font-medium transition-colors hover:bg-gray-50 hover:border-blue-600"
                            >
                                {action.label}
                            </a>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
