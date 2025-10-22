import { allTokens } from "@/app/grammar/tokens";
import { Lexer } from "chevrotain";

export const getTplLexer = (): Lexer =>
  new Lexer(allTokens, {
    errorMessageProvider: {
      buildUnexpectedCharactersMessage: (
        fullText,
        startOffset,
        length,
        line,
        column
      ) =>
        `Error: Unexpected token '${fullText.slice(
          startOffset,
          startOffset + length
        )}' at line ${line}, column ${column}.`,
      buildUnableToPopLexerModeMessage(token) {
        return `Error: Unable to pop lexer mode for token '${token.image}' at line ${token.startLine}, column ${token.startColumn}.`;
      },
    },
  });
