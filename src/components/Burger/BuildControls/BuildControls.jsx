import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>Current Price : {props.price.toFixed(2)}</p>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        label={control.label}
        type={control.type}
        added={props.addIngredient.bind(this, control.type)}
        removed={() => props.removeIngredient(control.type)}
        disabled={props.disabled[control.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={props.purchasable}
      onClick={props.ordered}
    >
      Order
    </button>
  </div>
);

export default buildControls;
