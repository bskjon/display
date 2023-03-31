import { Icon } from "@mui/material";
import tinycolor from "tinycolor2";
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import React from "react";

interface WarningProps {
    title: string,
    message: string,
    size: number
}

export default function Warning({title, message, size}: WarningProps) {
    const color = "#ffb100"
    const tc = tinycolor(color)
    const adjusted = tc.darken(25).toString();
    const finalColor = tinycolor(adjusted).setAlpha(0.75).toString();
    //const finalColor = tinycolor(adjusted).setAlpha(0.75).toString();
    const icon = <ReportProblemOutlinedIcon />
    const _size = `${size}rem`

    return(
        <div style={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap"
        }}>
            <div style={{ display: "flex",  height: _size, width: _size, minWidth: _size, minHeight: _size, margin: "auto" }}>
                <Icon style={{ 
                    backgroundColor: finalColor,
                    borderRadius: "50%",
                    width: '100%',
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",        
                    }} fontSize="large" >
                    {React.cloneElement(icon, { style: { width: "75%", height: "75%", color: color } })}
                </Icon>
            </div>
            <div style={{marginLeft: "10px", textAlign: "left"}}>
                <h1 style={{
                    margin: "0px",
                    textAlign: "center"
                }}>{title}</h1>
                <p style={{
                    margin: "0px",
                    textAlign: "center"
                }}>{message}</p>
            </div>
        </div>


    )
}