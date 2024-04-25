export async function getWeeklyPicks() {
    try {
        return await fetch(`https://cloud.appwrite.io/v1/databases/${process.env.DATABASE_ID}/collections/${process.env.WEEKLY_PICKS_COLLECTION_ID}/documents`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "X-Appwrite-Project": "6616ea581ef9f5521c7d",
            },
        })
    } catch (err) {
        console.error(err);
    }
}