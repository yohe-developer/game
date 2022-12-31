/**
 * Description：doom3TokenizerTest
 * Created by aio on 2022/12/29.
 */

import { Doom3Token, Doom3Tokenizer, ETokenType } from '@/IDoom3/IDoom3Token'

const doom3Tokenizer = new Doom3Tokenizer()
doom3Tokenizer.setSource('[+3.14 , -3.14 ,  .14  , -.14 , 3.  , -3.]')

const doom3Token = new Doom3Token()
while (doom3Tokenizer.getNextToken(doom3Token)) {
  if (doom3Token.type === ETokenType.NUMBER) {
    console.log('NUMBER : ' + doom3Token.getFloat().toString())
  } else {
    console.log('STRING : ' + doom3Token.getString())
  }
}
