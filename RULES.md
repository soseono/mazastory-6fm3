# MAZA BLOG — 구글 규정 준수 체크리스트 (RULES.md)

> **이 문서는 마자 블로그 플랫폼이 구글 정책 및 애드센스 정책을 완벽히 준수하기 위한
> 구체적인 규칙을 정의합니다. 모든 기능 개발 전 이 문서를 반드시 확인합니다.**

---

## 1. 구글 검색 품질 가이드라인 (Google Search Essentials)

### ✅ 반드시 지켜야 할 것

- [ ] 각 서브도메인은 **명확히 다른 주제**를 다뤄야 한다
- [ ] 글당 **최소 1,500자 이상** (AI 초안 + 사람 편집 포함)
- [ ] **About 페이지** (블로그 소개, 운영자 정보) 반드시 포함
- [ ] **Contact 페이지** (이메일 또는 연락 수단) 반드시 포함
- [ ] 이미지는 직접 촬영 또는 **유료 라이선스** (무단 복제 금지)
- [ ] **"이 글은 AI 도움으로 작성되었습니다"** 문구 표기 (2024 구글 권고사항)
- [ ] 발행 후 **구글 서치콘솔에 URL 수동 색인 요청**
- [ ] 외부 링크는 `nofollow` 또는 `sponsored` 속성 적절히 사용

### ❌ 절대 하면 안 되는 것

- [ ] **완전 무인 자동 발행** (사람의 승인 없이 AI가 직접 발행)
- [ ] **서브도메인 간 동일/유사 콘텐츠 복제**
- [ ] **키워드 스터핑** (같은 키워드를 과도하게 반복)
- [ ] **숨겨진 텍스트** (배경색과 같은 색의 텍스트 등)
- [ ] **클로킹** (구글봇에게 다른 콘텐츠, 사람에게 다른 콘텐츠 제공)
- [ ] 하루 **서브도메인당 10개 이상** 대량 발행

---

## 2. 구글 AdSense 정책

### 서브도메인 관련 핵심 규정

```
✅ aaa.com 에서 애드센스 승인 시 *.aaa.com 전체 자동 커버됨
✅ 서브도메인 수 제한 없음
✅ 서브도메인마다 다른 주제도 OK
✅ 하나의 애드센스 계정으로 운영 가능
```

### 애드센스 승인을 위한 최소 조건

| 항목 | 기준 |
|---|---|
| 콘텐츠 수 | 서브도메인당 최소 20~30개 이상 |
| 콘텐츠 품질 | 독창적이고 실질적 정보 제공 |
| 사이트 구조 | About, Contact, Privacy Policy 페이지 필수 |
| 운영 기간 | 최소 2~3개월 이상 운영 이력 권장 |
| 트래픽 | 일정한 유기 방문자 (구매 트래픽 X) |

### ✅ 광고 표기 의무사항

- 모든 광고에는 **"광고"** 라벨이 명시되어야 함 (애드센스 자동 처리)
- 파트너스/쿠팡 링크는 **"이 링크는 제휴 마케팅 링크입니다"** 표기 필수
- 광고와 콘텐츠의 경계가 명확해야 함

### ❌ 애드센스 정지 사유

- AI 생성 콘텐츠를 사람이 검수 없이 대량 발행 (Scaled Content Abuse)
- 무효 클릭 유도 (자신의 광고를 클릭하도록 요청)
- 성인, 도박, 폭력 등 금지 콘텐츠
- 저작권 침해 콘텐츠

---

## 3. Google Helpful Content Update (HCU) 대응

구글 HCU는 "사람을 위한 콘텐츠"를 우대하고 "검색엔진만을 위한 콘텐츠"를 강등한다.

### HCU 통과 체크리스트

- [ ] 이 글을 읽고 나면 독자가 원하는 정보를 얻을 수 있는가?
- [ ] 글에 필자의 직접 경험, 의견, 전문성이 담겨 있는가?
- [ ] 제목이 실제 콘텐츠 내용과 일치하는가? (낚시 제목 X)
- [ ] 다른 사이트에서도 쉽게 찾을 수 있는 내용만 모아 놓은 것은 아닌가?
- [ ] 글의 길이가 주제를 충분히 다루기에 적절한가?

---

## 4. Sitemap 규정

각 서브도메인은 **독립된 sitemap.xml**을 가져야 한다.

```xml
<!-- travel.aaa.com/sitemap.xml 예시 -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://travel.aaa.com/</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://travel.aaa.com/posts/jeju-travel-guide</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Sitemap 자동화 규칙

- Astro 빌드 시 `@astrojs/sitemap` 플러그인으로 자동 생성
- 글 발행될 때마다 sitemap 재빌드 트리거
- 루트 도메인 `aaa.com/sitemap.xml`에는 서브도메인 sitemap 인덱스 파일 추가

```xml
<!-- aaa.com/sitemap.xml (Sitemap Index) -->
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://travel.aaa.com/sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://finance.aaa.com/sitemap.xml</loc>
  </sitemap>
</sitemapindex>
```

---

## 5. robots.txt 규정

각 서브도메인 루트에 `robots.txt` 필수:

```txt
User-agent: *
Allow: /

Sitemap: https://travel.aaa.com/sitemap.xml
```

---

## 6. 필수 법적 페이지 목록

모든 서브도메인이 반드시 포함해야 하는 페이지:

| 페이지 | 목적 | 위치 |
|---|---|---|
| `/about` | 블로그 소개, 운영자 정보 | 필수 |
| `/contact` | 연락처 | 필수 |
| `/privacy` | 개인정보처리방침 | 필수 (애드센스 요건) |
| `/disclaimer` | 제휴 마케팅 고지 | 쿠팡파트너스 등 사용 시 필수 |

---

## 7. AI 콘텐츠 표기 의무 (2024~)

구글 권고사항에 따라 AI가 생성에 기여한 콘텐츠에는 다음을 표기한다:

```html
<!-- 각 포스트 하단 -->
<div class="ai-disclosure">
  이 글은 Maza AI의 도움을 받아 작성되었으며, 
  편집자가 검토 및 수정하였습니다.
</div>
```

---

## 8. 정기 점검 항목 (월 1회)

- [ ] 구글 서치콘솔 커버리지 오류 확인 및 수정
- [ ] 깨진 링크 (404) 점검
- [ ] Core Web Vitals 성능 지표 확인 (LCP, CLS, FID)
- [ ] 애드센스 정책 위반 경고 확인
- [ ] 각 서브도메인 색인 상태 확인

---

## 9. 긴급 대응 프로토콜

### 구글 패널티 감지 시
1. 서치콘솔에서 Manual Action 확인
2. 문제 글 즉시 비공개 처리 (삭제 X, 수정 후 재발행)
3. 재심사 요청 제출
4. 원인 분석 후 `RULES.md` 업데이트

### 애드센스 정지 시
1. 정지 사유 이메일 확인
2. 위반 콘텐츠 제거 및 수정
3. 어필(Appeal) 제출
4. 재발 방지를 위한 발행 프로세스 점검

---

*Last Updated: 2026-05-20*
*Owner: Maza Studio*
*참고: [Google Search Essentials](https://developers.google.com/search/docs/essentials) | [AdSense Program Policies](https://support.google.com/adsense/answer/48182)*
