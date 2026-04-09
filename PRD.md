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

---

## 부속서 A. 디자인 구현 명세

> 이 섹션은 design-spec.md의 핵심 내용을 PRD에 인라인으로 포함한 것입니다.
> 개발자가 코드로 바로 옮길 수 있는 수준의 값을 명시합니다.

### A.1 CSS Custom Properties (전역 토큰)

```css
:root {
  --color-cream:       #FAF8F4;
  --color-warm-gray:   #807872;
  --color-charcoal:    #2C2C2C;
  --color-terracotta:  #C17A5A;
  --color-dark-base:   #1E1612;
  --color-dark-gold:   #C4956A;
  --color-border:      #E8E4DF;
  --color-hover-bg:    #F3EFE9;
  --color-muted:       #B8B4B0;

  --font-serif:    "Noto Serif KR", Georgia, serif;
  --font-display:  "Cormorant Garamond", Georgia, serif;
  --font-sans:     Pretendard, -apple-system, sans-serif;

  --container-max:   1200px;
  --content-max:     760px;
  --grid-gap:        24px;
  --nav-height:      68px;
  --section-pad-v:   120px;
  --border-radius:   2px;
}
@media (max-width: 1024px) { :root { --section-pad-v: 80px; } }
@media (max-width: 768px)  { :root { --section-pad-v: 60px; --grid-gap: 16px; } }
```

### A.2 Tailwind 토큰 맵

```js
// tailwind.config — theme.extend
colors: {
  brand: {
    cream:       '#FAF8F4',
    'warm-gray': '#807872',
    charcoal:    '#2C2C2C',
    terracotta:  '#C17A5A',
  },
  dark: { base: '#1E1612', gold: '#C4956A' },
  ui:   { border: '#E8E4DF', 'hover-bg': '#F3EFE9', muted: '#B8B4B0' },
},
fontFamily: {
  serif:   ['"Noto Serif KR"', 'Georgia', 'serif'],
  display: ['Cormorant Garamond', 'Georgia', 'serif'],
  sans:    ['Pretendard', '-apple-system', 'sans-serif'],
},
```

### A.3 타이포그래피 상세 스케일

| Token | Desktop | Mobile | Weight | Line-height | Letter-spacing | Font |
|-------|---------|--------|--------|-------------|----------------|------|
| display | 3.2rem | 2rem | 700 | 1.3 | -0.02em | Noto Serif KR |
| h1 | 3rem | 1.875rem | 700 | 1.2 | -0.02em | Noto Serif KR |
| h2 | 2rem | 1.375rem | 500 | 1.3 | -0.01em | Noto Serif KR |
| h3 | 1.375rem | 1.25rem | 600 | 1.4 | 0 | Pretendard |
| body-lg | 1.125rem | 1.125rem | 400 | 1.7 | 0 | Pretendard |
| body | 1rem | 1rem | 400 | 1.8 | 0 | Pretendard |
| body-sm | 0.875rem | 0.875rem | 400 | 1.6 | 0.01em | Pretendard |
| label | 0.75rem | 0.75rem | 500 | 1.0 | 0.12em CAPS | Pretendard |
| nav | 0.9375rem | — | 500 | 1.0 | 0.02em | Pretendard |

### A.4 버튼 시스템

**공통 base**:
```css
.btn {
  font-family: var(--font-sans);
  font-size: 0.9375rem; font-weight: 500; letter-spacing: 0.02em;
  border-radius: 2px; padding: 14px 28px;
  transition: background 200ms, color 200ms, border-color 200ms,
              transform 150ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 200ms;
}
```

| Variant | 기본 | Hover | Active |
|---------|------|-------|--------|
| **Primary** (Terracotta) | bg `#C17A5A`, text `#FAF8F4` | bg `#A8664A`, translateY(-1px), shadow | bg `#954F3A`, translateY(0) |
| **Secondary** (Outline) | bg transparent, border `#2C2C2C` | bg `#2C2C2C`, text `#FAF8F4` | bg `#1A1A1A` |
| **Ghost** (Light) | bg transparent, border `#E8E4DF` | border `#807872`, text `#2C2C2C` | bg `#F3EFE9` |
| **Gold** (Dark Section) | bg `#C4956A`, text `#1E1612` | bg `#D4A57A`, shadow | bg `#B4855A` |

### A.5 모션 타임라인 상세 (GSAP)

**Easing 정의**:
- Ease Out Smooth: `power2.out` — 요소 등장, 스크롤 reveal
- Ease Out Strong: `power3.out` — 이미지 slide-in
- Spring Light: `cubic-bezier(0.34, 1.56, 0.64, 1)` — 버튼/카드 hover

