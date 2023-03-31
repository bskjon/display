import { Layout, LayoutRow, Views } from "../app/dto/configuration.dto";
import Warning from "../components/warning";
import { ElectricityMeterGraphComponent, ElectricityPriceBlock, ElectricityPriceGraphComponent } from "./electricity";
import { WattageCounter } from "./wattageCounter";

function isViewType(value: string): value is Views {
    return Object.values(Views).includes(value as Views);
}

interface LayoutProps {
    layout: Layout;
}


const mapped = {
    [Views.ELECTRICITY_METER]: ElectricityMeterGraphComponent,
    [Views.ELECTRICITY_PRICE]: ElectricityPriceGraphComponent,
    [Views.ELECTRICITY_WATTAGE]: WattageCounter,
    [Views.ELECTRICITY_PRICE_NOW]: ElectricityPriceBlock

}



function mapToComponent(type: string) {
    const warning = <Warning 
        size={5} 
        title="Invalid enum" 
        message={`Can't create component on ${type}, as it is not present within the dictionary`} 
    />;

    if (!isViewType(type)) {
      return warning
    }
  
    const Comp = mapped[type];
    if (!Comp) {
        return warning
    }
    return <Comp />;
  }

export default function LayoutComponent({layout}: LayoutProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {layout.rows.map((row, rowIndex) => (
                <div
                key={rowIndex}
                style={{ display: 'flex', flex: row.weight, height: '100%' }}
                >
                {row.columns.map((column, columnIndex) => (
                    <div key={columnIndex} style={{ flex: column.weight }}>
                    {column.view && 
                        <div style={{height: '100%', width: '100%', margin: 'auto'}}>
                            {mapToComponent(column.view)}
                        </div>}
                    </div>
                ))}
                </div>
            ))}
        </div>
      );
}
