export const ROLES = {
  EMPLOYEE: "employee",
  MANAGER: "manager",
  ADMIN: "admin",
};

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const MESSAGES = {
  SUCCESS: {
    LOGIN: "Login successful",
    LOGOUT: "Logout successful",
  },
  ERROR: {
    INVALID_CREDENTIALS: "Invalid credentials",
    USER_NOT_FOUND: "User not found",
    PASSWORD_MISMATCH: "Password and Confirm Password do not match",
  },
};
