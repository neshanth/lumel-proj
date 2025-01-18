const TableFields = ({ inputValue, onChange, handleButton, data }) => {
  return (
    <>
      <td>
        <input type="number" value={inputValue} onChange={onChange} />
      </td>
      <td>
        <button onClick={(e) => handleButton(e, data.id, "percentage")}>Allocate %</button>
      </td>
      <td>
        <button onClick={(e) => handleButton(e, data.id, "value")}>Allocate Value</button>
      </td>
      <td>0%</td>
    </>
  );
};
export default TableFields;