**Hero 진입 시퀀스 (총 ~1.2s)**:
| 타이밍 | 요소 | 효과 | Duration |
|--------|------|------|----------|
| 0.1s | Hero 라벨 | opacity 0→1, y 30→0 | 0.5s |
| 0.2s | Hero 제목 | opacity 0→1, y 40→0 | 0.6s |
| 0.35s | Hero 이미지 | opacity 0→1, x 40→0 (power3.out) | 0.7s |
| 0.5s | Hero 서브카피 | opacity 0→1, y 30→0 | 0.5s |
| 0.6s | Hero 본문 | opacity 0→1, y 30→0 | 0.5s |
| 0.6s | 워터마크 텍스트 | opacity 0→1 (power1.out) | 0.8s |
| 0.72s | CTA 버튼 | opacity 0→1, y 20→0 | 0.5s |
| 0.9s | 스크롤 인디케이터 | opacity 0→1 | 0.4s |

**스크롤 Reveal (공통)**:
- trigger start: `top 85%`
- 효과: `opacity 0→1, translateY 30px→0`
- duration: `0.6s`, ease: `power2.out`
- once: true (한 번만 실행)

**Stagger 그룹**: 동일 부모 내 자식 요소 80ms 간격

**Lenis Smooth Scroll**: `duration: 1.2, smoothWheel: true`

### A.6 반응형 Breakpoints

| 구간 | Width | Container Padding |
|------|-------|-------------------|
| Mobile | < 640px | 20px |
| Mobile L | 640-767px | 24px |
| Tablet | 768-1023px | 32px |
| Desktop | 1024px+ | 48px |

**섹션별 반응형 핵심 변경**:

| 섹션 | Desktop | < 768px (Mobile) |
|------|---------|-------------------|
| Navigation | 가로 링크 | 햄버거 + 드로어 |
| Hero | 7:5 그리드, 오프그리드 이미지 | 1컬럼, 이미지 위로, 오프그리드 해제 |
| About | 2컬럼 비대칭 (7:4) | 1컬럼, 사이드바 인라인 |
| Lectures | hover 인덴트 활성 | hover 인덴트 비활성 |
| TrackRecord | 타임라인 좌측 연도 | 연도 인라인 위로 |
| BlogPreview | 비대칭 그리드 (7:5) | 1컬럼 동일 크기 |
| Contact | 2컬럼 (정보:폼) | 1컬럼 상하 배치 |

### A.7 섹션별 HTML 구조 + CSS 핵심

**Navigation**: `position: sticky; backdrop-filter: blur(12px); background: rgba(250,248,244,0.92); height: 68px`

**Hero**: `min-height: 100svh; grid 1-7 text / 8-12 image; image margin-right: -48px (오프그리드); 워터마크 font-size: 6rem, color: rgba(193,122,90,0.12)`

**About**: `grid 1-4 sidebar (sticky top: calc(nav+40px)) / 5-12 content; 영문 장식 "About" font-size: 3.5rem, color: rgba(193,122,90,0.2)`

**Lectures**: `border-top + border-bottom: 1px solid #E8E4DF; hover: bg #F3EFE9 + padding-left 24px; 테라코타 rule: width 48px, height 2px; border-l-2 border-l-transparent (layout shift 방지)`

**TrackRecord**: `타임라인 padding-left: 160px; ::before 세로선 left: 120px; 연도 dot: 6px, #C17A5A`

**Contact**: `bg: #1E1612; form-input: bg rgba(250,248,244,0.06), border rgba(196,149,106,0.25); focus: border-color #C4956A`

**커스텀 디테일**:
```css
::selection { background: #C17A5A; color: #FAF8F4; }
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #FAF8F4; }
::-webkit-scrollbar-thumb { background: #C17A5A; border-radius: 2px; }
```

---

## 부속서 B. 설계 근거 (Design Rationale)

> 이 섹션은 PM/마케터/개발자/디자이너 4인의 토론 결과와 QA 리뷰를 기반으로,
> "왜 이렇게 했는가"를 정리한 것입니다. 엣지케이스에서 동일한 판단을 내리기 위한 근거입니다.

### B.1 B2B/B2C 이중 타겟 전략

**문제**: 수강생(B2C)과 기업 담당자(B2B)는 구매 여정이 완전히 다르다. 단일 CTA로는 한쪽을 반드시 놓친다.

**결정**:
- Hero에 이중 CTA: Primary "강의 신청하기"(B2C) + Secondary "기업 출강 문의"(B2B)
- Primary가 시각적으로 우선 (더 큰 볼륨 타겟 = B2C)
- Sticky Nav에 "문의하기" 항상 노출
- 강의소개 섹션 내부에 B2B 프로세스(문의→상담→맞춤→강의) 인라인 시각화

