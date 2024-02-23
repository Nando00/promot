import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import {prisma} from "@/lib/db"
export async function POST(req: Request) {
 
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
 
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
 
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
 
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }
 
  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);
 
  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
 
  let evt: WebhookEvent
 
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }
 
  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;
  const firstName = payload.data.first_name as string;
  const lastName = payload.data.last_name as string;
  const userId = payload.data.id.trim() as string
  // the name is first name and last name
  const name = `${firstName} ${lastName}`;

  // console.log(`Webhook with and ID of ${evt.data} and type of ${eventType}`)
  // console.log('the type of id is ', email)
  // console.log('the name is ', name)

  switch (evt.type) {
    case 'user.created':
    case 'user.updated':
        // email
        const email = payload.data.email_addresses[0].email_address as string;

        // Perform the database operation for created or updated user
        await prisma.user.upsert({
            where: { email: email as string },
            update: {
                name: `${firstName} ${lastName}`,
            },
            create: {
                email: email,
                name: `${firstName} ${lastName}`,
                clerkId: userId
                // Add other necessary fields as per your schema
            },
        });
        console.log(`User processed: ${evt.type}`);
        break;

    case 'user.deleted':
        // deleting the user
        await prisma.user.delete({
            where: { 
              clerkId: userId
            },
        });
        console.log('User deleted');
        break;

    default:
        console.log(`Unhandled event type: ${evt.type}`);
        return new Response('Unhandled event type', { status: 400 })
}
  return new Response('', { status: 200 })
}
 