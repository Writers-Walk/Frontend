# 📚 도서관리시스템

> KT AIVLE School 9기 미니프로젝트 4차  
> **3반 7조** | AI를 활용한 도서표지 이미지 생성 도서관리시스템

---

## 1. 프로젝트 개요

AI(OpenAI GPT Image API)를 활용하여 도서 표지 이미지를 자동 생성할 수 있는 도서관리 웹 서비스입니다.  
사용자는 도서를 등록·조회·삭제하고, AI가 생성한 이미지를 표지로 저장할 수 있습니다.

### 주요 기능

| 기능 | 설명 |
|---|---|
| 도서 목록 조회 | 카드 형식으로 전체 도서 목록 표시 |
| 도서 검색 | 제목·저자 기준 실시간 텍스트 검색 |
| 도서 정렬 | 최신순(updatedAt) / 제목순(가나다) 정렬 |
| 도서 등록 | 필수 항목 유효성 검사를 포함한 도서 정보 입력 폼 |
| 도서 상세 조회 | 표지 이미지, 서지 정보, 도서 내용 표시 |
| 좋아요 | 도서별 좋아요 수 증가 (PATCH) |
| 도서 삭제 | 확인 후 도서 삭제 |
| AI 표지 생성 | 도서 정보 기반 프롬프트 자동 구성 후 GPT Image API로 표지 생성 및 저장 |
| URL 공유 | 도서 상세 페이지 URL 클립보드 복사 |

---

## 2. 기술 스택

### Frontend
| 기술 | 버전 |
|---|---|
| React | ^19.2.6 |
| Vite | ^8.0.12 |
| react-router-dom | ^7.15.1 |

### Mock Server
| 기술 | 버전 |
|---|---|
| json-server | ^0.17.4 |

### AI API
| 기술 | 설명 |
|---|---|
| OpenAI GPT Image API | 도서 표지 이미지 생성 |

---

## 3. 프로젝트 구조

```
src/
├── App.jsx                        # 라우터 설정 (4개 라우트)
├── App.css
├── main.jsx                       # 앱 진입점
├── index.css
│
├── api/                           # 전역 API 설정
│   └── api.js                     # axios 인스턴스 baseURL 설정
│
├── assets/                        # 정적 이미지 에셋
│   ├── hero.png
│   ├── pageLogo.png
│   ├── react.svg
│   └── vite.svg
│
├── Layout/                        # 레이아웃 공통 컴포넌트
│   ├── components/
│   │   ├── Header.jsx             # 상단 헤더
│   │   └── Layout.jsx             # 레이아웃 래퍼
│   └── css/
│       ├── Header.css
│       └── Layout.css
│
├── main/                          # 메인(홈) 페이지
│   ├── api/
│   │   └── mainapi.jsx            # 도서 목록 조회 API
│   ├── components/
│   │   ├── bookCard.jsx           # 도서 카드 컴포넌트
│   │   ├── Likerank.jsx           # 좋아요 랭킹 컴포넌트
│   │   └── RegisterButton.jsx     # 도서 등록 버튼
│   ├── css/
│   │   ├── bookCard.css
│   │   ├── Likerank.css
│   │   ├── MainPage.css
│   │   └── RegisterButton.css
│   └── pages/
│       └── mainpage.jsx           # 메인 페이지 (목록, 검색, 정렬)
│
├── BookDetailPage/                # 도서 상세 페이지
│   ├── api/
│   │   └── bookdetailApi.js       # 상세 조회·삭제·좋아요 API
│   ├── components/
│   │   ├── AIButton.jsx           # AI 표지 생성 페이지 이동 버튼
│   │   ├── BackButton.jsx         # 뒤로가기 버튼
│   │   ├── BookInfo.jsx           # 서지 정보 표시
│   │   ├── DeleteButton.jsx       # 도서 삭제 버튼
│   │   ├── LikeButton.jsx         # 좋아요 버튼
│   │   └── ShareButton.jsx        # URL 공유 버튼
│   ├── css/
│   │   └── BookDetailPage.css
│   └── pages/
│       └── BookDetailPage.jsx     # 상세 페이지 메인
│
├── CoverGeneratePage/             # AI 표지 생성 페이지
│   ├── api/
│   │   ├── compressImage.jsx      # 이미지 압축 처리
│   │   ├── generateBookCover.jsx  # GPT Image API 호출
│   │   ├── getBookDetail.jsx      # 도서 정보 조회
│   │   └── saveCoverImage.jsx     # 생성된 이미지 저장 (PATCH)
│   ├── components/
│   │   ├── BookInfoSection.jsx    # 도서 정보
│   │   ├── GeneratedResultSection.jsx # 표지 생성 결과 화면
│   │   ├── ImageOptionSection.jsx # 모델, 해상도, 품질 옵션 선택
│   │   └── LoadingOverlay.jsx     # 생성중 오버레이
│   ├── css/
│   │   └── CoverGeneratePage.css
│   └── CoverGeneratePage.jsx      # 표지 생성 메인 컴포넌트
│
└── BookCreate/                    # 도서 등록 페이지
    ├── api/
    │   └── bookCreateApi.js       # 도서 등록 API
    ├── css/
    │   └── BookCreate.css
    └── pages/
        └── BookCreate.jsx         # 도서 등록 페이지
```

