export type GbfTweet = {
  battleId: string;
  enemyName: string;
  level: string;
  language: 'ja' | 'en';
  image?: string;
  comment?: string;
};

export function parse(text: string): GbfTweet | null {
  const lines = text.trim().split('\n').reverse();

  const hasImage = lines[0].trim().startsWith('https://');

  let image: GbfTweet['image'];
  if (hasImage) {
    image = lines.shift();
  }
  if (lines.length < 3) return null;

  const enemyLine = lines[0].trim();
  const battleIdLine = lines[2].trim();

  const battleId = battleIdLine.match(
    /([0-9A-z]{8,8})\s(:Battle\sID|:参戦ID)$/
  )?.[1];

  if (!battleId) return null;
  const language: GbfTweet['language'] = battleIdLine.endsWith(':参戦ID')
    ? 'ja'
    : 'en';

  // 3: level, 4: enemyName
  const enemyParseRes = enemyLine.match(/^((Lvl\s|Lv)(\d+)\s|)(.+)$/);

  if (!enemyParseRes) return null;

  const level: GbfTweet['level'] = enemyParseRes[3] ?? '???';

  if (!enemyParseRes[4]) return null;
  const enemyName: GbfTweet['enemyName'] = enemyParseRes[4];

  const commentLines = lines.slice(2);
  commentLines[0] = commentLines[0]
    .replace(/([0-9A-z]{8,8})\s(:Battle\sID|:参戦ID)$/, '')
    .trim();

  const comment = commentLines.reverse().join('\n');

  return {
    battleId,
    enemyName,
    level,
    image,
    language,
    comment: comment.length ? comment : undefined,
  };
}
