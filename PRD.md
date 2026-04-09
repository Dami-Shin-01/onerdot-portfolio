# PRD — 온어닷(On a DoT) AI 강사 포트폴리오 웹사이트

> Version 1.0 | 2026-04-09
> Status: v1 구현 완료

---

## 1. 제품 개요

### 1.1 제품명
**온어닷(On a DoT)** — AI 기초 강사 신다미의 포트폴리오/소개 웹사이트

### 1.2 제품 목적
AI 기초 강사 신다미(디자인온어닷 대표)의 전문성과 강의 이력을 소개하고, 강의 신청 및 기업 출강 문의를 유도하는 개인 브랜딩 웹사이트.

### 1.3 핵심 목표
1. **전환 유도** — 강의 신청 / 기업 출강 문의 (구글폼 연결)
2. **신뢰도 향상** — 강의 이력, 자격사항, 전문 콘텐츠(블로그)를 통한 전문가 인지도 구축
3. **브랜드 형성** — "부드러운 전문가(Warm Expert)" 포지셔닝, 템플릿 느낌 탈피
4. **콘텐츠 허브** — 블로그 + 강의자료실을 통한 지속적 가치 제공

### 1.4 대상 사용자

| 페르소나 | 설명 | 핵심 니즈 |
|---------|------|----------|
| **B2C 수강생** | AI를 처음 접하는 직장인/일반인 | "이 강사에게 배우면 나도 할 수 있겠다" 판단 |
| **B2B 기업 담당자** | 사내 AI 교육 도입을 검토하는 교육/HR 담당자 | 강의 실적 확인 → 출강 문의 |
| **B2B 공공기관 담당자** | 정부/지자체 AI 리터러시 교육 발주 담당 | 자격/경력 확인 → 공식 문의 |

---

## 2. 사이트 구조

### 2.1 정보 아키텍처

```
온어닷 (On a DoT)
│
├── / (메인 — 단일 페이지 스크롤)
│   ├── Navigation (Sticky Header)
│   ├── Hero
│   ├── About (01)
│   ├── Lectures (02)
│   ├── TrackRecord (03)
│   ├── BlogPreview (04)
│   ├── Contact (05)
│   └── Footer
│
├── /blog (블로그 목록)
├── /blog/[slug] (블로그 개별 글)
├── /materials (강의자료실 — 비밀번호 보호)
└── /admin (관리자 대시보드 — 비밀번호 보호)
```

### 2.2 페이지별 요구사항

#### 메인 페이지 (`/`)

**Navigation**
- Sticky header, backdrop-blur
- 앵커 링크: 소개, 강의, 이력, 블로그
- CTA 버튼: "문의하기" (테라코타 컬러)
- 현재 섹션 active 표시 (IntersectionObserver)
- 모바일: 햄버거 메뉴 (48px 터치 영역)
- 로고 "On a DoT" 클릭 시 홈(`/`)으로 이동

**Hero**
- 좌측: AI INSTRUCTOR · GOOGLE CERTIFIED TRAINER 라벨 + 헤드카피 + 서브카피 + CTA 2개
- 우측: 프로필 사진 (오프그리드, 컨테이너 경계 침범)
- 헤드카피: "AI, 어렵지 않습니다." (bold) / "처음 배우는 분들과 함께 해왔습니다." (normal, 서브톤)
- CTA: Primary "강의 신청하기" + Secondary "기업 출강 문의" → 둘 다 #contact 앵커
- GSAP timeline stagger 진입 애니메이션
- 장식 텍스트: "Shin Dami" 워터마크 (Cormorant Garamond, 반투명)

**About (01)**
- 2컬럼 비대칭 (본문 7col + 사이드바 4col)
- 본문: 강사 소개, 강의 철학 (디자인온어닷 대표, 웹디자이너 출신, Google 공인 트레이너)
- 사이드바: 자격사항 (Google Trainer Level 1/2/TSA, AVPN AI Trainer) + 경력 (디자인온어닷, 메디톡스)
- 섹션 번호 "01" + rule line

