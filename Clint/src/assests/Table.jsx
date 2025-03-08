import React from "react";

const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        {children}
      </table>
    </div>
  );
};

const TableHeader = ({ children }) => {
  return <thead className="bg-gray-100">{children}</thead>;
};

const TableRow = ({ children }) => {
  return <tr className="border-b border-gray-200">{children}</tr>;
};

const TableHead = ({ children }) => {
  return <th className="px-4 py-2 text-left font-semibold">{children}</th>;
};

const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const TableCell = ({ children }) => {
  return <td className="px-4 py-2 border-b border-gray-200">{children}</td>;
};

export { Table, TableHeader, TableRow, TableHead, TableBody, TableCell };