---

## 4. 실행 방법

### 사전 준비

```bash
npm install
npm install react-router-dom
```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 OpenAI API Key를 입력합니다.

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

> **주의:** `.env` 파일은 절대 Git에 커밋하지 마세요.

### db.json 파일 준비

`db.json`은 `.gitignore`에 포함되어 있습니다. 프로젝트 루트에 직접 생성하세요.

```json
{
  "books": []
}
```

### 서버 실행

> **두 서버를 동시에 실행해야 합니다.**

**터미널 1 — Mock API 서버 (json-server)**

```bash
npx json-server@0.17.4 db.json --port 3000
```

**터미널 2 — React 개발 서버**

```bash
npm run dev
```

| 서버 | 주소 |
|---|---|
| json-server (Mock API) | http://localhost:3000 |
| React 개발 서버 | http://localhost:5173 |

---

## 5. API 명세

| 구분 | 서비스명 | API 이름 | Method | REST API |
|---|---|---|---|---|
| 메인페이지 | useBooks | book 정보 조회 | GET | `/books` |
| AI 이미지 생성 페이지 | fetchBook | id별 book 정보 조회 | GET | `/books/${id}` |
| AI 이미지 생성 페이지 | handleGenerateImage | GPT 이미지 생성 | POST | `https://api.openai.com/v1/images/generations` |
| AI 이미지 생성 페이지 | handleSaveCover | id별 이미지 저장 및 수정 | PATCH | `/books/${id}` |
| 상세 정보 페이지 | getBookById | id별 book 정보 조회 | GET | `/books/${id}` |
| 상세 정보 페이지 | deleteBook | id별 book 삭제 | DELETE | `/books/${id}` |
| 상세 정보 페이지 | updateLikes | 좋아요 버튼 클릭시 likes +1 | PATCH | `/books/${id}` |
| 도서 등록 페이지 | bookCreate | 새로운 도서 등록 | POST | `/books` |

---

## 6. 주요 구현사항

### 메인 화면 (김도원, 김준형)

- 도서 목록 카드 형식 렌더링 (제목, 저자, 등록일, 좋아요 수, 표지 이미지)
- 3단계 상태 처리: 로딩 중 / 에러 발생 / 빈 목록
- 표지 이미지 없을 시 "이미지 없음" 텍스트 출력
- 제목·저자 기준 실시간 텍스트 검색
- 최신순(`updatedAt`) / 제목순(가나다) 정렬
- 도서 등록 버튼 → 등록 페이지 이동
- 도서 카드 클릭 → 상세 페이지 이동

