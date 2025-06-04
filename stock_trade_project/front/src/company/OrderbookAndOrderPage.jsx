import React, { useEffect, useState } from "react";
import api from "../api/api";

function OrderbookAndOrderPage() {
  const [companyName, setCompanyName] = useState("");
  const [orderbook, setOrderbook] = useState(null);
  const [orderPrice, setOrderPrice] = useState("");
  const [orderCount, setOrderCount] = useState("");
  const [orderResult, setOrderResult] = useState("");
  const [error, setError] = useState("");
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    api.get("/company/companies").then(res => setCompanies(res.data));
  }, []);

  const isValidCompany = (name) => companies.some(c => c.name === name);

  const handleOrderbook = async () => {
    setOrderbook(null);
    setError("");
    setOrderResult("");
    if (!isValidCompany(companyName)) {
      setError("입력한 기업명이 목록에 없습니다.");
      return;
    }
    try {
      const res = await api.get(`/company/companies/${companyName}/orders`);
      setOrderbook(res.data);
    } catch (err) {
      setError("호가창 조회 실패: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleBuy = async () => {
    setOrderResult("");
    setError("");
    if (!isValidCompany(companyName)) {
      setError("입력한 기업명이 목록에 없습니다.");
      return;
    }
    if (!orderPrice || !orderCount) {
      setError("가격과 수량을 모두 입력하세요.");
      return;
    }
    try {
      const res = await api.post("/company/trading/buy", {
        company_name: companyName,
        price: Number(orderPrice),
        count: Number(orderCount),
      });
      setOrderResult(
        `매수: ${res.data.message} (체결: ${res.data.concluded_count}, 미체결: ${res.data.remaining_count})`
      );
    } catch (err) {
      setOrderResult("매수 실패: " + (err.response?.data?.detail || err.message));
    }
  };

  const handleSell = async () => {
    setOrderResult("");
    setError("");
    if (!isValidCompany(companyName)) {
      setError("입력한 기업명이 목록에 없습니다.");
      return;
    }
    if (!orderPrice || !orderCount) {
      setError("가격과 수량을 모두 입력하세요.");
      return;
    }
    try {
      const res = await api.post("/company/trading/sell", {
        company_name: companyName,
        price: Number(orderPrice),
        count: Number(orderCount),
      });
      setOrderResult(
        `매도: ${res.data.message} (체결: ${res.data.concluded_count}, 미체결: ${res.data.remaining_count})`
      );
    } catch (err) {
      setOrderResult("매도 실패: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold">📊 호가창 조회 및 주식 주문</h2>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="기업명 입력"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleOrderbook}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            호가창 조회
          </button>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        {orderbook && (
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">호가창 - {companyName}</h3>
            <div className="flex gap-6">
              <div className="flex-1">
                <h4 className="font-semibold text-green-600">매수</h4>
                <table className="w-full text-sm border border-gray-300">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="border px-2 py-1">가격</th>
                      <th className="border px-2 py-1">수량</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderbook.buy_orders.map((o, i) => (
                      <tr key={i} className="text-center">
                        <td className="border px-2 py-1">{o.price}</td>
                        <td className="border px-2 py-1">{o.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-red-600">매도</h4>
                <table className="w-full text-sm border border-gray-300">
                  <thead className="bg-red-100">
                    <tr>
                      <th className="border px-2 py-1">가격</th>
                      <th className="border px-2 py-1">수량</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderbook.sell_orders.map((o, i) => (
                      <tr key={i} className="text-center">
                        <td className="border px-2 py-1">{o.price}</td>
                        <td className="border px-2 py-1">{o.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 주문 입력 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="number"
            value={orderPrice}
            onChange={(e) => setOrderPrice(e.target.value)}
            placeholder="주문 가격"
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <input
            type="number"
            value={orderCount}
            onChange={(e) => setOrderCount(e.target.value)}
            placeholder="주문 수량"
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <button
            onClick={handleBuy}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            매수
          </button>
          <button
            onClick={handleSell}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            매도
          </button>
        </div>

        {orderResult && <div className="text-blue-700 font-medium">{orderResult}</div>}
      </div>
    </div>
  );
}

export default OrderbookAndOrderPage;
