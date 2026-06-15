import { defineMiddleware } from 'astro:middleware';

const LOCALES = ['en', 'ja']; // 지원하는 추가 언어 목록

export const onRequest = defineMiddleware(async (context, next) => {
  const { url } = context;
  const path = url.pathname;

  // URL의 첫 번째 세그먼트 추출 (예: /en/slug -> 'en')
  const segments = path.split('/').filter(Boolean);
  const maybeLocale = segments[0];

  if (maybeLocale && LOCALES.includes(maybeLocale)) {
    // '/en' -> '/'
    // '/en/slug' -> '/slug'
    const newPath = path.substring(maybeLocale.length + 1) || '/';
    
    // Astro.currentLocale이 제대로 작동하지 않을 수 있으므로 locals에 저장 (필요시)
    context.locals.lang = maybeLocale;

    console.log(`[Middleware] Rewriting ${path} to ${newPath} (Locale: ${maybeLocale})`);
    
    // rewrite를 통해 내부적으로 newPath의 파일을 렌더링
    return context.rewrite(newPath);
  }

  // 기본 한국어
  context.locals.lang = 'ko';
  return next();
});
