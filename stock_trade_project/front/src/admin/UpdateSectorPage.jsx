import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";

function UpdateSectorPage() {
  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(""); setError("");
    try {
      await api.put("/admin/companies/sector", {
        company_name: companyName,
        sector: sector
      });
      setResult("✅ 섹터 수정 완료!");
      setCompanyName("");
      setSector("");
    } catch (err) {
      setError("❌ 수정 실패: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg space-y-6">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">🏷️ 기업 섹터 수정</h2>
          <button
            onClick={() => navigate("/admin/home")}
            className="p-2 rounded hover:bg-gray-100 transition"
            title="홈으로"
          >
            <HomeIcon className="h-6 w-6 text-gray-600 hover:text-blue-500" />
          </button>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            placeholder="기업명"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            value={sector}
            onChange={e => setSector(e.target.value)}
            placeholder="새 섹터"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            섹터 수정
          </button>
        </form>

        {/* 메시지 출력 */}
        {result && <div className="text-green-600 text-sm text-center">{result}</div>}
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      </div>
    </div>
  );
}

export default UpdateSectorPage;
