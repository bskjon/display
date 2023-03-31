import { useEffect, useState } from "react"
import CounterNumber from "./CounterNumber"

interface CounterProps {
  value: number;
  height?: string;
}

export default function Counter({ value, height = "10rem"}: CounterProps) {
  const [digits, setDigits] = useState<number[]>([])

  useEffect(() => {
    const digitsArray = value.toString().split("").map(Number)
    setDigits(digitsArray)
   // console.log(value)
  }, [value])


  return (
    <div style={{
      height: height,
      display: "flex",
      fontSize: height,
      overflow: "hidden"
    }}>
      {digits.map((digit, index) => (
        <CounterNumber
          key={index}
          value={digit}
          height={height}
        />
      ))}
    </div>
  )
}
