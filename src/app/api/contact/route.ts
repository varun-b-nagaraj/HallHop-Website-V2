const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX_BODY_BYTES = 20_000;

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  school?: unknown;
  role?: unknown;
  message?: unknown;
  website?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ error: "Request is too large." }, { status: 413 });
  }

  let body: ContactRequest;
  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots commonly fill this visually hidden field. Return success without sending.
  if (clean(body.website, 200)) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 254);
  const school = clean(body.school, 160);
  const role = clean(body.role, 100);
  const message = clean(body.message, 3_000);

  if (!name || !EMAIL_PATTERN.test(email) || !school || !role) {
    return Response.json({ error: "Please complete all required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form email is not configured: RESEND_API_KEY is missing.");
    return Response.json({ error: "Email service is unavailable." }, { status: 503 });
  }

  const text = [
    "New HallHop sales inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `School / district: ${school}`,
    `Role: ${role}`,
    "",
    "What they would like to discuss:",
    message || "No additional note.",
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL ?? "HallHop Website <onboarding@resend.dev>",
        to: [process.env.CONTACT_EMAIL ?? "hallhop123@gmail.com"],
        reply_to: email,
        subject: `HallHop sales conversation — ${school}`,
        text,
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected a contact form email.", response.status, await response.text());
      return Response.json({ error: "We could not send your request right now." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form email request failed.", error);
    return Response.json({ error: "We could not send your request right now." }, { status: 502 });
  }
}
