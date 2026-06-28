import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('http://localhost:4444/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);

const ids = await page.evaluate(() => {
  const ids = ['hero', 'perfil', 'casos', 'logros', 'stack'];
  return ids.map(id => {
    const el = document.getElementById(id);
    if (!el) return { id, found: false };
    const rect = el.getBoundingClientRect();
    return { id, found: true, top: Math.round(rect.top), bottom: Math.round(rect.bottom), h: Math.round(rect.height) };
  });
});
console.log('Sections:', JSON.stringify(ids));

const test = await page.evaluate(() => {
  return new Promise(resolve => {
    const perfil = document.getElementById('perfil');
    if (!perfil) { resolve('no perfil'); return; }
    const io = new IntersectionObserver(entries => {
      resolve({ intersecting: entries[0].isIntersecting, rect: entries[0].boundingClientRect });
    }, { rootMargin: '-45% 0px -55% 0px' });
    io.observe(perfil);
    window.scrollTo(0, perfil.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.4);
    setTimeout(() => { io.disconnect(); resolve('timeout'); }, 2000);
  });
});
console.log('Observer test:', JSON.stringify(test));

await browser.close();
