import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";

function RegisterCompanyPage() {
  const [form, setForm] = useState({
    name: "",
    sector: "",
    price: "",
    stock_num: ""
  });
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(""); setError("");
    try {
      await api.post("/admin/companies", {
        ...form,
        price: Number(form.price),
        stock_num: Number(form.stock_num)
      });
      setResult("✅ 기업 등록 완료!");
      setForm({ name: "", sector: "", price: "", stock_num: "" });
    } catch (err) {
      setError("❌ 등록 실패: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg space-y-6">
        {/* 헤더 */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">📋 기업 상장 등록</h2>
          <button
            onClick={() => navigate("/admin/home")}
            className="p-2 rounded hover:bg-gray-100 transition"
            title="홈으로"
          >
            <HomeIcon className="h-6 w-6 text-gray-600 hover:text-blue-500" />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="기업명"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="sector"
            value={form.sector}
            onChange={handleChange}
            placeholder="섹터"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="주당 가격"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="stock_num"
            type="number"
            value={form.stock_num}
            onChange={handleChange}
            placeholder="총 발행주식수"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            등록
          </button>
        </form>

        {/* 메시지 출력 */}
        {result && <div className="text-green-600 text-sm text-center">{result}</div>}
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      </div>
    </div>
  );
}

export default RegisterCompanyPage;
