import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { students } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: req.headers });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Generate enrollment number (you can customize this logic)
        const enrollmentNumber = `ENR${Date.now()}`;

        // Create student profile
        await db.insert(students).values({
            userId: session.user.id,
            enrollmentNumber,
            semester: 1,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error creating student profile:", error);
        return NextResponse.json({ error: "Failed to create student profile" }, { status: 500 });
    }
}
