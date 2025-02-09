import styles from "./styles.module.css";

const PantoneRow = ({ pantone, editedPantones, handleEditChange, handleSaveChanges, handleDelete }) => {
  return (
    <tr>
      {["label", "value", "type", "hex", "r", "g", "b"].map((field) => (
        <td key={`${pantone.id}-${field}`}>
          <input
            className={styles.inputText}
            type="text"
            value={editedPantones[pantone.id]?.[field] || ""}
            onChange={(e) => handleEditChange(pantone.id, field, e.target.value)}
          />
        </td>
      ))}
      <td className={styles.buttonsCont}>
        <button className={styles.btn} onClick={() => handleSaveChanges(pantone.id)}>Save</button>
        <button className={styles.btnDelete} onClick={() => handleDelete(pantone.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default PantoneRow;
