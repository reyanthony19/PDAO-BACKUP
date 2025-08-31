// Print.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./api";

const Print = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        setMember(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch member:", err);
      }
    };
    fetchMember();
  }, [id]);

  const handlePrintID = () => {
    const content = document.getElementById("id-card").innerHTML;
    const printWindow = window.open("", "", "width=400,height=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>ID Card</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 0; 
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background: #f9fafb;
            }
            .id-card {
              width: 320px;
              border: 2px solid #0ea5e9;
              border-radius: 12px;
              padding: 16px;
              text-align: center;
              background: white;
              box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            }
            .id-photo {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              object-fit: cover;
              margin-bottom: 12px;
              border: 2px solid #0ea5e9;
            }
            h2 {
              margin: 0;
              color: #0ea5e9;
              font-size: 18px;
            }
            p {
              margin: 4px 0;
              font-size: 14px;
            }
            @page {
              size: CR80; /* PVC ID size (85.6mm × 54mm) */
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="id-card">${content}</div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = window.close;
            }
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  if (!member) {
    return <p className="text-center text-gray-500">Loading member profile...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-sky-600 mb-6">Print ID</h1>

      {/* ID Card Preview */}
      <div
        id="id-card"
        className="id-card bg-white shadow rounded p-4 w-80 border border-sky-400 mx-auto"
      >
        <img
          src={member.photo || "https://via.placeholder.com/100"}
          alt="Profile"
          className="id-photo w-24 h-24 rounded-full mx-auto border-2 border-sky-500"
        />
        <h2 className="text-xl font-bold text-sky-600 mt-2">{member.name}</h2>
        <p>ID: {member.id}</p>
        <p>Email: {member.email}</p>
        <p>Contact: {member.contact || "N/A"}</p>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrintID}
        className="mt-4 bg-sky-600 text-white px-4 py-2 rounded shadow hover:bg-sky-900"
      >
        🖨️ Print ID
      </button>
    </div>
  );
};

export default Print;
