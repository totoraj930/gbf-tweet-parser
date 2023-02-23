# gbf-tweet-parser

Parser for Granblue Fantasy request backup tweets.

## Installing

```bash
$ npm install @totoraj930/gbf-tweet-parser
```

## Example

```ts
import { parse as parseGbfTweet } from '@totoraj930/gbf-tweet-parser';

/** Example 1 */
const gbfTweet = parseGbfTweet(
  `Help 1234ABCD :参戦ID\n参加者募集！\nLv150 プロトバハムート\nhttps://t.co/9OoqyqkmLc`
);
console.log(gbfTweet);
// ->
// {
//   battleId: '1234ABCD',
//   enemyName: 'プロトバハムート',
//   level: '150',
//   language: 'ja',
//   image: 'https://t.co/9OoqyqkmLc',
//   comment: 'Help'
// }

/** Example 2 */
const gbfTweet2 = parseGbfTweet(
  `ABCD1234 :Battle ID\nI need backup!\nHuanglong & Qilin (Impossible)`
);
console.log(gbfTweet2);
// ->
// {
//   battleId: 'ABCD1234',
//   enemyName: 'Huanglong & Qilin (Impossible)',
//   level: '???',
//   language: 'en'
// }

/** Example 3 */
const gbfTweet3 = parseGbfTweet('Other tweet');
console.log(gbfTweet3);
// -> null
```

## Result format

```ts
type GbfTweet = {
  battleId: string;
  enemyName: string;
  level: string; // No data -> '???'
  language: 'ja' | 'en';
  image?: string;
  comment?: string;
};
```

### Notes

If the tweet does not contain an enemy level, level is `'???'`.

Since level can be a string, the type is always a `string`.

## License

[MIT](LICENSE)

Reona Oshima (totoraj)

[@totoraj_game](https://twitter.com/totoraj_game)