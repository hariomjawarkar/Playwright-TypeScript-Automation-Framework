import { test, expect } from '@playwright/test';

test('Get Products API', async ({ request }) => {

 const response = await request.get('https://fakestoreapi.com/products');

 expect(response.status()).toBe(200);

 const body = await response.json();

 console.log(body);

});