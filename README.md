# 🎬 Cine TalkTalk

## 프로젝트 소개

이 프로젝트는 영화 스트리밍 웹 애플리케이션입니다.<br/>
사용자는 다양한 영화를 검색하고, 즐겨찾기 목록을 관리하며, 스트리밍할 수 있습니다.<br/>
이 프로젝트를 통해 최신 프론트엔드 기술을 활용하여 확장성과 유지보수성이 뛰어난 애플리케이션을 구현하는 데 집중했습니다.

## 기술 스택

1. **React19**<br/>
   use() 및 Suspense 기능을 활용하여 비동기 데이터 처리를 간소화하고 사용자 경험을 향상

2. **TypeScript** <br/>
   정적 타입 시스템을 통해 안정성을 높이고, 자동 완성 기능으로 DX(개발자 경험) 개선
3. **Tailwind CSS** <br/>
   빠르고 일관된 스타일링 적용
4. **shadcn/ui** <br/>
   Tailwind와 완벽하게 호환되는 UI 컴포넌트 라이브러리 활용
5. **React Query** <br/>
   서버 상태 관리를 최적화하고, 캐싱을 통해 네트워크 요청을 최소화하여 성능 향상
6. **React Router** <br/>
   클라이언트 사이드 라우팅을 관리하여 페이지 전환 처리
7. **Supabase** <br/>
   PostgreSQL 기반의 오픈소스 BaaS(Backend-as-a-Service) 솔루션, 인증 및 데이터베이스 관리
8. **Toss Payments API** <br/>
   안전하고 간편한 결제를 위해 토스 결제 SDK 활용

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 환경 변수 설정

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TOSS_PAYMENTS_CLIENT_KEY=your_toss_payments_client_key
```
