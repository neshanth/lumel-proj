import { useState } from "react";
import TableFields from "./components/TableFields";

const DATA = {
  rows: [
    {
      id: "electronics",
      label: "Electronics",
      value: 1400, //this value needs to be calculated from the children values (800+700)
      children: [
        {
          id: "phones",
          label: "Phones",
          value: 800,
        },
        {
          id: "laptops",
          label: "Laptops",
          value: 700,
        },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 1000, //this need to be calculated from the children values (300+700)
      children: [
        {
          id: "tables",
          label: "Tables",
          value: 300,
        },
        {
          id: "chairs",
          label: "Chairs",
          value: 700,
        },
      ],
    },
  ],
};

const App = () => {
  const [tableInfo] = useState(DATA);

  return (
    <div className="table-wrapper">
      <table>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>Allocation %</th>
          <th>Allocation Value</th>
          <th>Variance</th>
        </tr>
        {tableInfo.rows.map((row) => (
          <>
            <tr key={row.id}>
              <td>{row.label}</td>
              <td>{row.value}</td>
              <TableFields />
            </tr>
            {row.children &&
              row.children.map((child) => (
                <tr key={child.id}>
                  <td>-- {child.label}</td>
                  <td>{child.value}</td>
                  <TableFields />
                </tr>
              ))}
          </>
        ))}
      </table>
    </div>
  );
};
export default App;
