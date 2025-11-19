import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL);

async function resetAuthTables() {
    try {
        console.log('Resetting auth tables...\n');

        // Delete in order to respect foreign key constraints
        console.log('1. Deleting sessions...');
        const sessions = await sql`DELETE FROM session`;
        console.log(`   ✓ Deleted ${sessions.count} session(s)`);

        console.log('2. Deleting accounts...');
        const accounts = await sql`DELETE FROM account`;
        console.log(`   ✓ Deleted ${accounts.count} account(s)`);

        console.log('3. Deleting students...');
        const students = await sql`DELETE FROM students`;
        console.log(`   ✓ Deleted ${students.count} student(s)`);

        console.log('4. Deleting users...');
        const users = await sql`DELETE FROM "user"`;
        console.log(`   ✓ Deleted ${users.count} user(s)`);

        console.log('5. Deleting verifications...');
        const verifications = await sql`DELETE FROM verification`;
        console.log(`   ✓ Deleted ${verifications.count} verification(s)`);

        console.log('\n✓ All auth tables cleared successfully!');
        console.log('You can now sign up with a fresh account.');

        await sql.end();
        process.exit(0);
    } catch (error) {
        console.error('Error resetting tables:', error);
        await sql.end();
        process.exit(1);
    }
}

resetAuthTables();
