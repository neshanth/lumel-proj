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
  const [tableInfo, setTableInfo] = useState(DATA);
  const [inputValue, setInputValue] = useState({});
  const [allocationValue, setAllocationValue] = useState({});
  const [allocationPercentage, setAllocationPercentage] = useState({});

  const handleInputChange = (e, id) => {
    setInputValue({
      ...inputValue,
      [id]: e.target.value,
    });
  };

  const handleButton = (e, id, type) => {
    if (type === "percentage") {
      setAllocationPercentage({
        ...allocationPercentage,
        [id]: inputValue[id],
      });
    } else {
      setAllocationValue({
        ...allocationValue,
        [id]: inputValue[id],
      });
    }

    tableInfo.rows.forEach((row) => {
      if (row.id === id) {
        row.value = row.value + Number(inputValue[id]);
      }
      if (row.children) {
        row.children.forEach((child) => {
          if (child.id === id) {
            // update percent
            if (type === "percentage") {
              let percent = child.value * (Number(inputValue[id]) / 100);
              child.value = percent + child.value;
            } else {
              child.value = child.value + Number(inputValue[id]);
            }

            row.value = row.children.reduce((acc, child) => acc + child.value, 0);
          }
        });
      }
    });
    setTableInfo({ ...tableInfo });
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Value</th>
            <th>Variance</th>
          </tr>
        </thead>
        <tbody>
          {tableInfo.rows.map((row) => (
            <>
              <tr key={row.id}>
                <td>{row.label}</td>
                <td>{row.value}</td>
                <TableFields inputValue={inputValue[row.id] || ""} data={row} handleButton={handleButton} onChange={(e) => handleInputChange(e, row.id)} />
              </tr>
              {row.children &&
                row.children.map((child) => (
                  <tr key={child.id}>
                    <td>-- {child.label}</td>
                    <td>{child.value}</td>
                    <TableFields inputValue={inputValue[child.id] || ""} data={child} handleButton={handleButton} onChange={(e) => handleInputChange(e, child.id)} />
                  </tr>
                ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default App;
