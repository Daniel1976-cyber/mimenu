const LOCATIONS = {
  cubacuba: {
    id: 'cubacuba',
    name: 'Snack Bar Cuba Cuba',
    subtitle: 'Sabores autenticos de Cuba',
    password: 'hotel2026',
    apiBase: '/api'
  },
  ranchon: {
    id: 'ranchon',
    name: 'Bar Ranchon Santa Clara',
    subtitle: 'El mejor ambiente y bebidas',
    password: 'ranchon2026',
    apiBase: '/api'
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
