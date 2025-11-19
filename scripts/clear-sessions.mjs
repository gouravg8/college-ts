import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL);

async function clearSessions() {
    try {
        console.log('Clearing all sessions...');
        const result = await sql`DELETE FROM session`;
        console.log(`✓ Cleared ${result.count} session(s) successfully`);
        await sql.end();
        process.exit(0);
    } catch (error) {
        console.error('Error clearing sessions:', error);
        await sql.end();
        process.exit(1);
    }
}

clearSessions();
