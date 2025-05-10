export const ROLES = {
  EMPLOYEE: "employee",
  MANAGER: "manager",
  ADMIN: "admin",
} as const;

export type ROLES = (typeof ROLES)[keyof typeof ROLES];

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
    LEAVE_REQUEST_CREATED: "Leave Request Created Successfully",
    LEAVES_FETCHED: "Leaves Fetched Succefully",
    LEAVE_STATUS_UPDATED: "Succesfully updated leave status",
  },
  ERROR: {
    EMAIL_REQUIRED: "Email is Required",
    PASSWORD_REQUIRED: "Password is Required",
    INVALID_CREDENTIALS: "Invalid credentials",
    USER_NOT_FOUND: "User not found",
    PASSWORD_MISMATCH: "Password and Confirm Password do not match",
    JWT_SECRET_MISSING: "JWT secret is not configured",
    UNAUTHORIZED: "Unauthorized access",
    INVALID_TOKEN: "Invalid or expired token",
    FORBIDDEN: "Forbidden access",
    CANCEL_NOT_ALLOWED: "Cannot cancel this leave",
    LEAVES_NOT_FOUND: "No Leaves Found",
  },
};
