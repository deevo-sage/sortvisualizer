import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { useControls } from 'leva'
import { useRef } from "react";
import { Button, NativeSelect } from "@material-ui/core"
import sorts from "./utils"
const delayfunc = (ms, func) => new Promise((resolve, reject) => setTimeout(resolve, ms));

function App() {
  const generatelist = () => {
    const temp: number[] = []
    for (let i = 0; i < length; i++) {
      temp.push(Math.floor(Math.random() * randomness) + 1)
    }
    return temp
  }
  const [start, setstart] = useState(false)
  const { length, randomness, delay } = useControls({
    length: { min: 10, value: 45, max: 100, step: 1 },
    randomness: { min: 10, value: 50, max: 100, step: 5 },
    delay: { min: 10, value: 0, max: 250, step: 20 },
  })
  const cont = useRef<HTMLDivElement>()
  const [list, setlist] = useState<number[]>(generatelist())
  const [sortselect, setsortselect] = useState<string>('mergeSort')
  useEffect(() => {
    setlist(generatelist())
  }, [length, randomness])

  return <div className="app">

    <div style={{ display: 'flex' }}>
      <Button style={{ margin: "5px" }} variant="contained" onClick={() => { setlist(generatelist()) }} disabled={start}>Shuffle</Button>
      <Button style={{ margin: "5px" }} variant="contained" onClick={() => { setstart(true) }} disabled={start}>Start</Button>
    </div>
    <NativeSelect
      value={sortselect}
      onChange={(e) => setsortselect(e.target.value)}
      inputProps={{
        name: 'age',
        id: 'age-native-helper',
      }}
    >
      <option value={"mergeSort"}>mergeSort</option>
      <option value={"quickSort"}>quickSort</option>
      <option value={"insertionSort"}>insertionSort</option>
      <option value={"selectionSort"}>selectionSort</option>
      <option value={"bubbleSort"}>bubbleSort</option>

    </NativeSelect>
    <div className="listcontainer" ref={cont}>
      <ListView list={list} randomness={randomness} start={start} delay={delay} setstart={setstart} sortselect={sortselect} />
    </div>
  </div>
}

export default App;
const ListView: React.FunctionComponent<{ list: number[], randomness: number, start: boolean, delay: number, setstart: Function, sortselect: string }> = ({ list, randomness, start, delay, setstart, sortselect }) => {
  const [sorting, setsorting] = useState<number[]>(list)
  const [running, setrunning] = useState(false)
  const [selected, setselected] = useState<number[]>([-1, -1])
  const { color, current, changed } = useControls({
    color: '#fff', current: 'green', changed: 'red'
  })
  async function sortitout() {
    setrunning(true)
    const args = { sorting, setsorting, setselected, delay }
    await sorts[sortselect](args)
    setstart(false)
    setrunning(false)
    setselected([-1, sorting.length + 1])
  }
  useEffect(() => {
    if (!running && start)
      sortitout()
    else {
      setrunning(false)
      setselected([-1, -1])
    }
  }, [start])
  useEffect(() => {
    setsorting(list)
    setrunning(false)
    setselected([-1, -1])
  }, [list])
  return <>
    {sorting.map((val, key) => {
      return <div key={key} style={{ height: `${(val / randomness) * 100}%`, width: `${80 / list.length}vw`, background: key === selected[0] ? current : key === selected[1] ? changed : color, color }}>a</div>
    })}
  </>
}