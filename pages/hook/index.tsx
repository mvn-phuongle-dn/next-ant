import React, { createContext, useCallback, useMemo, useState } from "react";

const functionsCounter = new Set();

const UseHook = () => {
  const [count, setCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);

  // const incre = () => {
  //   setCount(count + 1);
  //   console.log('incre');
  // };

  // const decre = () => {
  //   setCount(count - 1);
  //   console.log('decre');
  // };

  // const increOther = () => {
  //   setOtherCount(otherCount + 1);
  //   console.log('increOther');
  // };

  const incre = useCallback(() => {
    setCount(count + 1);
    console.log("incre");
  }, [count]);

  const decre = useCallback(() => {
    setCount(count - 1);
    console.log("decre");
  }, [count]);

  const increOther = useCallback(() => {
    setOtherCount(otherCount + 1);
    console.log("increOther");
  }, [otherCount]);

  functionsCounter.add(incre);
  functionsCounter.add(decre);
  functionsCounter.add(increOther);

  console.log("functionsCounter", functionsCounter);

  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const memoCount2 = useMemo(() => {
    console.log('call memo');
    return count2 * 500;
  }, [count2]);


  const Context = createContext('Default Value');
  return (
    <>
      <div>
        <h1>UseCallback</h1>
        <p>Count: {count}</p>
        <button onClick={incre}>+</button>
        <button onClick={decre}>-</button>
        <button onClick={increOther}>Incre Other</button>
      </div>
      <div>
        <h1>UseMemo</h1>
        <p>Count: {memoCount2}</p>
        <button onClick={()=>{setCount2(count2 + 1);}}>Incre count 2</button>
        <button onClick={()=>{setCount3(count3 + 1);}}>Incre count 3</button>
      </div>
    </>
  );
};

export default UseHook;
