import { NextResponse } from "next/server";
import { validateSignupEmail, validateSignupPassword } from "@/lib/authValidation";
import { hashPassword } from "@/lib/password";
import { createUser, EmailInUseError } from "@/lib/usersStore";

export async function POST(req: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = String(body.email || "");
  const password = String(body.password || "");

  const emailErr = validateSignupEmail(email);
  if (emailErr) {
    return NextResponse.json({ error: emailErr }, { status: 400 });
  }
  const passErr = validateSignupPassword(password);
  if (passErr) {
    return NextResponse.json({ error: passErr }, { status: 400 });
  }

  try {
    const passwordHash = await hashPassword(password);
    createUser(email, passwordHash);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof EmailInUseError) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }
    throw e;
  }
}
