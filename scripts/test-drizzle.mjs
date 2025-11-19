import { db } from './src/db/index.js';
import { session } from './src/db/schema.js';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testDrizzleQuery() {
    try {
        const token = 'pdtVPKVfqTk7KnrDnT6LGLvKYaVkQ78j';

        console.log('Testing Drizzle ORM query...\n');
        console.log('Token:', token);

        // Try the query using Drizzle ORM
        console.log('\n--- Using Drizzle ORM ---');
        try {
            const result = await db
                .select()
                .from(session)
                .where(eq(session.token, token));

            console.log('✓ Drizzle query succeeded!');
            console.log('Result:', result);
        } catch (error) {
            console.log('✗ Drizzle query failed!');
            console.log('Error:', error);
            console.log('Error message:', error.message);
            console.log('Error stack:', error.stack);
        }

        process.exit(0);
    } catch (error) {
        console.error('Unexpected error:', error);
        process.exit(1);
    }
}

testDrizzleQuery();
