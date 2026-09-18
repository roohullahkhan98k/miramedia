/** Set MAINTENANCE_MODE=true in .env.local (or your host's env) to enable. */
export function isMaintenanceMode() {
  return process.env.MAINTENANCE_MODE === "true";
}
