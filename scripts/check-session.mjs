import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL);

async function getCurrentSessions() {
    try {
        console.log('=== Current Sessions ===\n');

        const sessions = await sql`
            SELECT s.id, s.token, s.user_id, s.expires_at, u.email
            FROM session s
            JOIN "user" u ON s.user_id = u.id
            ORDER BY s.created_at DESC
        `;

        if (sessions.length === 0) {
            console.log('No sessions found in database.');
        } else {
            console.log(`Found ${sessions.length} session(s):\n`);
            sessions.forEach((s, i) => {
                console.log(`${i + 1}. Email: ${s.email}`);
                console.log(`   Token: ${s.token}`);
                console.log(`   Expires: ${s.expires_at}`);
                console.log(`   User ID: ${s.user_id}\n`);
            });

            console.log('\n💡 To test with a valid session:');
            console.log('   1. Clear your browser cookies');
            console.log('   2. Open browser DevTools → Application → Cookies');
            console.log(`   3. Add a cookie named "better-auth.session_token" with value: ${sessions[0].token}`);
            console.log('   4. Refresh the page');
        }

        await sql.end();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        await sql.end();
        process.exit(1);
    }
}

getCurrentSessions();
