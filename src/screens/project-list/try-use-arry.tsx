import React from "react";
import { useMount, useArray } from "../../utils";
export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [
    { name: "jack", age: 25 },
    { name: "na", age: 28 },
  ];
  const { value, clear, removeIndex, add } = useArray(persons);

  useMount(() => {});
  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button onClick={() => clear()}>clear</button>

      {value.map((p, i) => {
        return (
          <div key={i}>
            <span key={i + i} style={{ margin: 10 }}>
              {i}
            </span>
            <span key={p.name} style={{ margin: 10 }}>
              {p.name}
            </span>
            <span key={p.age} style={{ margin: 10 }}>
              {p.age}
            </span>
          </div>
        );
      })}
    </div>
  );
};
