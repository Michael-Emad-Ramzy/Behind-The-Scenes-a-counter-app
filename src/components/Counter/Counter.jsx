import { memo, useState, useCallback, useMemo } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

// memo() is a higher-order component (HOC) that helps
//optimize your app's performance by preventing unnecessary re-renders of components.
//it works by comparing the props in the wrapped components and
//if changes it re-render the component if it is not it prevent the re-rendering.
//so it rerender only if its initial count change or an entirnal count changes.
//memo only prevent the excution of function that effected by the parent component.
const Counter = memo(function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);

  //useMemo here works as memo but it is used for a function inside a
  //component for a normal function.
  const initialCountIsPrime = useMemo(()=> isPrime(initialCount), [initialCount]) ;

  const [counter, setCounter] = useState(initialCount);

  const handleDecrement = useCallback(function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }, []);

  const handleIncrement = useCallback(function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
});

export default Counter;
