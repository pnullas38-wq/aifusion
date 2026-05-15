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

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

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
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(USERS_FILE, JSON.stringify(store), "utf-8");
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
  return user;
}
