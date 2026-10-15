// Minimal Node typings for the data scripts (avoids pulling in @types/node for the app).
declare module 'node:fs' {
  export function readFileSync(path: string, encoding: string): string;
}
declare const process: { argv: string[]; exit(code: number): never };
