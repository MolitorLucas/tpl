import { createToken, IToken, Lexer } from "chevrotain";
import Image from "next/image";
import styles from "./page.module.css";

// =================================================================================================
// 1. CATEGORIES (Interfaces for organization and type safety)
// =================================================================================================

interface ICategorizedTokens {
  keywords: string[];
  symbols: string[];
  identifiers: string[];
  literals: string[];
  operators: string[];
  errors: string[];
}

// =================================================================================================
// 2. TOKENS (Unchanged from the previous response)
// =================================================================================================

// Whitespace
const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

// Keywords and Reserved Words
const InicioDoFim = createToken({
  name: "InicioDoFim",
  pattern: /\*InicioDoFim/,
  categories: { name: "keyword" },
});
const FimDoInicio = createToken({
  name: "FimDoInicio",
  pattern: /FimDoInicio\*/,
  categories: { name: "keyword" },
});
const DessaVez = createToken({
  name: "DessaVez",
  pattern: /DessaVez/,
  categories: { name: "keyword" },
});
const EuAcredito = createToken({
  name: "EuAcredito",
  pattern: /EuAcredito/,
  categories: { name: "keyword" },
});
const Vish = createToken({
  name: "Vish",
  pattern: /Vish/,
  categories: { name: "keyword" },
});
const FiuzaQuestiona = createToken({
  name: "FiuzaQuestiona",
  pattern: /FiuzaQuestiona/,
  categories: { name: "keyword" },
});
const JohnsonResponde = createToken({
  name: "JohnsonResponde",
  pattern: /JohnsonResponde/,
  categories: { name: "keyword" },
});
const IssoEhGulaCara = createToken({
  name: "IssoEhGulaCara",
  pattern: /IssoEhGulaCara/,
  categories: { name: "keyword" },
});
const Banido = createToken({
  name: "Banido",
  pattern: /Banido/,
  categories: { name: "keyword" },
});

// Data Types (can be considered keywords)
const SoMuchTextoType = createToken({
  name: "SoMuchTextoType",
  pattern: /SoMuchTexto/,
  categories: { name: "keyword" },
});
const Mel5050Type = createToken({
  name: "Mel5050Type",
  pattern: /Mel5050/,
  categories: { name: "keyword" },
});
const InfiType = createToken({
  name: "InfiType",
  pattern: /Infi/,
  categories: { name: "keyword" },
});

// Literals
const StringLiteral = createToken({
  name: "StringLiteral",
  pattern: /'“.*?'”/,
  categories: { name: "literal" },
});
const BooleanLiteral = createToken({
  name: "BooleanLiteral",
  pattern: /prata|ouro/,
  categories: { name: "literal" },
});
const NumberLiteral = createToken({
  name: "NumberLiteral",
  pattern: /\d+/,
  categories: { name: "literal" },
});

// Operators
const Plus = createToken({
  name: "Plus",
  pattern: /°\+°/,
  categories: { name: "operator" },
});
const Minus = createToken({
  name: "Minus",
  pattern: /°\-°/,
  categories: { name: "operator" },
});
const Multiplication = createToken({
  name: "Multiplication",
  pattern: /°\*°/,
  categories: { name: "operator" },
});
const Division = createToken({
  name: "Division",
  pattern: /°\/°/,
  categories: { name: "operator" },
});
const And = createToken({
  name: "And",
  pattern: /°&&°/,
  categories: { name: "operator" },
});
const Or = createToken({
  name: "Or",
  pattern: /°\|\|°/,
  categories: { name: "operator" },
});
const GreaterThanOrEqual = createToken({
  name: "GreaterThanOrEqual",
  pattern: />=/,
  categories: { name: "operator" },
});
const LessThanOrEqual = createToken({
  name: "LessThanOrEqual",
  pattern: /<=/,
  categories: { name: "operator" },
});
const NotEqual = createToken({
  name: "NotEqual",
  pattern: /!\?/,
  categories: { name: "operator" },
});
const GreaterThan = createToken({
  name: "GreaterThan",
  pattern: />/,
  categories: { name: "operator" },
});
const LessThan = createToken({
  name: "LessThan",
  pattern: /</,
  categories: { name: "operator" },
});
const Equal = createToken({
  name: "Equal",
  pattern: /=/,
  categories: { name: "operator" },
});
const Assignment = createToken({
  name: "Assignment",
  pattern: /<-/,
  categories: { name: "operator" },
});

