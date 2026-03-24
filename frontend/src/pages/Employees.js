import { useEffect, useState } from "react";
import API from "../services/api";

export default function Employees() {
  const [emps, setEmps] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmps(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addEmployee = async () => {
    try {
      await API.post("/employees", { name });
      setName("");
      fetchEmployees();
    } catch (err) {
      alert("Error adding employee");
    }
  };

  return (
    <div>
      <h2>Employees</h2>

      <input
        value={name}
        placeholder="Enter employee name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addEmployee}>Add</button>

      <ul>
        {emps.map((e) => (
          <li key={e.id}>{e.name}</li>
        ))}
      </ul>
    </div>
  );
}
