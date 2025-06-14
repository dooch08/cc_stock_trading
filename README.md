# AWS 클라우드 환경 기반 가상 주식 거래 시뮬레이션 플랫폼

본 프로젝트는 실제 주식 시장을 모방한 가상의 주식 거래 시뮬레이션 플랫폼을 개발하는 것을 목표로 합니다. 사용자는 증권사 직원(관리자), 일반고객(개인 투자자), 기업고객(상장기업)의 세 가지 역할로 시스템에 참여할 수 있습니다.

## 프로젝트 목표
주식 투자에 관심은 있지만 실제 투자에 대한 두려움이 있는 초보 투자자들에게 안전한 학습 환경을 제공하는 것이 본 프로젝트의 주요 목적입니다. 가상의 주식 거래 시스템을 통해 주식 시장의 거래 메커니즘과 투자 전략을 실제 자금 위험 없이 학습할 수 있는 환경을 제공합니다.

## 프로젝트 활용 방안
증권사 API 연결을 통해 시스템 기능을 확장하여 아래와 같이 사용할 수 있습니다.
- 개인 투자자: 실제 투자 전 다양한 전략을 테스트하고 자신의 투자 패턴 분석
- 금융 관련 학과 학생: 증권 시장의 작동 원리와 다양한 역할에 대한 이해 증진
- 스타트업/기업: 기업 공개(IPO) 과정을 시뮬레이션 하여 이해관계자에게 교육
- 투자 스터디 그룹: 그룹 내 모의 투자 대회 및 학습 도구로 활용

## 시스템의 주요 기능
- 증권사 직원 기능: 기업 상장 관리, 기업 정보 수정
- 일반 및 기업 고객 공통 기능: 상장 기업 목록 조회, 주식 매수매도, 주문조회 및 주문취소, 잔고확인, 입출금
- 일반고객 전용 기능: 개인 양도 차익 조회, 자산 비중 조회
- 기업고객 전용 기능: 배당금 지급

## 프로젝트 구성

### DB 테이블 구조
<img src="https://github.com/user-attachments/assets/77ee43ff-44e6-4933-b0a7-394110bc18be" width=400, height=400>

## 프로젝트 개발환경
- Python 3.12.7
- DBMS: PostgreSQL
- Node.JS v22.16.0
- npm 10.9.2

## 백엔드 설치 라이브러리
```
pip install "FastAPI[standard]"
pip install sqlalchemy
pip install python-jose[cryptography]
pip install passlib[bcrypt]
pip install pydantic
pip install pydantic-settings
pip install psycopg2-binary
```

## 프론트 설치 라이브러리
```
npm install react-scripts --save
```
