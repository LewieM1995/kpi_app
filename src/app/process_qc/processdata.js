import React from 'react';
import styles from './style.module.css';

const ProcessData = ({ 
  rows, 
  aniloxOptions, 
  colors, 
  onAddRow, 
  onRemoveRow, 
  onChangeRow, 
  onSubmit, 
  submitted 
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Batch Color Measurement Entry</h2>
        <div className={styles.actions}>
          <button 
            onClick={onAddRow}
            className={styles.addButton}
          >
            + Add Row
          </button>
          <button 
            onClick={onSubmit}
            className={styles.saveButton}
          >
            ✓ Save All
          </button>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <form onSubmit={onSubmit}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.headerRow}>
                <th className={styles.headerCell}>Date/Time</th>
                <th className={styles.headerCell}>Anilox</th>
                <th className={styles.headerCell}>Color</th>
                <th className={styles.headerCell}>Press Result</th>
                <th className={styles.headerCell}>Proofer Result</th>
                <th className={styles.headerCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className={styles.dataRow}>
                  <td className={styles.dataCell}>
                    <input
                      type="datetime-local"
                      value={row.datetime}
                      onChange={(e) => onChangeRow(row.id, 'datetime', e.target.value)}
                      className={styles.input}
                      required
                    />
                  </td>
                  <td className={styles.dataCell}>
                    <select
                      value={row.anilox}
                      onChange={(e) => onChangeRow(row.id, 'anilox', e.target.value)}
                      className={styles.select}
                      required
                    >
                    <option value="">Select</option>
                      {aniloxOptions.map(value => (
                        <option key={value.label} value={value.value}>{value.value}</option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.dataCell}>
                    <select
                      value={row.color}
                      onChange={(e) => onChangeRow(row.id, 'color', e.target.value)}
                      className={styles.select}
                      required
                    >
                      <option value="">Select</option>
                      {colors.map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.dataCell}>
                    <input
                      type="number"
                      step="0.01"
                      value={row.pressResult}
                      onChange={(e) => onChangeRow(row.id, 'pressResult', e.target.value)}
                      className={styles.input}
                      placeholder="0.00"
                      required
                    />
                  </td>
                  <td className={styles.dataCell}>
                    <input
                      type="number"
                      step="0.01"
                      value={row.prooferResult}
                      onChange={(e) => onChangeRow(row.id, 'prooferResult', e.target.value)}
                      className={styles.input}
                      placeholder="0.00"
                      required
                    />
                  </td>
                  <td className={styles.dataCell}>
                    <button
                      type="button"
                      onClick={() => onRemoveRow(row.id)}
                      className={styles.deleteButton}
                      disabled={rows.length === 1}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
        
        {submitted && (
          <div className={styles.successMessage}>
            Batch data submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessData;