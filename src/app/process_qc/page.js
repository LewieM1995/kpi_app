'use client';
import React, { useState } from 'react';
import ProcessData from './processdata';
import aniloxOptions from '../cm_submission/aniloxOptions';

const ProcessQC = () => {
  const colors = ['Cyan', 'Magenta', 'Yellow', 'Black'];

  const createEmptyRow = () => {
    return {
      id: Date.now(),
      datetime: '',
      anilox: '',
      color: '',
      pressResult: '',
      prooferResult: ''
    };
  }

  const [rows, setRows] = useState([createEmptyRow()]);
  const [submitted, setSubmitted] = useState(false);

  console.log(rows)

  const handleAddRow = () => {
    setRows([...rows, createEmptyRow()]);
  };

  const handleRemoveRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  const handleChangeRow = (id, field, value) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
        `http://localhost:4000/fujiseal/postProcessData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(rows),
        }
      );

      try {
      
        if (response.ok) {
            setSubmitted(true);
            setRows([createEmptyRow()]);
        } else {
            console.log('error sending data at client')
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setRows([createEmptyRow()]);
      }

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <ProcessData 
      rows={rows}
      aniloxOptions={aniloxOptions}
      colors={colors}
      onAddRow={handleAddRow}
      onRemoveRow={handleRemoveRow}
      onChangeRow={handleChangeRow}
      onSubmit={handleSubmit}
      submitted={submitted}
    />
  );
}

export default ProcessQC;