import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

type Store = { users: UserRecord[] };

function resolveUsersFile(): string {
  const fromEnv = process.env.AUTH_USERS_FILE?.trim();
  if (fromEnv) return path.resolve(fromEnv);
  const dirFromEnv = process.env.AUTH_DATA_DIR?.trim();
  const baseDir = dirFromEnv
    ? path.resolve(dirFromEnv)
    : path.join(process.cwd(), "data");
  return path.join(baseDir, "users.json");
}

const USERS_FILE = resolveUsersFile();
const DATA_DIR = path.dirname(USERS_FILE);

function readStore(): Store {
  try {
    const raw = fs.readFileSync(USERS_FILE, "utf-8");
    const data = JSON.parse(raw) as Store;
    if (!data || !Array.isArray(data.users)) return { users: [] };
    return data;
  } catch {
    return { users: [] };
  }
}

function writeStore(store: Store): void {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(USERS_FILE, JSON.stringify(store), "utf-8");
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(
      `Could not write user data to ${USERS_FILE}: ${msg}. Set AUTH_USERS_FILE or AUTH_DATA_DIR to a writable folder.`
    );
  }
}

export function findUserByEmail(email: string): UserRecord | undefined {
  const e = email.trim().toLowerCase();
  return readStore().users.find((u) => u.email === e);
}

export class EmailInUseError extends Error {
  constructor() {
    super("EMAIL_IN_USE");
    this.name = "EmailInUseError";
  }
}

export function createUser(email: string, passwordHash: string): UserRecord {
  const store = readStore();
  const e = email.trim().toLowerCase();
  if (store.users.some((u) => u.email === e)) {
    throw new EmailInUseError();
  }
  const user: UserRecord = {
    id: randomUUID(),
    email: e,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  store.users.push(user);
  writeStore(store);
  const roundTrip = readStore().users.find((u) => u.email === e);
  if (!roundTrip) {
    throw new Error(
      "Account was not saved. If you use serverless hosting (e.g. Vercel), file storage is not persistent—use a database or a writable AUTH_USERS_FILE on a VPS."
    );
  }
  return user;
}
