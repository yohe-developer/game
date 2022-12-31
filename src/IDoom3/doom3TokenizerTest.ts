/**
 * Description：doom3TokenizerTest
 * Created by aio on 2022/12/29.
 */
import { sourceFile } from '@/IDoom3/asserts/file'
import { Doom3Factory, ETokenType } from '@/IDoom3/IDoom3Token'

const doom3Tokenizer = Doom3Factory.create3Tokenizer()
doom3Tokenizer.setSource(sourceFile)
while (doom3Tokenizer.moveNext()) {
  if (doom3Tokenizer.current.type === ETokenType.NUMBER) {
    console.log('NUMBER : ' + doom3Tokenizer.current.getFloat().toString())
  } else {
    console.log('STRING : ' + doom3Tokenizer.current.getString())
  }
}
