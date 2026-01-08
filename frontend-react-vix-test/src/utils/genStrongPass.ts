export function genStrongPass(length: number = 12): string {
  const numbers = "0123456789";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialChars = "!@#$%^&*()_+-=[]{};':\"|,.<>/?";

  // Ensure at least 2 of each required character type
  const password = [
    numbers[Math.floor(Math.random() * numbers.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)],
    lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)],
    uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)],
    uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)],
    specialChars[Math.floor(Math.random() * specialChars.length)],
    specialChars[Math.floor(Math.random() * specialChars.length)],
  ];

  // Fill the rest of the password with random characters
  const allChars = numbers + lowercaseChars + uppercaseChars + specialChars;
  while (password.length < length) {
    password.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Shuffle the password
  return password.sort(() => 0.5 - Math.random()).join("");
}

export const passwordRegex = {
  numbers: /(?=.*\d.*\d)/,
  lowercase: /(?=.*[a-z].*[a-z])/,
  uppercase: /(?=.*[A-Z].*[A-Z])/,
  special:
    /(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
};

export function validatePassword(password: string, size?: number): boolean {
  if (size && password.length < size) {
    return false;
  }
  return (
    passwordRegex.numbers.test(password) &&
    passwordRegex.lowercase.test(password) &&
    passwordRegex.uppercase.test(password) &&
    passwordRegex.special.test(password)
  );
}
