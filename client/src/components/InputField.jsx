/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";

const InputField = ({ type, id, label,demoCreds, defaultValue = '', ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(defaultValue !== ''); // Initialize based on passed value
    const [inputValue, setInputValue] = useState(defaultValue); // State to manage input value
    const inputRef = useRef(null); // Reference for direct input access

    // Check if input has a value on mount or refresh
    useEffect(() => {
        if (inputRef.current && inputRef.current.value !== '') {
            setHasValue(true);
        }
    }, []);  // Empty dependency array means it runs once after the component mounts

    const handleFocus = () => setIsFocused(true);

    const handleBlur = (e) => {
        setIsFocused(false);
        setHasValue(e.target.value !== '');  // Update hasValue based on the input content
    };

    const handleChange = (e) => {
        setInputValue(e.target.value); // Update inputValue as the user types
        setHasValue(e.target.value !== ''); // Update hasValue
    };

    return (
        <div className={`input-container ${isFocused || hasValue || demoCreds ? 'active' : ''}`}>
            <input
                type={type}
                id={id}
                placeholder={demoCreds}
                ref={inputRef} // Use ref to access the input
                value={inputValue} // Controlled input value
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}  // Handle changes in input
                {...props}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default InputField;

