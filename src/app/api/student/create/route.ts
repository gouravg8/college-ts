import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { students } from "@/db/schema"; // Ensure this imports your table definition
import { auth } from "@/lib/auth";
import { headers } from "next/headers"; // ✅ Better way to get headers
import { eq } from "drizzle-orm"; // ✅ Needed for checking duplicates

export async function POST(req: NextRequest) {
  try {
    // 1. Use standard Next.js headers helper
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    console.log({ session });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Check if Student Profile already exists
    const existingStudent = await db
      .select()
      .from(students)
      .where(eq(students.userId, session.user.id))
      .limit(1);

    console.log({ existingStudent });

    if (existingStudent.length > 0) {
      return NextResponse.json(
        { error: "Student profile already exists" },
        { status: 409 }, // 409 Conflict
      );
    }

    // 3. Generate Enrollment Number
    const enrollmentNumber = `ENR${Date.now()}`;

    // 4. Create student profile
    await db.insert(students).values({
      userId: session.user.id,
      enrollmentNumber,
      semester: 1,
      // If you are sending data from the frontend (like 'department'),
      // you would do: const body = await req.json();
      // and use body.department here.
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating student profile:", error);
    return NextResponse.json(
      { error: "Failed to create student profile" },
      { status: 500 },
    );
  }
}
