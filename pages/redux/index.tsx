import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { decre, incre } from "../../features/counter/counterSlice";

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <button aria-label="Increment value" onClick={() => dispatch(incre())}>
        Increment
      </button>
      <span>{count}</span>
      <button aria-label="Decrement value" onClick={() => dispatch(decre())}>
        Decrement
      </button>
    </div>
  );
}
export default Counter;
