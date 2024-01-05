export function validatePhoneNumber(phoneNumber: string): boolean {
  return new RegExp('^(\\+98|0)?9\\d{9}$').test(phoneNumber);
}

export function validateNationalCode(nationalCode: string) {
  if (!/^\d{10}$/.test(nationalCode)) return false;
  const check: number = +nationalCode[9];
  const sum: number =
    nationalCode
      .split('')
      .slice(0, 9)
      .reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
  return sum < 2 ? check === sum : check + sum === 11;
}