**Lectures (02)**
- 세로 리스트형 (3열 카드 금지), 1px rule line 구분
- 4개 강의 주제:
  1. 생성형 AI & ChatGPT 활용
  2. Google Gemini 활용 및 심화
  3. AI 리터러시 & 윤리
  4. 교사 대상 AI 활용 과정
- 각 항목: 주제명 + 대상 + 설명 + 기대효과
- hover: 왼쪽 테라코타 border 등장 (layout shift 방지)
- B2B 프로세스 시각화: 문의 → 상담 → 맞춤 커리큘럼 → 강의
- CTA: "맞춤 강의 문의하기"

**TrackRecord (03)**
- 연도별 타임라인 (2025, 2026)
- 실제 강의 이력 7건:
  - Google.org·AVPN, 미라클 평생교육원, 한국장애인고용공단, 횡성군청, 동해교육지원청·AIxSeed, GPTers
- CTA: "출강 문의하기 →"

**BlogPreview (04)**
- 최신 글 미리보기 (Supabase에서 동적 로드)
- CTA: "더 많은 글 읽기" → /blog

**Contact (05)**
- 다크 배경 (#1E1612) + Soft Gold 강조
- "강의 문의하기" 버튼 → 구글폼 외부 링크 (https://forms.gle/5o4LS5wimCbD7Vgu5)
- "이메일 보내기" 버튼 → mailto:de.onadot@gmail.com
- 하단 정보: 이메일 + 응답시간(1~2 영업일)

**Footer**
- 로고 "On a DoT" + 저작권 "온어닷"
- 링크: Email, 강의자료실(/materials), 관리자(/admin)

#### 블로그 (`/blog`, `/blog/[slug]`)
- Supabase `posts` 테이블에서 published=true인 글 동적 로드
- 목록: 태그 + 제목 + 요약 + 날짜
- 개별 글: 태그 + 제목 + 날짜 + 본문 (Markdown 단락 렌더링)
- SEO: 개별 글별 메타데이터 자동 생성

#### 강의자료실 (`/materials`)
- 비밀번호 게이트 (PasswordGate 컴포넌트)
- 비밀번호: Supabase `materials` API에서 동적 로드
- 강의별 탭 전환 → 자료 목록 (제목, 유형, 날짜)
- 지원 유형: PPT(📊), 영상(🎬), 이미지(🖼️), PDF(📄), 사이트(🌐)
- 외부 링크 → 새 탭, 내부 파일 → 다운로드
- robots: noindex, nofollow

#### 관리자 (`/admin`)
- 비밀번호 로그인 (ADMIN_PASSWORD 환경변수)
- **블로그 관리 탭**: 글 작성/수정/삭제, Markdown 편집, 공개/비공개 전환, 태그/요약 관리
- **강의자료 관리 탭**: 강의 추가/수정/삭제, 자료 링크 추가/삭제 (제목, 유형, URL, 날짜), 자료실 비밀번호 변경
- robots: noindex, nofollow

---

## 3. 디자인 시스템

### 3.1 비주얼 방향
**Warm Academic Editorial** — 따뜻한 종이 질감 + 세리프 타이포 + 에디토리얼 레이아웃

### 3.2 컬러 시스템 (60-30-10)

| 역할 | 이름 | HEX | 비율 |
|------|------|-----|------|
| 배경 | Warm Cream | `#FAF8F4` | 60% |
| 보조 텍스트 | Warm Gray | `#807872` | 25% |
| 본문 텍스트 | Deep Charcoal | `#2C2C2C` | 10% |
| 강조/CTA | Deep Terracotta | `#C17A5A` | 5% |
| 다크 섹션 배경 | Dark Base | `#1E1612` | — |
| 다크 섹션 강조 | Soft Gold | `#C4956A` | — |

**컬러 원칙**: 순수 화이트(#FFFFFF) 사용 금지, 그라디언트 금지

### 3.3 타이포그래피

| 용도 | 서체 |
|------|------|
| 한글 제목 | Noto Serif KR |
| 한글 본문 | Pretendard (Variable) |
| 영문 제목/장식 | Cormorant Garamond |

**스케일**: Display 3.2rem → H1 3rem → H2 2rem → Body 1rem
**원칙**: `word-break: keep-all`, 본문 최대 760px

### 3.4 레이아웃
- 컨테이너: max-width 1200px, 12col grid, gap 24px
- 섹션 패딩: desktop 120/80px (비대칭), mobile 60/48px
- border-radius: 2px (에디토리얼)

### 3.5 템플릿 탈피 전략

| 일반 템플릿 | 온어닷 대안 |
|------------|-----------|
| 중앙 정렬 히어로 | 좌측 정렬 + 오프그리드 이미지 |
| 3열 카드 그리드 | 세로 리스트형 + rule line |
| 균일 섹션 패딩 | 비대칭 패딩 (120/80) |
| 흰 배경 + 파란 강조 | 크림 + 테라코타 |
| 둥근 버튼 | border-radius: 2px |

**디테일**: 섹션 번호링(01~05), rule line 구분, 커스텀 ::selection, 커스텀 스크롤바

### 3.6 모션

| 요소 | 모션 | 기술 |
|------|------|------|
| Hero 진입 | 텍스트 stagger fade-up + 이미지 slide-in | GSAP timeline |
| 섹션 등장 | fade-up, translateY(30px→0), 600ms | GSAP ScrollTrigger |
| 카드 hover | scale(1.02) + shadow | CSS transition |
| 전체 스크롤 | smooth inertia scroll | Lenis |

**원칙**: prefers-reduced-motion 전역 대응, CTA 주변 정적 유지, 모바일 parallax 비활성화

---

## 4. 기술 스택

### 4.1 프론트엔드

| 구분 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Next.js (App Router) | 16.2.2 |
| 언어 | TypeScript | 5.x |
| UI | React | 19.2.4 |
| CSS | Tailwind CSS | 4.x |
| 모션 | GSAP + @gsap/react | 3.14.2 |
| Smooth Scroll | Lenis | 1.3.21 |
| 폰트 | next/font (Google + local variable) | — |

### 4.2 백엔드 / 데이터

| 구분 | 기술 |
|------|------|
| 데이터베이스 | Supabase (PostgreSQL) |
| 클라이언트 | @supabase/supabase-js 2.x |
| API | Next.js Route Handlers (REST) |
| 인증 | 환경변수 기반 비밀번호 (ADMIN_PASSWORD) |
| 폼 수신 | Google Forms (외부 링크) |

### 4.3 인프라

| 구분 | 기술 |
|------|------|
| 호스팅/배포 | Vercel |
| CI/CD | GitHub → Vercel 자동 배포 |
| 저장소 | GitHub (`Dami-Shin-01/onerdot-portfolio`) |
| 강의 슬라이드 | GitHub Pages (`Dami-Shin-01/gemini-lecture-slides`) |

### 4.4 환경변수

| 변수 | 용도 | 환경 |
|------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | Production |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 서버 전용 키 | Production |
| `ADMIN_PASSWORD` | 관리자 로그인 비밀번호 | Production |

---

## 5. 데이터 모델

### 5.1 Supabase 테이블

**posts** (블로그)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | TEXT (PK) | slug 기반 ID |
| title | TEXT | 글 제목 |
| date | DATE | 작성일 |
| tags | TEXT[] | 태그 배열 |
| summary | TEXT | 요약 (한 줄) |
| content | TEXT | 본문 (Markdown) |
| published | BOOLEAN | 공개 여부 |
| created_at | TIMESTAMPTZ | 생성 시각 |

**courses** (강의)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | TEXT (PK) | 강의 ID |
| title | TEXT | 강의명 |
| description | TEXT | 강의 설명 |
| created_at | TIMESTAMPTZ | 생성 시각 |

**materials** (강의자료)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | SERIAL (PK) | 자동 증가 ID |
| course_id | TEXT (FK→courses) | 소속 강의 |
| title | TEXT | 자료 제목 |
| type | TEXT | 유형 (pptx/video/image/pdf/site) |
| url | TEXT | 외부 링크 URL |
| date | DATE | 등록일 |
| sort_order | INT | 정렬 순서 |

---

## 6. API 명세

### 6.1 공개 API

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/blog` | 공개된 블로그 글 목록 (published=true) |
| GET | `/api/materials` | 강의자료 데이터 (비밀번호 포함) |

### 6.2 관리자 API (x-admin-password 헤더 필수)

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/admin/auth` | 관리자 인증 |
| GET | `/api/admin/posts` | 전체 글 목록 |
| POST | `/api/admin/posts` | 새 글 작성 |
| PUT | `/api/admin/posts` | 글 수정 |
| DELETE | `/api/admin/posts` | 글 삭제 |
| GET | `/api/admin/materials` | 강의/자료 데이터 |
| PUT | `/api/admin/materials` | 강의/자료 데이터 저장 |

---

## 7. 접근성 & 성능

### 7.1 접근성
- skip-to-content 링크
- prefers-reduced-motion 전역 대응
- 터치 타겟 최소 48px
- hover 전용 효과: `@media (hover: hover)` 조건부
- `word-break: keep-all` (한글)

### 7.2 성능 목표

| 지표 | 목표 |
|------|------|
| LCP | < 2.0s |
| CLS | < 0.05 |
| INP | < 200ms |
| JS 번들 | < 120KB (gzip) |

---

## 8. 보안

| 보호 대상 | 방식 |
|----------|------|
| 관리자 페이지 (/admin) | ADMIN_PASSWORD 환경변수 검증 |
| 관리자 API (/api/admin/*) | x-admin-password 헤더 검증 |
| 강의자료실 (/materials) | 클라이언트 비밀번호 게이트 |
| Supabase | service_role key (서버 전용, 클라이언트 노출 없음) |
| 전송 | HTTPS (Vercel 기본) |

---

## 9. 유지보수 모델

### 9.1 콘텐츠 관리 (강사 본인)
- `/admin` 페이지에서 브라우저로 직접 관리
- 블로그: 작성/수정/삭제, Markdown, 공개/비공개
- 강의자료: 강의 추가/삭제, 자료 링크(구글드라이브 등) 등록, 비밀번호 변경

### 9.2 코드 관리 (개발자)
- GitHub 저장소 + Vercel 자동 배포
- 컴포넌트, 스타일, 레이아웃 변경 시 git push → 자동 빌드

### 9.3 정적 자료 관리
- 강의 슬라이드(HTML): GitHub Pages 별도 저장소
- 프로필 사진: `/public/images/profile.png`

---

## 10. 프로젝트 산출물

| 산출물 | 경로 |
|--------|------|
| 클라이언트 브리프 | `client-brief.md` |
| 레퍼런스 (3개) | `references/design-refs.md`, `motion-refs.md`, `industry-refs.md` |
| 역할별 토론 (4개) | `discussion/pm-`, `marketer-`, `developer-`, `designer-perspective.md` |
| 구축 계획서 | `build-plan.md` |
| 디자인 명세 | `design-spec.md` |
| QA 리뷰 (2개) | `qa/ux-review.md`, `qa/design-review.md` |
| 유지보수 가이드 | `GUIDE.md` |
| **PRD (본 문서)** | `PRD.md` |
| 소스 코드 | `src/` |

---

## 11. 향후 로드맵

### v1.1 (단기)
- [ ] 수강 후기 섹션 추가 (후기 확보 후)
- [ ] 블로그 Markdown 렌더링 고도화 (코드 블록, 이미지, 링크)
- [ ] OG 이미지 자동 생성 (next/og)
- [ ] GA4 + Search Console 연동

### v1.2 (중기)
- [ ] 뉴스레터 구독 기능 (이메일 수집)
- [ ] 블로그 태그 필터링
- [ ] 강의자료실 JWT 기반 인증으로 업그레이드
- [ ] 커스텀 도메인 연결

### v2.0 (장기)
- [ ] 수강생 로그인 시스템
- [ ] 강의 예약/결제 기능
- [ ] 강의 영상 스트리밍
- [ ] 다국어 지원
