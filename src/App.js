import React, { useState } from 'react';

function App() {
  const [toppings, setToppings] = useState(["Cheese"]);
  const [isPepperoniChecked, setIsPepperoniChecked] = useState(false);

  const handlePepperoniChange = () => {
    setIsPepperoniChecked(!isPepperoniChecked);
    if (!isPepperoniChecked) {
      setToppings([...toppings, "Pepperoni"]);
    } else {
      setToppings(toppings.filter(topping => topping !== "Pepperoni"));
    }
  };

  return (
    <div>
      <h1>Pizza Toppings</h1>
      <label>
        <input
          type="checkbox"
          checked={isPepperoniChecked}
          onChange={handlePepperoniChange}
          aria-label="Add pepperoni"
        />
        Add Pepperoni
      </label>
      
      <ul>
        {toppings.map(topping => (
          <li key={topping}>{topping}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
