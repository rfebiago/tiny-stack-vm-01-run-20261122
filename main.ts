import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
function run(p, g) {
  const D = new Int32Array(256), C = new Int32Array(64), M = new Int32Array(256), o = new Uint8Array(65536);
  let s = 0, c = 0, l = 0, q = 0, pc = 0, n = 0, x = 0, v = 0, a = 0, b = 0, r = 0, d = '';
  const e = x => [o.slice(0, l), x];
  const j = () => (((p[x - 2] | (p[x - 1] << 8)) << 16) >> 16);
  for (;;) {
    if (n === 1e6) return e(10);
    if (pc < 0 || pc >= p.length) return e(9);
    const t = p[pc];
    if (t === 0x1f) return e(5);
    const m = t === 2 ? 4 : t === 1 ? 1 : t >= 0x30 && t <= 0x33 ? 2 : 0;
    if (pc + m >= p.length) return e(9);
    n++;
    x = pc + 1 + m;
    pc = x;
    if (t >= 0x10 && t <= 0x22 && t !== 0x17 && t !== 0x1b) {
      if (s < 2) return e(2);
      b = D[--s]; a = D[--s];
      if (t >= 0x13 && t <= 0x16 && !b) return e(4);
      if (t === 0x10) r = (a + b) | 0;
      else if (t === 0x11) r = (a - b) | 0;
      else if (t === 0x12) r = Math.imul(a, b);
      else if (t === 0x13) r = (a / b) | 0;
      else if (t === 0x14) r = (a % b) | 0;
      else if (t === 0x15) r = ((a >>> 0) / (b >>> 0)) | 0;
      else if (t === 0x16) r = ((a >>> 0) % (b >>> 0)) | 0;
      else if (t === 0x18) r = a & b;
      else if (t === 0x19) r = a | b;
      else if (t === 0x1a) r = a ^ b;
      else if (t === 0x1c) r = a << (b & 31);
      else if (t === 0x1d) r = a >> (b & 31);
      else if (t === 0x1e) r = (a >>> (b & 31)) | 0;
      else if (t === 0x20) r = a === b ? 1 : 0;
      else if (t === 0x21) r = a < b ? 1 : 0;
      else r = (a >>> 0) < (b >>> 0) ? 1 : 0;
      D[s++] = r;
      continue;
    }
    switch (t) {
      case 0x00: return e(0);
      case 0x01: if (s > 255) return e(3); D[s++] = (p[x - 1] << 24) >> 24; break;
      case 0x02: if (s > 255) return e(3); D[s++] = p[x - 4] | (p[x - 3] << 8) | (p[x - 2] << 16) | (p[x - 1] << 24); break;
      case 0x03: if (s < 1) return e(2); s--; break;
      case 0x04: if (s < 1) return e(2); if (s > 255) return e(3); D[s] = D[s - 1]; s++; break;
      case 0x05: if (s < 2) return e(2); v = D[s - 1]; D[s - 1] = D[s - 2]; D[s - 2] = v; break;
      case 0x06: if (s < 2) return e(2); if (s > 255) return e(3); D[s] = D[s - 2]; s++; break;
      case 0x07: if (s < 3) return e(2); v = D[s - 3]; D[s - 3] = D[s - 2]; D[s - 2] = D[s - 1]; D[s - 1] = v; break;
      case 0x17: if (s < 1) return e(2); D[s - 1] = -D[s - 1] | 0; break;
      case 0x1b: if (s < 1) return e(2); D[s - 1] = ~D[s - 1]; break;
      case 0x30: pc = x + j(); break;
      case 0x31: if (s < 1) return e(2); v = D[--s]; if (!v) pc = x + j(); break;
      case 0x32: if (s < 1) return e(2); v = D[--s]; if (v) pc = x + j(); break;
      case 0x33: if (c === 64) return e(7); C[c++] = x; pc = p[x - 2] | (p[x - 1] << 8); break;
      case 0x34: if (!c) return e(8); pc = C[--c]; break;
      case 0x40: if (s < 1) return e(2); a = D[s - 1]; if (a < 0 || a > 255) return e(6); D[s - 1] = M[a]; break;
      case 0x41: if (s < 2) return e(2); a = D[s - 1]; if (a < 0 || a > 255) return e(6); s -= 2; M[a] = D[s]; break;
      case 0x50: if (s < 1) return e(2); v = D[--s]; d = String(v); if (l + d.length > 65536) return e(11); for (let k = 0; k < d.length; k++) o[l++] = d.charCodeAt(k); break;
      case 0x51: if (s < 1) return e(2); if (l >= 65536) return e(11); o[l++] = D[--s] & 255; break;
      case 0x52: if (s > 255) return e(3); D[s++] = q < g.length ? g[q++] : -1; break;
      case 0x53: if (s < 1) return e(2); return e(D[--s] & 255);
      default: return e(5);
    }
  }
}
const I = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const O = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
for (const d of readdirSync(I).sort()) {
  const r = run(readFileSync(I + '/' + d + '/program.bin'), readFileSync(I + '/' + d + '/input.bin'));
  mkdirSync(O + '/' + d, { recursive: true });
  writeFileSync(O + '/' + d + '/stdout.bin', r[0]);
  writeFileSync(O + '/' + d + '/exit.txt', r[1] + '\n');
}
