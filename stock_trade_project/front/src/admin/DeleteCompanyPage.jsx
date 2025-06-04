import React, { useState } from "react";
import api from "../api/api";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function DeleteCompanyPage() {
  const [companyName, setCompanyName] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    setResult(""); setError("");
    if (!companyName.trim()) {
      setError("기업명을 입력하세요.");
      return;
    }
    try {
      await api.delete(`/admin/companies/${encodeURIComponent(companyName.trim())}`);
      setResult("✅ 기업 삭제 완료!");
      setCompanyName("");
    } catch (err) {
      setError("❌ 삭제 실패: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">기업 상장 폐지</h2>
          <button
            onClick={() => navigate("/admin/home")}
            className="p-2 rounded hover:bg-gray-100 transition"
            title="홈으로"
          >
            <HomeIcon className="h-6 w-6 text-gray-600 hover:text-blue-500" />
          </button>
        </div>

        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="기업명"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleDelete}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
        >
          삭제
        </button>

        {result && <div className="text-green-600 text-sm text-center">{result}</div>}
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      </div>
    </div>
  );
}

export default DeleteCompanyPage;