### 도서 등록 페이지 (이영아)

- 제목, 저자, 출판사, 발행년도, 총서사항, 분류/장르, 도서 내용 입력 폼
- 필수 항목 유효성 검사 및 글자수 제한
- 등록 시 `createdAt` / `updatedAt` 자동 생성 (ISO 형식)
- `coverImageUrl` 빈 문자열로 초기화, `id`는 json-server 자동 부여

### 도서 상세 페이지 (이민주, 김한수)

- 표지 이미지, 제목, 저자, 등록일, 수정일, 도서 내용 표시
- 좋아요 버튼 클릭 시 `likes` +1 (PATCH)
- 도서 삭제 버튼 — 확인 후 DELETE 요청
- AI 표지 생성 페이지로 이동 버튼
- URL 복사 버튼

### AI 표지 생성 페이지 (김수정, 주상현)

- 도서 정보 기반 프롬프트 자동 구성 + 사용자가 직접 수정 가능
- 생성 모델 선택 (GPT Image 2), 해상도 및 품질(`low` / `medium` / `high`) 옵션
- OpenAI API Key `.env` 파일로 관리 (프론트엔드 코드 미노출)
- 표지 이미지 없으면 **생성** 버튼 / 있으면 **재생성·저장** 버튼
- 생성된 이미지 압축 후 PATCH로 저장
- 로딩 중 버튼 비활성화 처리

---

## 7. 주요 화면

<div align="center">

  <img width="1200" alt="메인1" src="https://github.com/user-attachments/assets/70f6b718-d9b6-4bff-aa51-0d619b0fab77" />
  <br/><br/>

  <img width="1200" alt="메인2" src="https://github.com/user-attachments/assets/7cbcaef2-f390-4176-84ee-78b32be8ccc9" />
  <br/><br/>

  <img width="1200" alt="등록" src="https://github.com/user-attachments/assets/27a36a25-6783-417b-981b-107652e6454f" />
  <br/><br/>

  <img width="580" alt="이미지생성1" src="https://github.com/user-attachments/assets/f44803bc-f87e-4a00-830a-3d470d606e8c" />
  <img width="580" alt="이미지생성2" src="https://github.com/user-attachments/assets/8a6d7330-bf89-4281-9362-97929af4eb03" />
  <br/><br/>

  <img width="1200" alt="디테일" src="https://github.com/user-attachments/assets/f483c4f7-25ab-46ba-98d4-6deec1cd7d97" />

</div>




---

## 8. db.json 데이터 구조

> `db.json`은 보안상 `.gitignore`에 포함되어 있습니다.

| 필드명 | 타입 | 설명 |
|---|---|---|
| `id` | string | 식별자 (json-server 자동 부여) |
| `title` | string | 도서 제목 |
| `author` | string | 저자 |
| `likes` | number | 좋아요 수 |
| `content` | string | 도서 내용 |
| `genre` | string | 장르 |
| `coverImageUrl` | string | 표지 이미지 경로 (Base64 또는 URL) |
| `publisher` | string | 출판사 |
| `seriesInfo` | string | 총서사항 |
| `publicationDt` | string | 출간일 |
| `createdAt` | string | 등록일 (ISO 8601 형식) |
| `updatedAt` | string | 수정일 (ISO 8601 형식) |
| `imageModel` | string | AI 생성 모델명 |
| `resolution` | string | 이미지 해상도 |
| `quality` | string | 이미지 품질 (`low` / `medium` / `high`) |
| `coverPrompt` | string | 이미지 생성에 사용된 프롬프트 |

---

## 팀원

| 이름 | 담당 |
|---|---|
| 김도원 | 메인 화면 |
| 김준형 | 메인 화면 |
| 이영아 | 도서 등록 페이지 |
| 이민주 | 도서 상세 페이지 |
| 김한수 | 도서 상세 페이지 |
| 김수정 | AI 표지 생성 페이지 |
| 주상현 | AI 표지 생성 페이지 |
