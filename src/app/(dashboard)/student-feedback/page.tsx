"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function StudentFeedbackPage() {
    const [formData, setFormData] = useState({
        subject: "",
        category: "academic",
        message: "",
        rating: 5,
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would call your API
        console.log("Feedback submitted:", formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ subject: "", category: "academic", message: "", rating: 5 });
        }, 3000);
    };

    const previousFeedback = [
        {
            id: 1,
            subject: "Library Facilities",
            category: "infrastructure",
            date: "2024-11-10",
            status: "reviewed",
        },
        {
            id: 2,
            subject: "Course Content Quality",
            category: "academic",
            date: "2024-10-25",
            status: "resolved",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Student Feedback</h2>
                <p className="text-muted-foreground">
                    Share your feedback to help us improve
                </p>
            </div>

            {/* Feedback Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Submit Feedback</CardTitle>
                    <CardDescription>
                        Your feedback is valuable to us. Please share your thoughts.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                placeholder="Brief description of your feedback"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="academic">Academic</option>
                                <option value="infrastructure">Infrastructure</option>
                                <option value="faculty">Faculty</option>
                                <option value="administration">Administration</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rating">Rating (1-5)</Label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        className={`text-2xl ${star <= formData.rating ? "text-yellow-500" : "text-gray-300"
                                            }`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                placeholder="Please provide detailed feedback..."
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            />
                        </div>

                        {submitted && (
                            <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">
                                Thank you! Your feedback has been submitted successfully.
                            </div>
                        )}

                        <Button type="submit" className="w-full sm:w-auto">
                            Submit Feedback
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Previous Feedback - Hidden by default */}
            <div className="hidden">
                <Card>
                    <CardHeader>
                        <CardTitle>Previous Feedback</CardTitle>
                        <CardDescription>Your feedback history</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {previousFeedback.map((feedback) => (
                                <div
                                    key={feedback.id}
                                    className="flex items-center justify-between p-3 border rounded-lg"
                                >
                                    <div>
                                        <p className="font-medium text-sm">{feedback.subject}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {feedback.category} • {new Date(feedback.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <Badge variant={feedback.status === "resolved" ? "default" : "secondary"}>
                                        {feedback.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
