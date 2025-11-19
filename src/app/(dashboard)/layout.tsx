import { auth } from "@/lib/auth";
import { db } from "@/db";
import { students } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { ProfileDrawer } from "@/components/profile-drawer";
import { ProfileCard } from "@/components/profile-card";
import { headers } from "next/headers";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect("/login");
    }

    // Fetch student data
    const studentData = await db.query.students.findFirst({
        where: eq(students.userId, session.user.id),
    });

    const studentInfo = {
        name: session.user.name || "Student",
        email: session.user.email,
        enrollmentNumber: studentData?.enrollmentNumber || "N/A",
        department: studentData?.department,
        semester: studentData?.semester,
        image: session.user.image,
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block">
                <AppSidebar />
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="flex items-center justify-between border-b bg-white px-4 py-3 lg:hidden">
                    <div className="flex items-center gap-2">
                        <MobileNav />
                        <h1 className="text-lg font-bold text-blue-600">College Portal</h1>
                    </div>
                    <ProfileDrawer student={studentInfo} />
                </header>

                {/* Desktop Header */}
                <header className="hidden lg:flex items-center justify-between border-b bg-white px-6 py-4">
                    <div>
                        <h1 className="text-xl font-semibold">Welcome, {studentInfo.name}</h1>
                        <p className="text-sm text-muted-foreground">
                            {studentInfo.enrollmentNumber}
                        </p>
                    </div>
                    <ProfileDrawer student={studentInfo} />
                </header>

                {/* Content Area with Right Sidebar */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto p-6">
                        {children}
                    </main>

                    {/* Desktop Right Profile Sidebar */}
                    <aside className="hidden xl:block w-80 border-l bg-white p-6 overflow-y-auto">
                        <h3 className="text-sm font-semibold text-gray-700 mb-4">Student Profile</h3>
                        <ProfileCard student={studentInfo} />

                        {/* Additional Info */}
                        <div className="mt-6 space-y-4">
                            <div className="rounded-lg border p-4">
                                <h4 className="text-sm font-semibold mb-2">Quick Stats</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Semester:</span>
                                        <span className="font-medium">{studentInfo.semester || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Department:</span>
                                        <span className="font-medium">{studentInfo.department || "N/A"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
