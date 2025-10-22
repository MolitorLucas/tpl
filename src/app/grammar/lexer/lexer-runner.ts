import { IToken } from "chevrotain";
import { ICategorizedTokens } from "./../models/categorized-token.model";
import { getTplLexer } from "./lexer";

export const runLexer = (
  inputText: string
): { categorizedResult: ICategorizedTokens; result: IToken[] } => {
  const categorizedResult: ICategorizedTokens = {
    keywords: [],
    symbols: [],
    identifiers: [],
    literals: [],
    operators: [],
    errors: [],
  };
  const tplLexer = getTplLexer();

  const lexingResult = tplLexer.tokenize(inputText);

  if (lexingResult.errors.length > 0) {
    categorizedResult.errors = lexingResult.errors.map((err) => err.message);
    return { categorizedResult, result: lexingResult.tokens };
  }

  lexingResult.tokens.forEach((token: IToken) => {
    const category = token.tokenType.CATEGORIES?.[0];
    const image = token.image;

    switch (category?.name) {
      case "keyword":
        categorizedResult.keywords.push(image);
        break;
      case "symbol":
        categorizedResult.symbols.push(image);
        break;
      case "identifier":
        categorizedResult.identifiers.push(image);
        break;
      case "literal":
        categorizedResult.literals.push(image);
        break;
      case "operator":
        categorizedResult.operators.push(image);
        break;
      default:
        console.warn(`Unexpected token: ${token.tokenType.name}`);
        break;
    }
  });

  return { categorizedResult, result: lexingResult.tokens };
};
