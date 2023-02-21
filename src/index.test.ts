import { GbfTweet, parse } from './index';

runTest(
  'ja + comment + level + image',
  `これは
コメントです
 1234ABCD :参戦ID
参加者募集！
Lv150 プロトバハムート
https://t.co/2VSqxyDfeJ`,
  {
    battleId: '1234ABCD',
    enemyName: 'プロトバハムート',
    level: '150',
    language: 'ja',
    comment: 'これは\nコメントです\n',
    image: 'https://t.co/2VSqxyDfeJ',
  }
);

runTest(
  'ja + level',
  `3D9AD488 :参戦ID
参加者募集！
Lv150 プロトバハムート`,
  {
    battleId: '3D9AD488',
    enemyName: 'プロトバハムート',
    level: '150',
    language: 'ja',
  }
);

runTest(
  'ja',
  `4F548392 :参戦ID
参加者募集！
黄龍・黒麒麟HL`,
  {
    battleId: '4F548392',
    enemyName: '黄龍・黒麒麟HL',
    level: '???',
    language: 'ja',
  }
);

runTest(
  'en + comment + level + image',
  `This
is a comment
 ABCD1234 :Battle ID
I need backup !
Lvl 150 Proto Bahamut
https://t.co/ztqZyA6H6n`,
  {
    battleId: 'ABCD1234',
    enemyName: 'Proto Bahamut',
    level: '150',
    language: 'en',
    comment: 'This\nis a comment\n',
    image: 'https://t.co/ztqZyA6H6n',
  }
);

runTest(
  'en + level',
  `ABCD1234 :Battle ID
I need backup !
Lvl 150 Proto Bahamut`,
  {
    battleId: 'ABCD1234',
    enemyName: 'Proto Bahamut',
    level: '150',
    language: 'en',
  }
);

runTest(
  'en',
  `CBDE14E3 :Battle ID
I need backup!
Huanglong & Qilin (Impossible)`,
  {
    battleId: 'CBDE14E3',
    enemyName: 'Huanglong & Qilin (Impossible)',
    level: '???',
    language: 'en',
  }
);

function runTest(desc: string, text: string, ideal: GbfTweet) {
  describe(desc, () => {
    const res = parse(text);
    test('battleId', () => {
      expect(res?.battleId).toBe(ideal.battleId);
    });
    test('level', () => {
      expect(res?.level).toBe(ideal.level);
    });
    test('enemyName', () => {
      expect(res?.enemyName).toBe(ideal.enemyName);
    });
    test('comment', () => {
      expect(res?.comment).toBe(ideal.comment);
    });
    test('image', () => {
      expect(res?.image).toBe(ideal.image);
    });
    test('language', () => {
      expect(res?.language).toBe(ideal.language);
    });
  });
}
