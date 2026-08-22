export type PasswordRequirement = {
  id: string;
  label: string;
  test: (password: string) => boolean;
};

export const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  { id: "length", label: "At least 8 characters", test: (p) => p.length >= 8 },
  { id: "uppercase", label: "One capital letter", test: (p) => /[A-Z]/.test(p) },
  {
    id: "special",
    label: "One special symbol",
    test: (p) => /[!@#$%^&*(),.?":{}|<>_\-+=[\]/\\~`]/.test(p),
  },
];

export function isPasswordValid(password: string): boolean {
  return PASSWORD_REQUIREMENTS.every((req) => req.test(password));
}