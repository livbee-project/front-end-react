import fs from 'fs';
import path from 'path';

const paletteReplacements = [
  ['#687CF4', 'palette.primary'],
  ['#687cf4', 'palette.primary'],
  ['#030213', 'palette.text'],
  ['#717182', 'palette.subText'],
  ['#F5F6FF', 'palette.background'],
  ['#f5f6ff', 'palette.background'],
  ['#ffffff', 'palette.surface'],
  ['#FFFFFF', 'palette.surface'],
];

const styledReplacements = [
  ['#687CF4', '${({ theme }) => theme.colors.primary}'],
  ['#687cf4', '${({ theme }) => theme.colors.primary}'],
  ['#8B7CFF', '${({ theme }) => theme.colors.primary}'],
  ['#030213', '${({ theme }) => theme.colors.text}'],
  ['#0f0f17', '${({ theme }) => theme.colors.text}'],
  ['#1f1f25', '${({ theme }) => theme.colors.text}'],
  ['#3a3b4f', '${({ theme }) => theme.colors.text}'],
  ['#434659', '${({ theme }) => theme.colors.text}'],
  ['#444556', '${({ theme }) => theme.colors.text}'],
  ['#717182', '${({ theme }) => theme.colors.muted}'],
  ['#7d8299', '${({ theme }) => theme.colors.muted}'],
  ['#a0a1b2', '${({ theme }) => theme.colors.muted}'],
  ['#696a7c', '${({ theme }) => theme.colors.muted}'],
  ['#F5F6FF', '${({ theme }) => theme.colors.secondary}'],
  ['#f5f6ff', '${({ theme }) => theme.colors.secondary}'],
  ['#f4f5fb', '${({ theme }) => theme.colors.secondary}'],
  ['#f5f6fc', '${({ theme }) => theme.colors.secondary}'],
  ['#ffffff', '${({ theme }) => theme.colors.surface}'],
  ['#FFFFFF', '${({ theme }) => theme.colors.surface}'],
  ['#fff', '${({ theme }) => theme.colors.surface}'],
  ['#EEE7F5', '${({ theme }) => theme.colors.border}'],
  ['#eceff7', '${({ theme }) => theme.colors.border}'],
  ['#e1e4f2', '${({ theme }) => theme.colors.border}'],
  ['#E5E7EB', '${({ theme }) => theme.colors.border}'],
  ['#e0e0e0', '${({ theme }) => theme.colors.border}'],
  ['#dfe3f3', '${({ theme }) => theme.colors.border}'],
  ['#d8dae8', '${({ theme }) => theme.colors.border}'],
  ['#ff5c5c', '${({ theme }) => theme.colors.error}'],
  ['#ef4444', '${({ theme }) => theme.colors.error}'],
];

const skip = new Set(['theme.ts', 'tokens.ts', 'themeCssVars.ts', 'migrate-hex-colors.mjs']);

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory() && !['node_modules', 'dist'].includes(ent.name)) walk(p);
    else if (ent.isFile() && /\.(tsx?)$/.test(ent.name) && !skip.has(ent.name)) {
      if (p.includes('styles\\theme') || p.includes('styles/tokens')) continue;
      let s = fs.readFileSync(p, 'utf8');
      if (!/#[0-9A-Fa-f]{3,8}/.test(s)) continue;
      const isStory = p.includes('.stories.') || p.includes('StoryContent');
      const hasStyled = s.includes('styled.');
      let changed = false;
      if (isStory && !s.includes("from '@/presentation/styles/tokens'")) {
        s = "import { palette } from '@/presentation/styles/tokens';\n" + s;
        changed = true;
      }
      const reps = isStory ? paletteReplacements : hasStyled ? styledReplacements : paletteReplacements;
      for (const [from, to] of reps) {
        if (s.includes(from)) {
          s = s.split(from).join(to);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(p, s);
        console.log('updated', p);
      }
    }
  }
}

walk('src');
