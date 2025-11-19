import { db } from "@/db";
import { session } from "@/db/schema";

async function clearSessions() {
    try {
        console.log("Clearing all sessions...");
        await db.delete(session);
        console.log("✓ All sessions cleared successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error clearing sessions:", error);
        process.exit(1);
    }
}

clearSessions();
