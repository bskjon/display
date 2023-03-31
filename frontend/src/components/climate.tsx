import  Icon from "@mui/material/Icon"
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { display, positions } from "@mui/system";
import React from "react";
import tinycolor from 'tinycolor2';


export interface Icon {
    icon: any,
    color: string,
    size: string
}

export interface Value {
    value?: number,
    unit?: string,
    size: string
}

export interface ClimateProps {
    title?: string,
    icon: Icon,
    data?: Value

}

export default function Climate({title, icon, data}: ClimateProps) {
    const tc = tinycolor(icon?.color)
    const adjusted = tc.darken(25).toString();
    const finalColor = tinycolor(adjusted).setAlpha(0.75).toString();
    //const finalColor = tinycolor(adjusted).setAlpha(0.75).toString();
    const sz = `${icon.size}rem`

    return(
        <div style={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap"
        }}>
            <div style={{ display: "flex",  height: sz, width: sz, minWidth: sz, minHeight: sz }}>
                <Icon style={{ 
                    backgroundColor: finalColor,
                    borderRadius: "50%",
                    width: '100%',
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",        
                    }} fontSize="large" >
                    {React.cloneElement(icon.icon, { style: { width: "75%", height: "75%", color: icon.color } })}
                </Icon>
            </div>
            <div style={{marginLeft: "10px", textAlign: "left"}}>
                <h1 style={{
                    margin: "0px"
                }}>{title}</h1>
                <p style={{
                    margin: "0px",
                    fontSize: data?.size || "10rem"
                }}>{data?.value}{data?.unit}</p>
            </div>
        </div>


    )
}


