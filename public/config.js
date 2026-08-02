const LOCATIONS = {
  cubacuba: {
    id: 'cubacuba',
    name: 'Snack Bar Cuba Cuba',
    subtitle: 'Sabores autenticos de Cuba',
    apiBase: '/api',
    roles: {
      maitre: { password: 'hotel2026', label: 'Maitre', fullAccess: true },
      capitan: { password: 'capitan2026', label: 'Capitan', fullAccess: false }
    }
  },
  ranchon: {
    id: 'ranchon',
    name: 'Bar Ranchon Santa Clara',
    subtitle: 'El mejor ambiente y bebidas',
    apiBase: '/api',
    roles: {
      maitre: { password: 'ranchon2026', label: 'Maitre', fullAccess: true },
      capitan: { password: 'capitan2026', label: 'Capitan', fullAccess: false }
    }
  }
};

function getCurrentLocation() {
  const params = new URLSearchParams(window.location.search);
  const loc = params.get('loc');
  if (loc && LOCATIONS[loc]) return LOCATIONS[loc];
  const saved = localStorage.getItem('location');
  if (saved && LOCATIONS[saved]) return LOCATIONS[saved];
  return LOCATIONS.cubacuba;
}

function setLocation(locId) {
  localStorage.setItem('location', locId);
}

function getRole() {
  return sessionStorage.getItem('adminRole') || null;
}

function isMaitre() {
  return getRole() === 'maitre';
}

function setRole(role) {
  sessionStorage.setItem('adminRole', role);
}

function clearSession() {
  sessionStorage.removeItem('adminAuth');
  sessionStorage.removeItem('adminRole');
}
