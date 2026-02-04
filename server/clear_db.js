const { db } = require('./database');

try {
    const stmt = db.prepare('DELETE FROM articles');
    const info = stmt.run();
    console.log(`Deleted ${info.changes} mock articles. The database is now empty.`);
} catch (err) {
    console.error('Error clearing database:', err);
}
