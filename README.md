# recoveryph

CLI to encode a recovery phrase into a text according to a secret code

## Algorithm

You can hide your 24-words recovery phrase (which corresponds to your private key) into a huge list of words according to a secret code.

Take:
- your (brain-stored) secret code composed of numbers such as `39421311` (0 is not valid)
- your 24-words recovery phrase
...and give them to `recoveryph`. It will generate a list of words including your 24-words recovery phrase using your secret code using this simple algorythm:

- insert `3` random words and then insert the 1st word of your 24-words list
- insert `9` random words and then insert the 2nd word of your 24-words list
- insert `4` random words and then insert the 3nd word of your 24-words list
- insert `2` random words and then insert the 4th word of your 24-words list
- insert `1` random words and then insert the 5th word of your 24-words list
- insert `3` random words and then insert the 6th word of your 24-words list
- insert `1` random words and then insert the 7th word of your 24-words list
- insert `1` random words and then insert the 8th word of your 24-words list

... and continue using this secret code pattern:

- insert `3` random words and then insert the 1st word of your 24-words list

... until the 24th word of your 24-words list

## Usage

### Encode your recovery phrase into a file

`npx recoveryph encode --phrase-file=~/24-words.txt --secret-code=39421311`

### Decode your recovery phrase from an encoded file

`npx recoveryph decode --encoded-file=~/encoded.txt --secret-code=39421311`


