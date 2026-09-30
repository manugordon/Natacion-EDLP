import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('home renders the eight athletes without tabs, favorites or search', async () => {
  const { default: worker } = await import('../dist/server/index.js');
  const response = await worker.fetch(new Request('http://localhost/', { headers: { accept: 'text/html' } }), { ASSETS: { fetch: async () => new Response('Not found', { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html lang="es-AR"/);
  assert.match(html, /Seguí a EDELP/);
  assert.match(html, /name="viewport"/);
  assert.equal((html.match(/class="athlete-card"/g) || []).length, 8);
  assert.doesNotMatch(html, /<nav|<input|aria-pressed|Mis nadadores|Buscar por nombre|Ver quiénes nadan/);
  assert.match(html, /escudo-edlp.webp/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
});

test('entry dataset preserves the 27 supplied times and original team order', async () => {
  const source = await readFile(new URL('../app/athletes.ts', import.meta.url), 'utf8');
  const athletes = JSON.parse(source.split('export const athletes: Athlete[] = ')[1].trim().replace(/;$/, ''));
  assert.deepEqual(athletes.map(a => a.events.length), [4,5,3,4,4,2,3,2]);
  assert.deepEqual(athletes.map(a => a.age), [55,58,58,41,42,56,62,39]);
  assert.equal(athletes[0].name, 'María De La Paz Gibert');
  assert.equal(athletes[7].name, 'Marcela Luciana Tobes');
  assert.deepEqual(athletes.map(a => a.events.map(e => [e.eventNumber,e.seedTime])), [
    [[3,'7:55.00'],[9,'3:50.00'],[17,'3:50.00'],[29,'1:50.00']],
    [[1,'13:39.65'],[5,'3:11.74'],[27,'3:51.32'],[35,'6:36.07'],[37,'1:48.88']],
    [[2,'11:20.00'],[6,'2:20.00'],[36,'5:18.00']],
    [[5,'3:25.00'],[11,'1:34.32'],[15,'41.73'],[35,'7:14.00']],
    [[8,'27.02'],[12,'56.80'],[16,'25.22'],[20,'1:04.00']],
    [[13,'1:00.00'],[37,'2:40.00']],
    [[14,'48.94'],[16,'38.55'],[34,'40.25']],
    [[15,'32.91'],[17,'3:20.13']]
  ]);
});
