import { account } from "./config";
import { ID } from "appwrite";

export async function POST(request: Request): Promise<Response> {
    const { email, password } = await request.json();

    try {
        const response = await account.create(ID.unique(), email, password);
        
        return new Response(JSON.stringify(response), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
