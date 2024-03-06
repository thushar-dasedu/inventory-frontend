// SerialNumberInput.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SerialNumberInput = ({ quantity, onSave }) => {
    const [serialNumbers, setSerialNumbers] = useState(Array.from({ length: quantity }, () => ''));

    const handleSerialNumberChange = (index, value) => {
        const updatedSerialNumbers = [...serialNumbers];
        updatedSerialNumbers[index] = value;
        setSerialNumbers(updatedSerialNumbers);
    };

    const handleSave = () => {
        onSave(serialNumbers);
    };

    return (
        <div>
            {serialNumbers.map((serialNumber, index) => (
                <Form.Control 
                    key={index}
                    type="text" 
                    value={serialNumber} 
                    onChange={(e) => handleSerialNumberChange(index, e.target.value)} 
                    placeholder={`Serial Number ${index + 1}`} 
                />
            ))}
            <Button onClick={handleSave}>Save</Button>
        </div>
    );
};

export default SerialNumberInput;
