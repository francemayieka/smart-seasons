import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data');
const INVITES_FILE = path.join(DATA_DIR, 'admin-invites.json');

export interface Invite {
  token: string;
  expiresAt: number; // timestamp
}

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(INVITES_FILE)) {
    fs.writeFileSync(INVITES_FILE, JSON.stringify([]));
  }
}

export function generateInvite(): string {
  ensureFile();
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes from now

  const content = fs.readFileSync(INVITES_FILE, 'utf-8');
  const invites: Invite[] = JSON.parse(content);
  
  // Cleanup expired
  const validInvites = invites.filter(i => i.expiresAt > Date.now());
  
  validInvites.push({ token, expiresAt });
  fs.writeFileSync(INVITES_FILE, JSON.stringify(validInvites, null, 2));

  return token;
}

export function validateInvite(token: string): boolean {
  ensureFile();
  const content = fs.readFileSync(INVITES_FILE, 'utf-8');
  const invites: Invite[] = JSON.parse(content);

  const inviteIndex = invites.findIndex(i => i.token === token && i.expiresAt > Date.now());
  return inviteIndex !== -1;
}

export function consumeInvite(token: string): boolean {
  ensureFile();
  const content = fs.readFileSync(INVITES_FILE, 'utf-8');
  const invites: Invite[] = JSON.parse(content);

  const inviteIndex = invites.findIndex(i => i.token === token && i.expiresAt > Date.now());
  if (inviteIndex !== -1) {
    invites.splice(inviteIndex, 1); // remove consumed token
    fs.writeFileSync(INVITES_FILE, JSON.stringify(invites, null, 2));
    return true;
  }
  return false;
}
