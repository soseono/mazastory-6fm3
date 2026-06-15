/**
 * HTML 본문을 특정 위치(예: 절반)에서 나누어 반환합니다.
 * A/B 테스트 시 본문 중간에 광고를 주입하기 위해 사용됩니다.
 */
export function splitHtmlForAd(html: string): [string, string] {
  // 간단한 구현: 본문의 중간쯤에 있는 </p> 태그를 기준으로 나눔
  const pTags = html.match(/<\/p>/g);
  if (!pTags || pTags.length < 4) {
    // 문단이 4개 미만이면 나누지 않고, 전부 파트 1로 반환
    return [html, ''];
  }

  // 문단의 절반쯤 위치를 찾음
  const middleIndex = Math.floor(pTags.length / 2);
  let searchIndex = 0;
  let splitIndex = -1;

  for (let i = 0; i < middleIndex; i++) {
    const idx = html.indexOf('</p>', searchIndex);
    if (idx !== -1) {
      searchIndex = idx + 4; // </p> 의 길이 4
      splitIndex = searchIndex;
    } else {
      break;
    }
  }

  if (splitIndex !== -1) {
    return [
      html.substring(0, splitIndex),
      html.substring(splitIndex)
    ];
  }

  return [html, ''];
}
