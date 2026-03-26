export const Messages = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password.',
    LOGGED_IN: 'Login successful.',
    UNAUTHORIZED: 'You are not authorized to access this resource.',
  },

  USER: {
    NOT_FOUND: 'User not found.',
    ALREADY_EXISTS: 'A user with this email already exists.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    CREATED: 'User created successfully.',
    DELETED: 'User removed successfully.',
  },

  POST: {
    NOT_FOUND: 'The requested post was not found.',
    CREATED: 'Post published successfully.',
    UPDATED: 'Post updated successfully.',
    DELETED: 'Post removed successfully.',
  },

  CATEGORY: {
    NOT_FOUND: 'Category not found.',
    CREATED: 'Category created successfully.',
    ALREADY_EXISTS: 'A category with this name already exists.',
    DELETED: 'Category removed successfully.',
  },

  ROLE: {
    NOT_FOUND: 'Role not found.',
    DELETED: 'Role removed successfully.',
    ALREADY_EXISTS: 'A role with this name already exists.',
    INSUFFICIENT_PRIVILEGES: 'Your role does not allow this operation.',
  },
};
