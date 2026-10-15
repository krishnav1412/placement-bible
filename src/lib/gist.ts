// Minimal GitHub Gist client used for syncing progress between devices.
// The token is a classic GitHub token with only the `gist` scope, stored on this device.
const API = 'https://api.github.com';
export const GIST_FILE = 'placement-bible.json';

const headers = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
});

export class GistError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
  }
}

async function call(token: string, path: string, init?: RequestInit) {
  let res: Response;
  try {
    res = await fetch(`${API}${path}`, { ...init, headers: { ...headers(token), ...(init?.body ? { 'Content-Type': 'application/json' } : {}) } });
  } catch {
    throw new GistError('No connection to GitHub.');
  }
  if (res.status === 401) throw new GistError('GitHub rejected the key. Create a new one and connect again.', 401);
  if (res.status === 403 || res.status === 404) throw new GistError('This key can’t access gists. Make sure the “gist” box was ticked.', res.status);
  if (!res.ok) throw new GistError(`GitHub error ${res.status}. Try again in a minute.`, res.status);
  return res.json();
}

interface GistFile {
  content?: string;
  truncated?: boolean;
  raw_url?: string;
}
interface Gist {
  id: string;
  files: Record<string, GistFile>;
}

/** Finds the user's existing Placement Bible gist, if any. */
export async function findGist(token: string): Promise<string | null> {
  for (let page = 1; page <= 5; page++) {
    const list = (await call(token, `/gists?per_page=100&page=${page}`)) as Gist[];
    const hit = list.find((g) => g.files && GIST_FILE in g.files);
    if (hit) return hit.id;
    if (list.length < 100) break;
  }
  return null;
}

export async function readGist(token: string, id: string): Promise<string | null> {
  const g = (await call(token, `/gists/${id}`)) as Gist;
  const f = g.files?.[GIST_FILE];
  if (!f) return null;
  if (f.truncated && f.raw_url) {
    const res = await fetch(f.raw_url, { headers: { Authorization: `Bearer ${token}` } });
    return res.ok ? res.text() : null;
  }
  return f.content ?? null;
}

export async function createGist(token: string, content: string): Promise<string> {
  const g = (await call(token, '/gists', {
    method: 'POST',
    body: JSON.stringify({ description: 'Placement Bible - synced progress (secret gist)', public: false, files: { [GIST_FILE]: { content } } }),
  })) as Gist;
  return g.id;
}

export async function writeGist(token: string, id: string, content: string): Promise<void> {
  await call(token, `/gists/${id}`, { method: 'PATCH', body: JSON.stringify({ files: { [GIST_FILE]: { content } } }) });
}
