import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(process.cwd());
const config = JSON.parse(await readFile(path.join(root,'site.config.json'),'utf8'));
const urls=[];
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const full=path.join(dir,entry.name); if(entry.isDirectory()) await walk(full); else if(entry.name==='index.html'||entry.name.endsWith('.html')){let rel='/' + path.relative(root,full).replace(/\\/g,'/'); rel=rel.replace(/index\.html$/,'').replace(/\.html$/,'.html'); if(!rel.includes('/assets/')) urls.push(rel)}}}
await walk(root);
const xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+[...new Set(urls)].sort().map(u=>'<url><loc>'+config.siteUrl+u+'</loc></url>').join('')+'</urlset>';
await writeFile(path.join(root,'sitemap.xml'),xml);
console.log('Generated '+urls.length+' URLs');