**B2C 동선**: Hero → About(공감) → 강의소개 → 이력(신뢰) → 문의
**B2B 동선**: Hero → 이력(숫자 확인) → 강의소개 → About → 문의
네비게이션 앵커로 B2B가 원하는 섹션에 직접 접근 가능.

**근거** (PM+마케터 합의): 단일 페이지 유지하되, 네비게이션 앵커로 B2B 동선 보완. 별도 랜딩 분리는 유지보수 비용 대비 효과 낮음.

### B.2 후기 없이 신뢰 구축하는 5가지 전략

**문제**: 수강 후기가 아직 없다. 후기 섹션을 넣으면 오히려 "경험 없음"을 드러낼 수 있다.

**결정**: 후기 섹션 제외. 대신 5가지 대체 신뢰 요소:

| 전략 | 구현 |
|------|------|
| **숫자 기반 사실** | 강의이력 타임라인에 기관명+주제 구체적 나열 |
| **자격/배경 공개** | About 사이드바: Google Trainer, AVPN Trainer, 메디톡스 경력 |
| **커리큘럼 투명성** | 강의소개 4개 주제별 대상/설명/기대효과 상세 공개 |
| **콘텐츠 전문성** | 블로그로 "진짜 알고 있다" 증명 |
| **프로세스 공개** | B2B 프로세스 시각화 (의사결정 허들 낮춤) |

**근거** (마케터): 숫자가 작아도 투명하게 보여주는 것이 신뢰. 후기 섹션은 강의이력 하단에 추후 추가 가능한 위치만 확보.

### B.3 헤드카피 결정 과정

**3안 검토**:
- A (공감형): "AI, 어렵지 않습니다. 처음 배우는 분들과 함께 해왔습니다."
- B (결과형): "AI를 이해하면 일이 달라집니다 — 실무에서 쓰는 AI 기초"
- C (신뢰형): "전문 용어 없이, 현장에서 바로 쓰는 AI 강의"

**최종 결정**: A안 채택 + 2줄 구조로 분리.
- 1줄 "AI, 어렵지 않습니다." (bold, 헤드라인 컬러) — 공감 진입
- 2줄 "처음 배우는 분들과 함께 해왔습니다." (normal, 서브톤) — 경험 뒷받침

**근거** (마케터): 공감으로 진입 → 결과로 마무리 구조. "비전공자도 이해하는"이 핵심 메시지. 굵기 차이로 시선 흐름(1줄→2줄) 유도.

### B.4 "Warm Academic Editorial" 스타일 선택 이유

**키워드 분석**:
- **Warm**: "부드러운 전문가" 브랜드 톤 직역. 차가운 AI 이미지를 상쇄.
- **Academic**: 지식을 다루는 사람의 신뢰감. 교재/노트 연상.
- **Editorial**: 템플릿이 아닌 "편집된" 레이아웃. 의도적 긴장감.

**피해야 할 무드 3가지** (디자이너):
1. Tech Startup — 차가운 그라디언트, 형광 강조. AI 강사인데 AI 회사가 아님.
2. Generic Portfolio — 중앙 정렬 히어로 + 3열 카드. 이것이 "템플릿 느낌"의 정체.
3. AI Aesthetic — 회로 패턴, 픽셀. 대상이 비전공자인데 기술적 이미지는 역효과.

**비주얼 번역 원칙**:
- 따뜻한 종이 질감(크림+세리프) → 교재/노트 연상
- 절제된 공간 → 여백으로 신뢰 전달
- 에디토리얼 의도 → "편집된" 레이아웃의 권위감

### B.5 템플릿 탈피 — 구체적 판단 기준

**QA 리뷰어의 템플릿 냄새 8항목 체크**:

| 항목 | 판정 | 근거 |
|------|------|------|
| 고유 시각적 기억점 | O | 크림+테라코타+세리프 조합이 한국 강사 사이트 시장에서 유일 |
| 섹션 배치에 브랜드 이유 | O | B2C/B2B 이중 동선 설계에 기반한 순서 |
| 타이포가 브랜드 성격 표현 | O | Noto Serif KR의 따뜻함 + Cormorant의 에디토리얼 |
| 여백에 의도 | O | 비대칭 패딩(120/80), 섹션 번호링 |
| 모션이 의미 강화 | O | Hero에만 stagger, 나머지 조용 |
| 컬러가 감성 전달 | O | 60-30-10 전략적 배분 |
| CTA가 자연스러움 | O | 맥락 기반 배치, 과잉 아님 |
| 모바일 동일 경험 | △ | 오프그리드 해제되나 브랜드 톤 유지 |

