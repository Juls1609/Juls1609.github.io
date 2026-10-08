import { readFile, writeFile } from 'node:fs/promises';

const [inputPath, outputPath] = process.argv.slice(2);

if (!inputPath || !outputPath) {
  throw new Error('Usage: node scripts/generate-bracket-preview.mjs <bracket.csv> <preview.svg>');
}

const csv = await readFile(inputPath, 'utf8');
const [header, ...lines] = csv.trim().split(/\r?\n/);
const fields = header.split(',');
const matches = new Map(lines.map((line) => {
  const values = line.split(',');
  return [values[0], Object.fromEntries(fields.map((field, index) => [field, values[index]]))];
}));

const escapeXml = (value) => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&apos;', '"': '&quot;' })[character]);
const left32 = ['M74', 'M77', 'M73', 'M75', 'M83', 'M84', 'M81', 'M82'];
const left16 = ['M89', 'M90', 'M93', 'M94'];
const leftQf = ['M97', 'M98'];
const right32 = ['M76', 'M78', 'M79', 'M80', 'M86', 'M88', 'M85', 'M87'];
const right16 = ['M91', 'M92', 'M95', 'M96'];
const rightQf = ['M99', 'M100'];

function card(matchId, x, y, width = 180, height = 64) {
  const match = matches.get(matchId);
  const homeWin = Number.parseFloat(match.home_win_probability);
  const awayWin = Number.parseFloat(match.away_win_probability);
  const homeClass = homeWin >= awayWin ? 'winner' : '';
  const awayClass = awayWin > homeWin ? 'winner' : '';
  return `<g transform="translate(${x} ${y})"><rect class="card" width="${width}" height="${height}" rx="7"/><text class="match" x="11" y="17">${match.match_id} · ${escapeXml(match.round)}</text><text class="team ${homeClass}" x="11" y="39">${escapeXml(match.home_team)}</text><text class="prob ${homeClass}" x="${width - 11}" y="39" text-anchor="end">${match.home_win_probability}</text><text class="team ${awayClass}" x="11" y="56">${escapeXml(match.away_team)}</text><text class="prob ${awayClass}" x="${width - 11}" y="56" text-anchor="end">${match.away_win_probability}</text></g>`;
}

function connector(x1, y1, x2, y2) {
  return `<path class="connector" d="M ${x1} ${y1} H ${(x1 + x2) / 2} V ${y2} H ${x2}"/>`;
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1720 820" role="img" aria-labelledby="title description">
  <title id="title">World Cup 2026 Predictor consensus bracket</title>
  <desc id="description">A projected World Cup 2026 knockout bracket generated from 20,000 Monte Carlo tournament simulations.</desc>
  <style>
    .background { fill: #ffffff; } .card { fill: #ffffff; stroke: #d9dce3; stroke-width: 1.2; }
    .match { fill: #697386; font: 600 10px system-ui, sans-serif; } .team { fill: #243047; font: 600 11px system-ui, sans-serif; }
    .prob { fill: #243047; font: 600 10px system-ui, sans-serif; } .winner { fill: #249354; font-weight: 800; }
    .heading { fill: #5077e9; font: 700 11px system-ui, sans-serif; letter-spacing: .02em; } .final-heading { fill: #249354; font: 800 22px system-ui, sans-serif; }
    .connector { fill: none; stroke: #d9dce3; stroke-width: 1.2; }
  </style>
  <rect class="background" width="1720" height="820"/>
  <text class="heading" x="15" y="76">L: ROUND OF 32</text><text class="heading" x="225" y="76">L: ROUND OF 16</text><text class="heading" x="435" y="76">L: QUARTER-FINALS</text>
  <text class="heading" x="645" y="76">SEMI-FINAL L</text><text class="final-heading" x="795" y="76">🏆 World Cup Finals</text><text class="heading" x="995" y="76">SEMI-FINAL R</text>
  <text class="heading" x="1120" y="76">R: QUARTER-FINALS</text><text class="heading" x="1330" y="76">R: ROUND OF 16</text><text class="heading" x="1540" y="76">R: ROUND OF 32</text>
  ${left32.map((id, index) => card(id, 15, 110 + index * 78)).join('')}
  ${left16.map((id, index) => card(id, 225, 150 + index * 156)).join('')}
  ${leftQf.map((id, index) => card(id, 435, 228 + index * 312)).join('')}
  ${card('M101', 645, 384, 120)}${card('M104', 795, 365, 150, 76)}${card('M103', 795, 548, 150, 64)}
  ${card('M102', 995, 384, 120)}${rightQf.map((id, index) => card(id, 1120, 228 + index * 312)).join('')}
  ${right16.map((id, index) => card(id, 1330, 150 + index * 156)).join('')}${right32.map((id, index) => card(id, 1540, 110 + index * 78)).join('')}
  ${[0, 1, 2, 3].map((index) => connector(195, 142 + index * 156, 225, 182 + index * 156)).join('')}
  ${[0, 1, 2, 3].map((index) => connector(405, 182 + index * 156, 435, 260 + index * 312)).join('')}
  ${[0, 1].map((index) => connector(615, 260 + index * 312, 645, 416)).join('')}
  ${connector(765, 416, 795, 403)}${connector(1115, 416, 945, 403)}
  ${[0, 1].map((index) => connector(1120, 260 + index * 312, 1115, 416)).join('')}
  ${[0, 1, 2, 3].map((index) => connector(1330, 182 + index * 156, 1120, 260 + Math.floor(index / 2) * 312)).join('')}
  ${[0, 1, 2, 3].map((index) => connector(1540, 142 + index * 156, 1510, 182 + index * 156)).join('')}
  <text class="match" x="795" y="535">BRONZE FINAL</text>
</svg>`;

await writeFile(outputPath, svg);
