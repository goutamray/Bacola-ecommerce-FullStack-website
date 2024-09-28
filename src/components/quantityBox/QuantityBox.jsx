
import { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const QuantityBox = (props) => {
  const [inputVal, setInputVal] = useState(1);

  // Increment value
  const plus = () => {
    setInputVal(prevVal => prevVal + 1);
  };

  // Decrement value
  const minus = () => {
    if (inputVal > 1) {
      setInputVal(prevVal => prevVal - 1);
    }
  };

  // Handle manual input
  const handleInputChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setInputVal(value);
  };

  // Update quantity when `props.value` changes
  useEffect(() => {
    if (props?.value !== undefined && props?.value !== null && props?.value !== "") {
      setInputVal(props.value);
    }
  }, [props.value]);

  // Notify parent component of quantity change
  useEffect(() => {
    props.quantity(inputVal);
    if (typeof props?.selectedItem === 'function') {
      props.selectedItem(props.item, inputVal);
    }
  }, [inputVal]); // Only rerun when inputVal changes

  return (
    <div className="quantityDrop d-flex align-items-center">
      <button onClick={minus}> 
        <FaMinus />
      </button>
      <input type="text" value={inputVal} onChange={handleInputChange} />
      <button onClick={plus}>
        <FaPlus />
      </button>
    </div>
  );
};

// Set default props to avoid errors
QuantityBox.defaultProps = {
  quantity: () => {}, // Default to a no-op function
};

export default QuantityBox;

