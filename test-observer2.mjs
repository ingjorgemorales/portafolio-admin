import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

// Capture console messages
page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));

await page.goto('http://localhost:4444/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);

// Check if the Header component's useEffect has run by looking at the state
const activeState = await page.evaluate(() => {
  // Access React fiber to check state
  // Instead, let's check the rendered classes directly
  const headerLinks = document.querySelectorAll('header nav a');
  const desktopLinks = Array.from(headerLinks).filter(a => {
    const parent = a.closest('nav');
    return parent && !parent.className.includes('fixed'); // exclude mobile menu
  });
  return desktopLinks.slice(0, 5).map(a => ({
    text: a.textContent.trim(),
    class: a.className,
    active: a.className.includes('bg-blue-100'),
  }));
});
console.log('Initial state:', JSON.stringify(activeState));

// Manually dispatch scroll to trigger observers
await page.evaluate(() => window.scrollTo(0, 1800));
await page.waitForTimeout(1000);

const afterScroll = await page.evaluate(() => {
  const headerLinks = document.querySelectorAll('header nav a');
  const desktopLinks = Array.from(headerLinks).filter(a => {
    const parent = a.closest('nav');
    return parent && !parent.className.includes('fixed');
  });
  return desktopLinks.slice(0, 5).map(a => ({
    text: a.textContent.trim(),
    active: a.className.includes('bg-blue-100'),
  }));
});
console.log('After scroll=1800:', JSON.stringify(afterScroll));

// Let's also check the observer callback directly by wrapping it
const observerDebug = await page.evaluate(() => {
  return new Promise(resolve => {
    // Check all section positions relative to viewport
    const vpH = window.innerHeight;
    const ids = ['hero', 'perfil', 'casos', 'logros', 'stack'];
    const info = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return { id, found: false };
      const rect = el.getBoundingClientRect();
      const detectionZoneTop = vpH * 0.45;
      const detectionZoneBottom = vpH * 0.45; // 0-height zone
      const isInZone = rect.top < detectionZoneBottom && rect.bottom > detectionZoneTop;
      return { id, found: true, top: Math.round(rect.top), bottom: Math.round(rect.bottom), isInZone };
    });
    resolve(info);
  });
});
console.log('Detection zone analysis:', JSON.stringify(observerDebug));

await browser.close();
