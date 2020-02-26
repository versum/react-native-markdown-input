import { MarkdownSymbols } from './markdownSymbols';

export type MarkdownSymbol = keyof typeof MarkdownSymbols;

export type Selection = { start: number; end: number };
