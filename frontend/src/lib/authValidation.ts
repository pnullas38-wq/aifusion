const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSignupEmail(email: string): string | null {
  const t = email.trim().toLowerCase();
  if (!t || t.length > 254) return "Enter a valid email.";
  if (!EMAIL_RE.test(t)) return "Enter a valid email.";
  return null;
}

export function validateSignupPassword(password: string): string | null {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (password.length > 128) return "Password is too long.";
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return "Password must include at least one letter and one number.";
  }
  return null;
}
