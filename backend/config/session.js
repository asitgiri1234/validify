import session from 'express-session';

/**
 * Session middleware placeholder for future Salesforce OAuth.
 */
export function createSessionMiddleware() {
  const secret = process.env.SESSION_SECRET || 'validify-dev-secret-change-in-production';

  return session({
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
    },
  });
}
