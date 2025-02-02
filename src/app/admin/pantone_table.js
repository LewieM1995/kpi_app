import PantoneRow from "./pantone_row";
import styles from "./styles.module.css";

const PantoneTable = ({ pantones, editedPantones, handleEditChange, handleSaveChanges, handleDelete, filter, loading }) => {
  const filteredPantones = pantones.filter(
    (pantone) =>
      pantone.label.toUpperCase().includes(filter.toUpperCase()) ||
      pantone.value.toUpperCase().includes(filter.toUpperCase())
  );

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.tableHeader}>Label</th>
          <th className={styles.tableHeader}>Value</th>
          <th className={styles.tableHeader}>Type</th>
          <th className={styles.tableHeader}>Hex</th>
          <th className={styles.tableHeader}>R</th>
          <th className={styles.tableHeader}>G</th>
          <th className={styles.tableHeader}>B</th>
          <th className={styles.tableHeader}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredPantones.length === 0 ? (
          <tr>
            <td className={styles.tableCell} colSpan="8">{loading ? "Loading..." : "No result found"}</td>
          </tr>
        ) : (
          filteredPantones.map((pantone, index) => (
            <PantoneRow
              key={`${pantone.id}-${index}`}
              pantone={pantone}
              editedPantones={editedPantones}
              handleEditChange={handleEditChange}
              handleSaveChanges={handleSaveChanges}
              handleDelete={handleDelete}
            />
          ))
        )}
      </tbody>
    </table>
  );
};

export default PantoneTable;
