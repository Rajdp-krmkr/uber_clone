import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    /*we are calling the sql neon function inside the POST function, 
    as we have to recall it everytime when it is time to call the database*/

    const { name, email, clerkId } = await request.json(); //destructure the request body

    if (!name || !email || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
    INSERT INTO users (
        name, 
        email,
        clerk_id
    )
    VALUES(
        ${name},
        ${email},
        ${clerkId}
    )
    `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    console.error(error);
    Response.json({ error }, { status: 500 });
  }
}
