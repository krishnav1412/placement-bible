// Assembles the hosted page: artifact/placement-bible.html (no <html>/<head>/<body> — the
// host adds those). React comes from cdnjs; the app's own JS and CSS are inlined.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const js = readFileSync('dist-artifact/app.js', 'utf8').replace(/<\/script/gi, '<\\/script');
const css = readFileSync('dist-artifact/app.css', 'utf8').replace(/<\/style/gi, '<\\/style');

const html = `<title>Placement Bible</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=JetBrains+Mono:wght@500&family=Public+Sans:wght@400;500;600&display=swap">
<style>${css}</style>
<div id="root"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script>${js}</script>
`;

mkdirSync('artifact', { recursive: true });
writeFileSync('artifact/placement-bible.html', html);
console.log(`artifact/placement-bible.html  ${(html.length / 1024).toFixed(0)} KB`);
