// Shared by every admin-side fetch call that hits a protected API route
// (see requireAdminAuth in server.ts). The key is set by AuthContext's
// login() and must be sent as `x-admin-key` on every such request.
export const ADMIN_KEY_STORAGE = 'tanso_admin_key';

export function getAdminKey(): string {
  return localStorage.getItem(ADMIN_KEY_STORAGE) || '';
}

export function adminHeaders(extra?: Record<string, string>): Record<string, string> {
  return {
    ...(extra || {}),
    'x-admin-key': getAdminKey(),
  };
}
