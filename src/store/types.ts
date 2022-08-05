import { buttonNames } from './consts';

export interface ISwapModel {
  id: string;
  address: string;
  title: string;
  description: string;
  blocksCount: number;
  selected?: boolean;
}

export type TSearchOptions = keyof typeof buttonNames;
