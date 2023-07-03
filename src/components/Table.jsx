import React from "react";

const Table = ({ columns, data }) => {
  return (
    <div className="flex w-full h-auto justify-center items-center overflow-auto">
      <table className="min-w-full  divide-y divide-gray-200 border rounded-xl">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-200">
          {data.map((row, i) => (
            <tr key={row.id}>
              {columns.map((column, i) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
