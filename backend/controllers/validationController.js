const initialRules = [
  {
    id: 1,
    name: 'Annual_Revenue_Negative_Check',
    description: 'Prevents negative annual revenue.',
    active: true,
  },
  {
    id: 2,
    name: 'Account_Name_Min_Length',
    description: 'Requires minimum 3 characters.',
    active: true,
  },
  {
    id: 3,
    name: 'Website_HTTPS_Check',
    description: 'Requires HTTPS website URLs.',
    active: false,
  },
  {
    id: 4,
    name: 'Customer_Phone_Required',
    description: 'Requires phone for customer accounts.',
    active: true,
  },
  {
    id: 5,
    name: 'Employee_Count_Limit',
    description: 'Limits employee count.',
    active: false,
  },
];

function cloneRules(data) {
  return typeof structuredClone === 'function' ? structuredClone(data) : JSON.parse(JSON.stringify(data));
}

/** In-memory store for mock MVP (resets on server restart). */
let rules = cloneRules(initialRules);

export function listRules(_req, res) {
  res.json({ success: true, data: rules });
}

export function toggleRule(req, res) {
  const id = Number(req.body?.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ success: false, error: 'Invalid rule id' });
  }

  const rule = rules.find((r) => r.id === id);
  if (!rule) {
    return res.status(404).json({ success: false, error: 'Rule not found' });
  }

  rule.active = !rule.active;
  res.json({ success: true, data: rules });
}

export function toggleAll(req, res) {
  const active = Boolean(req.body?.active);
  rules = rules.map((r) => ({ ...r, active }));
  res.json({ success: true, data: rules });
}

export function deploy(_req, res) {
  res.json({
    success: true,
    message: 'Changes deployed successfully (mock).',
    deployedAt: new Date().toISOString(),
  });
}