**결과**: 템플릿 탈피 점수 8/10. "한국 강사 사이트 시장에서 충분히 차별화됨."

### B.6 디자인 이론 적용 지점 (디자인 크리틱)

**비주얼 계층 (Gestalt 원리)**:
> "H1이 3.2rem이고 서브카피가 1.125rem이면 약 2.8배 차이 — 계층감이 충분해. 섹션 번호 + rule line 패턴이 반복되면서 '새 섹션 시작'이라는 시그널을 줘. Squint Test에서도 크림 위 다크 텍스트 블록이 잘 분리돼."

**컬러 (60-30-10 법칙)**:
> "테라코타를 한 화면에 3곳 이하로 제한한 게 핵심이야. 강조색이 네비게이션이랑 푸터랑 CTA에 다 들어가면, 어디를 봐야 할지 모르게 돼. 강조색은 '여기 봐라'라는 뜻이니까."

**레이아웃 (그리드 이탈)**:
> "3개 섹션이 전부 같은 패턴이면 '아, 템플릿이구나' 느낌이 와. Hero는 오프그리드 이미지, About은 sticky 사이드바, Lectures는 리스트형 — 이렇게 리듬을 깨줘야 해."

**모션 (절제 원칙)**:
> "모든 섹션이 fade-up으로 들어오면 세 번째부터 '또야' 하게 돼. Hero만 화려한 stagger, 나머지는 조용한 fade-up. 모션도 '메인 디시'와 '사이드'가 있어야 해."

### B.7 기술 선택 근거

**Next.js App Router 선택 이유** (개발자):
- Vercel 네이티브 배포 → zero-config CI/CD
- next/font로 Noto Serif KR + Pretendard self-hosted → CLS 0 보장
- next/image로 프로필 사진 WebP 자동 변환 → LCP 최적화
- Route Handlers로 Supabase CRUD API 구현 가능

**GSAP 선택 이유** (사용자 요청 + 개발자 검토):
- 타임라인 제어력이 Framer Motion보다 우수 (Hero 시퀀스)
- ScrollTrigger 플러그인 생태계 성숙
- 번들 크기: core ~30KB + ScrollTrigger ~20KB (gzip)
- Lenis와 병행이 업계 표준 패턴

**Supabase 선택 이유** (Vercel Blob 실패 후 전환):
- Vercel Blob private store의 인증 복잡성 문제
- Supabase는 PostgreSQL 기반 → 관계형 데이터(courses↔materials) 자연스러움
- REST API 자동 생성 + 대시보드에서 직접 데이터 확인 가능
- 무료 플랜으로 충분한 규모

**강의자료 외부 링크 방식 선택 이유**:
- PPT/이미지 파일은 구글드라이브 등에 올리고 URL만 관리
- 파일 스토리지 서비스 비용/복잡성 회피
- 클라이언트가 이미 구글드라이브를 사용 중

### B.8 CTA 배치 밀도 원칙 (마케터)

> "맥락 기반 CTA 1개 원칙. 개수가 아닌 맥락 불일치가 '밀어붙이는' 느낌의 원인."

| 위치 | CTA | 맥락 |
|------|-----|------|
| Hero | Primary + Secondary | 첫 진입, 행동 옵션 제시 |
| Sticky Nav | "문의하기" | 어디서든 접근 가능 (항상 노출이지만 작은 크기) |
| 강의소개 하단 | "맞춤 강의 문의하기" | 강의 내용을 본 직후 → 자연스러운 전환 |
| 강의이력 하단 | "출강 문의하기 →" | 실적 확인 직후 → B2B 전환 |
| 블로그 | "더 많은 글 읽기" | 낮은 온도의 탐색 유도 (직접 전환 아님) |
| Contact | 구글폼 + 이메일 | 최종 전환 지점 |

블로그 CTA는 "커리큘럼 살펴보기"에서 "더 많은 글 읽기"로 변경됨 — /blog로 연결되는데 커리큘럼이 없어 사용자 혼란을 유발했기 때문.

### B.9 강의자료실 비밀번호 관리 구조

```
Admin(/admin) → 강의자료 관리 탭 → "자료실 비밀번호" 필드 변경 → Supabase 저장
                                                                      ↓
Viewer(/materials) → GET /api/materials → Supabase에서 password 포함 데이터 로드
                  → PasswordGate 컴포넌트에서 비밀번호 검증 (클라이언트)
                  → 일치 시 강의별 탭 + 자료 목록 표시
```

**참고**: 현재 비밀번호는 API 응답에 포함되어 클라이언트에서 검증하는 구조. 간단하지만 보안 수준은 낮음. v1.2에서 JWT 기반으로 업그레이드 예정.
