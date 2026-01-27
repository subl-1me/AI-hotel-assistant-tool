export const INTENT_PATTERNS = [
  {
    type: 'AUTHENTICATE',
    regex: /confirmaci[oó]n\s+#?\d+/i,
    entites: [{ name: 'CONFIRMATION_NUMBER', pattern: /\d+/ }],
  },
];
