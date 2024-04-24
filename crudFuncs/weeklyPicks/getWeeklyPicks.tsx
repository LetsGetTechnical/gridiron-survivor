//globally accessible env variable
declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            [key: string]: string | undefined;
            PROJECT_ID: string;
            API_KEY: string;
        }
    }
}

export async function getWeeklyPicks() {
    try {
        await fetch(`https://cloud.appwrite.io/v1/databases/${process.env.DATABASE_ID}/collections/${process.env.WEEKLY_PICKS_COLLECTION_ID}/documents`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "X-Appwrite-Project": process.env.PROJECT_ID,
                "X-Appwrite-Key": process.env.API_KEY
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.documents);
            })

    } catch (err) {
        console.error(err);
    }
}