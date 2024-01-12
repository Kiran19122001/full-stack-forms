// Table.js
import React from 'react';
import './table.css';

function Table() {
  const tableData = [
    { name: 'John Doe', dateCreated: '2022-01-01', role: 'Admin', status: 'Active', location: 'New York' },
    { name: 'Jane Smith', dateCreated: '2022-02-15', role: 'User', status: 'Inactive', location: 'London' },
    { name: 'Alice Johnson', dateCreated: '2022-03-10', role: 'Manager', status: 'Active', location: 'Paris' },
    { name: 'Bob Anderson', dateCreated: '2022-04-22', role: 'Guest', status: 'Inactive', location: 'Berlin' },
    { name: 'Eva Martinez', dateCreated: '2022-05-05', role: 'Admin', status: 'Active', location: 'Barcelona' }
  ]; 

  

  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Created</th>
            <th>Role</th>
            <th>Status</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>{data.dateCreated}</td>
              <td>{data.role}</td>
              <td>{data.status}</td>
              <td>{data.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
