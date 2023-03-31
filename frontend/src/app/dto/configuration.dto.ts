
export interface LayoutColumn {
    view: string | null;
    weight: number;
}

export interface LayoutRow {
    columnCounts: number;
    columns: LayoutColumn[];
    weight: number;
}

export interface Layout {
    rowCounts: number;
    rows: LayoutRow[];
}
  
  


export enum Views {
    ELECTRICITY_PRICE = 'ELECTRICITY_PRICE',
    ELECTRICITY_METER = 'ELECTRICITY_METER',
    ELECTRICITY_WATTAGE = 'ELECTRICITY_WATTAGE',
    ELECTRICITY_PRICE_NOW = 'ELECTRICITY_PRICE_NOW',
}
  

export enum RenderType {
    POPPUP,
    GRID
}