export interface JwtPayload {
    sub: number; // Subject (user id)
    username: string; // User's username or email
    roles: string[]; // User's roles
    iat?: number; // Issued at (automatically added by JWT)
    exp?: number; // Expiration time (automatically added by JWT)
  }