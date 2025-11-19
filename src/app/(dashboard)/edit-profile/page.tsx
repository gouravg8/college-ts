"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function EditProfilePage() {
    const [formData, setFormData] = useState({
        name: "John Doe",
        enrollmentNumber: "ENR2024001",
        age: "20",
        phone: "9876543210",
        department: "Computer Science",
        semester: "5",
        batch: "2022-2026",
        address: "123 College Street, City, State - 123456",
        emergencyContact: "9876543211",
        emergencyContactName: "Jane Doe",
    });
    const [saved, setSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would call your API to update profile
        console.log("Profile updated:", formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Edit Profile</h2>
                <p className="text-muted-foreground">
                    Update your personal and academic information
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Picture */}
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Picture</CardTitle>
                        <CardDescription>Update your profile photo</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="" alt={formData.name} />
                                <AvatarFallback className="bg-blue-600 text-white text-2xl">
                                    {getInitials(formData.name)}
                                </AvatarFallback>
                            </Avatar>
                            <Button type="button" variant="outline">
                                <User className="mr-2 h-4 w-4" />
                                Upload Photo
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Personal Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Your basic personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="age">Age</Label>
                                <Input
                                    id="age"
                                    name="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                                id="address"
                                name="address"
                                rows={3}
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Academic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Academic Information</CardTitle>
                        <CardDescription>Your college and course details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="enrollmentNumber">Enrollment Number</Label>
                                <Input
                                    id="enrollmentNumber"
                                    name="enrollmentNumber"
                                    value={formData.enrollmentNumber}
                                    disabled
                                    className="bg-gray-100"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Enrollment number cannot be changed
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <select
                                    id="department"
                                    name="department"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={formData.department}
                                    onChange={handleChange}
                                >
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Information Technology">Information Technology</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Mechanical">Mechanical</option>
                                    <option value="Civil">Civil</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="semester">Semester</Label>
                                <select
                                    id="semester"
                                    name="semester"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={formData.semester}
                                    onChange={handleChange}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                        <option key={sem} value={sem}>
                                            Semester {sem}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="batch">Batch</Label>
                                <Input
                                    id="batch"
                                    name="batch"
                                    value={formData.batch}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card>
                    <CardHeader>
                        <CardTitle>Emergency Contact</CardTitle>
                        <CardDescription>Contact person in case of emergency</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="emergencyContactName">Contact Name</Label>
                                <Input
                                    id="emergencyContactName"
                                    name="emergencyContactName"
                                    value={formData.emergencyContactName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="emergencyContact">Contact Phone</Label>
                                <Input
                                    id="emergencyContact"
                                    name="emergencyContact"
                                    type="tel"
                                    value={formData.emergencyContact}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {saved && (
                    <div className="p-3 bg-green-50 text-green-700 rounded-md text-sm">
                        Profile updated successfully!
                    </div>
                )}

                <div className="flex gap-3">
                    <Button type="submit">Save Changes</Button>
                    <Button type="button" variant="outline">
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}