// Symbols and Delimiters
const LCurly = createToken({
  name: "LCurly",
  pattern: /{/,
  categories: { name: "symbol" },
});
const RCurly = createToken({
  name: "RCurly",
  pattern: /}/,
  categories: { name: "symbol" },
});
const LParen = createToken({
  name: "LParen",
  pattern: /\(°/,
  categories: { name: "symbol" },
});
const RParen = createToken({
  name: "RParen",
  pattern: /°\)/,
  categories: { name: "symbol" },
});
const Comma = createToken({
  name: "Comma",
  pattern: /,/,
  categories: { name: "symbol" },
});
const Colon = createToken({
  name: "Colon",
  pattern: /:/,
  categories: { name: "symbol" },
});
const Terminator = createToken({
  name: "Terminator",
  pattern: /_VsfdAdmin;/,
  categories: { name: "symbol" },
});

// Identifiers
const Identifier = createToken({
  name: "Identifier",
  pattern: /!joaomarcelo_[a-zA-Z][a-zA-Z0-9]*/,
  categories: { name: "identifier" },
});

// =================================================================================================
// 3. LEXER CONFIGURATION (Unchanged)
// =================================================================================================

const allTokens = [
  WhiteSpace,
  InicioDoFim,
  FimDoInicio,
  DessaVez,
  EuAcredito,
  Vish,
  FiuzaQuestiona,
  JohnsonResponde,
  IssoEhGulaCara,
  Banido,
  SoMuchTextoType,
  Mel5050Type,
  InfiType,
  StringLiteral,
  BooleanLiteral,
  NumberLiteral,
  Plus,
  Minus,
  Multiplication,
  Division,
  And,
  Or,
  GreaterThanOrEqual,
  LessThanOrEqual,
  NotEqual,
  Assignment,
  GreaterThan,
  LessThan,
  Equal,
  LCurly,
  RCurly,
  LParen,
  RParen,
  Comma,
  Colon,
  Terminator,
  Identifier,
];

export const TPLLexer = new Lexer(allTokens, {
  errorMessageProvider: {
    buildUnexpectedCharactersMessage: (
      fullText,
      startOffset,
      length,
      line,
      column
    ) =>
      `Error: Unexpected character '${fullText.charAt(
        startOffset
      )}' at line ${line}, column ${column}.`,
    buildUnableToPopLexerModeMessage(token) {
      return `Error: Unable to pop lexer mode for token '${token.image}' at line ${token.startLine}, column ${token.startColumn}.`;
    },
  },
});

// =================================================================================================
// 4. CATEGORIZATION FUNCTION
// =================================================================================================

/**
 * Tokenizes the input text and categorizes the found tokens into a structured object.
 * @param inputText The TPL source code to analyze.
 * @returns An object containing arrays of tokens for each category.
 */
export function runLexerAndCategorize(inputText: string): ICategorizedTokens {
  const categorizedResult: ICategorizedTokens = {
    keywords: [],
    symbols: [],
    identifiers: [],
    literals: [],
    operators: [],
    errors: [],
  };

  const lexingResult = TPLLexer.tokenize(inputText);

  if (lexingResult.errors.length > 0) {
    categorizedResult.errors = lexingResult.errors.map((err) => err.message);
    return categorizedResult;
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
        // This case should ideally not be reached if all tokens are categorized
        console.warn(`Uncategorized token found: ${token.tokenType.name}`);
        break;
    }
  });

  return categorizedResult;
}

// =================================================================================================
// 5. USAGE EXAMPLE
// =================================================================================================
const exampleCode = `
*InicioDoFim
!joaomarcelo_num1:Infi _VsfdAdmin;
!joaomarcelo_num2:Infi _VsfdAdmin;
!joaomarcelo_media:Infi _VsfdAdmin;

IssoEhGulaCara (° !joaomarcelo_num1 °) _VsfdAdmin;
IssoEhGulaCara (° !joaomarcelo_num2 °) _VsfdAdmin;
!joaomarcelo_media <- (° !joaomarcelo_num1 °+° !joaomarcelo_num2 °)°/° 2_VsfdAdmin;

Banido (° !joaomarcelo_media °) _VsfdAdmin;
FimDoInicio*
`;

// Run the lexer and get the categorized object
const analysisResult = runLexerAndCategorize(exampleCode);

// Print the resulting object to the console in a readable format
console.log("Lexical Analysis Result Object:");
console.log("===============================");
console.log(JSON.stringify(analysisResult, null, 2));

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
