export interface ICategory {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface IPriceChange {
  dir: "up" | "down";
  pct: number;
}

export interface alter{
  market:string,
  division:string,
  min:number,
  max:number
}

export interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: IPriceChange;
  market?:alter[]
}