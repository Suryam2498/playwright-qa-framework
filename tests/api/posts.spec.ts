import { test, expect } from '@playwright/test';

test.describe('Posts API (JSONPlaceholder)', () => {
  test('GET a single post returns expected schema', async ({ request }) => {
    const res = await request.get('/posts/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({
      id: 1,
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
  });

  test('GET posts filtered by userId returns only that user', async ({ request }) => {
    const res = await request.get('/posts', { params: { userId: 1 } });
    expect(res.ok()).toBeTruthy();
    const posts: Array<{ userId: number }> = await res.json();
    expect(posts.length).toBeGreaterThan(0);
    for (const p of posts) expect(p.userId).toBe(1);
  });

  test('POST creates a resource and echoes the payload', async ({ request }) => {
    const payload = { title: 'qa demo', body: 'created by playwright', userId: 7 };
    const res = await request.post('/posts', { data: payload });
    expect(res.status()).toBe(201);
    expect(await res.json()).toMatchObject(payload);
  });

  test('unknown resource returns 404', async ({ request }) => {
    const res = await request.get('/posts/999999');
    expect(res.status()).toBe(404);
  });
});
