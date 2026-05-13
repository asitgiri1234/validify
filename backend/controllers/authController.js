export function login(_req, res) {
  res.json({
    success: true,
    message: 'Authentication ready (mock). Salesforce OAuth will be wired here later.',
    user: {
      id: 'mock-user-1',
      name: 'Demo User',
      email: 'demo@validify.app',
    },
  });
}

export function logout(req, res) {
  if (!req.session) {
    return res.json({ success: true, message: 'Logged out.' });
  }

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    return res.json({ success: true, message: 'Logged out.' });
  });
}
