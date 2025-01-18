import TableFields from "./TableFields";

const Table = ({ data, children }) => {
  return (
    <>
      <tr key={data.id}>
        <td>{data.label}</td>
        <td>{data.value}</td>
        <TableFields />
      </tr>
      {children}
    </>
  );
};
export default Table;
