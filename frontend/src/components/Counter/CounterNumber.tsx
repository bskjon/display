import { useEffect, useState } from "react"

interface CounterNumberProps {
  value: number;
  height: string;
  translateY?: string;
  isRemoving?: boolean;
}

export default function CounterNumber({ value, height, isRemoving }: CounterNumberProps) {
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const offset = `-${currentValue * 100}%`;


  return (
    <span style={{
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      height: "100%",
      transition: "all 750ms ease",
      lineHeight: 1,
      transform: `translateY(${ isRemoving ? "100%" : offset})`,
    }}
    >
      {[...Array(10)].map((_, value) => (
        <span style={{ height: height, fontSize: height }} key={value}>{value}</span>
      ))}
    </span>
  )
}
