const mockUser = {
  id: 'mock-user-1',
  name: 'Demo User',
  email: 'demo@validify.app',
};

export function login(req, res) {
  req.session.user = mockUser;
  req.session.connectedAt = new Date().toISOString();

  res.json({
    success: true,
    message: 'Authentication ready (mock). Salesforce OAuth will be wired here later.',
    user: mockUser,
  });
}

export function getSession(req, res) {
  if (req.session?.user) {
    return res.json({
      success: true,
      authenticated: true,
      user: req.session.user,
      connectedAt: req.session.connectedAt ?? null,
    });
  }

  res.json({
    success: true,
    authenticated: false,
    user: null,
    connectedAt: null,
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
