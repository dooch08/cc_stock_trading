import React, { useState } from "react";
import api, { setAuthToken } from "../api/api";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("customer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        id,
        password,
        user_type: userType,
      });

      setAuthToken(res.data.access_token);
      onLogin(res.data.user_info, userType);

      localStorage.setItem("token", res.data.access_token);
      if (userType === "customer") navigate("/customer/home");
      else if (userType === "company") navigate("/company/home");
      else if (userType === "admin") navigate("/admin/home");

    } catch (err) {
      console.error("🔍 로그인 에러 디버깅 정보:", err); // 콘솔에 전체 에러 출력

      if (err.response) {
        // 서버는 응답했으나 상태코드가 2xx가 아님
        const status = err.response.status;
        const detail = err.response.data?.detail || JSON.stringify(err.response.data);
        setError(`❌ 로그인 실패 (${status}): ${detail}`);
      } else if (err.request) {
        // 요청은 전송되었으나 응답이 없음
        setError("❌ 로그인 실패: 서버로부터 응답이 없습니다. 네트워크 상태를 확인해주세요.");
      } else {
        // 요청 설정 문제 등
        setError("❌ 로그인 요청 중 오류 발생: " + err.message);
      }
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          모의 주식 거래 서비스
        </h2>

        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="customer">일반고객</option>
          <option value="company">기업고객</option>
          <option value="admin">관리자</option>
        </select>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
          >
            로그인
          </button>
          <button
            type="button"
            onClick={goToRegister}
            className="w-1/2 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-md transition"
          >
            회원가입
          </button>
        </div>

        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
