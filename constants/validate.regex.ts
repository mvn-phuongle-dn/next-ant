export const PASSWORD = {
  pattern:
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  /(?=^.{8,}$)/,
  message: `Please enter at least 8 characters.
  `,
};
