import { createToken, IToken, Lexer } from "chevrotain";

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
  categories: [{ name: "keyword" }], // Changed to array of ITokenCategory
});
const FimDoInicio = createToken({
  name: "FimDoInicio",
  pattern: /FimDoInicio\*/,
  categories: [{ name: "keyword" }], // Changed to array of ITokenCategory
});
const DessaVez = createToken({
  name: "DessaVez",
  pattern: /DessaVez/,
  categories: [{ name: "keyword" }], // Changed to array of ITokenCategory
});
const EuAcredito = createToken({
  name: "EuAcredito",
  pattern: /EuAcredito/,
  categories: [{ name: "keyword" }], // Changed to array of ITokenCategory
});
const Vish = createToken({
  name: "Vish",
  pattern: /Vish/,
  categories: [{ name: "keyword" }], // Changed to array of ITokenCategory
});
const FiuzaQuestiona = createToken({
  name: "FiuzaQuestiona",
  pattern: /FiuzaQuestiona/,
  categories: [{ name: "keyword" }], // Changed to array of ITokenCategory
});
const JohnsonResponde = createToken({
  name: "JohnsonResponde",
  pattern: /JohnsonResponde/,
  categories: [{ name: "keyword" }], // Changed to array of ITokenCategory
});
const IssoEhGulaCara = createToken({
  name: "IssoEhGulaCara",
  pattern: /IssoEhGulaCara/,
  categories: [{ name: "keyword" }], // Changed to array of ITokenCategory
});
const Banido = createToken({
  name: "Banido",
  pattern: /Banido/,
  categories: [{ name: "keyword" }], // Changed to array of ITokenCategory
});

// Data Types (can be considered keywords)
const SoMuchTextoType = createToken({
  name: "SoMuchTextoType",
  pattern: /SoMuchTexto/,
  categories: [{ name: "keyword" }], // Changed to array of ITokenCategory
});
const Mel5050Type = createToken({
  name: "Mel5050Type",
  pattern: /Mel5050/,
  categories: [{ name: "keyword" }], // Changed to array of ITokenCategory
});
const InfiType = createToken({
  name: "InfiType",
  pattern: /Infi/,
  categories: [{ name: "keyword" }], // Changed to array of ITokenCategory
});

// Literals
const StringLiteral = createToken({
  name: "StringLiteral",
  pattern: /'“.*?'”/,
  categories: [{ name: "literal" }], // Changed to array of ITokenCategory
});
const BooleanLiteral = createToken({
  name: "BooleanLiteral",
  pattern: /prata|ouro/,
  categories: [{ name: "literal" }], // Changed to array of ITokenCategory
});
const NumberLiteral = createToken({
  name: "NumberLiteral",
  pattern: /\d+/,
  categories: [{ name: "literal" }], // Changed to array of ITokenCategory
});

// Operators
const Plus = createToken({
  name: "Plus",
  pattern: /°\+°/,
  categories: [{ name: "operator" }], // Changed to array of ITokenCategory
});
const Minus = createToken({
  name: "Minus",
  pattern: /°\-°/,
  categories: [{ name: "operator" }], // Changed to array of ITokenCategory
});
const Multiplication = createToken({
  name: "Multiplication",
  pattern: /°\*°/,
  categories: [{ name: "operator" }], // Changed to array of ITokenCategory
});
const Division = createToken({
  name: "Division",
  pattern: /°\/°/,
  categories: [{ name: "operator" }], // Changed to array of ITokenCategory
});
const And = createToken({
  name: "And",
  pattern: /°&&°/,
  categories: [{ name: "operator" }], // Changed to array of ITokenCategory
});
const Or = createToken({
  name: "Or",
  pattern: /°\|\|°/,
  categories: [{ name: "operator" }], // Changed to array of ITokenCategory
});
const GreaterThanOrEqual = createToken({
  name: "GreaterThanOrEqual",
  pattern: />=/,
  categories: [{ name: "operator" }], // Changed to array of ITokenCategory
});
const LessThanOrEqual = createToken({
  name: "LessThanOrEqual",
  pattern: /<=/,
  categories: [{ name: "operator" }], // Changed to array of ITokenCategory
});
const NotEqual = createToken({
  name: "NotEqual",
  pattern: /!\?/,
  categories: [{ name: "operator" }], // Changed to array of ITokenCategory
});
const GreaterThan = createToken({
  name: "GreaterThan",
  pattern: />/,
  categories: [{ name: "operator" }], // Changed to array of ITokenCategory
});
const LessThan = createToken({
  name: "LessThan",
  pattern: /</,
  categories: [{ name: "operator" }], // Changed to array of ITokenCategory
});
const Equal = createToken({
  name: "Equal",
  pattern: /=/,
  categories: [{ name: "operator" }], // Changed to array of ITokenCategory
});
const Assignment = createToken({
  name: "Assignment",
  pattern: /<-/,
  categories: [{ name: "operator" }], // Changed to array of ITokenCategory
});

// Symbols and Delimiters
const LCurly = createToken({
  name: "LCurly",
  pattern: /{/,
  categories: [{ name: "symbol" }], // Changed to array of ITokenCategory
});
const RCurly = createToken({
  name: "RCurly",
  pattern: /}/,
  categories: [{ name: "symbol" }], // Changed to array of ITokenCategory
});
const LParen = createToken({
  name: "LParen",
  pattern: /\(°/,
  categories: [{ name: "symbol" }], // Changed to array of ITokenCategory
});
const RParen = createToken({
  name: "RParen",
  pattern: /°\)/,
  categories: [{ name: "symbol" }], // Changed to array of ITokenCategory
});
const Comma = createToken({
  name: "Comma",
  pattern: /,/,
  categories: [{ name: "symbol" }], // Changed to array of ITokenCategory
});
const Colon = createToken({
  name: "Colon",
  pattern: /:/,
  categories: [{ name: "symbol" }], // Changed to array of ITokenCategory
});
const Terminator = createToken({
  name: "Terminator",
  pattern: /_VsfdAdmin;/,
  categories: [{ name: "symbol" }], // Changed to array of ITokenCategory
});

// Identifiers
const Identifier = createToken({
  name: "Identifier",
  pattern: /!joaomarcelo_[a-zA-Z][a-zA-Z0-9]*/,
  categories: [{ name: "identifier" }], // Changed to array of ITokenCategory
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
    // Access the category name from the first element of the CATEGORIES array
    const categoryName = token.tokenType.CATEGORIES?.[0]?.name;
    const image = token.image;

    switch (categoryName) {
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
// 5. USAGE EXAMPLE AND COMPONENT
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

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-10 font-inter">
      {/* Main content area */}
      <main className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center leading-tight rounded-xl p-4 shadow-lg bg-gray-800">
          Análise Léxica de Código TPL
        </h1>

        <p className="text-gray-300 text-lg mb-8 text-center max-w-2xl">
          Abaixo você encontrará a categorização dos tokens do código de exemplo,
          divididos por tipo para uma melhor visualização.
        </p>

        <div className="w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-8">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-700 text-gray-200 uppercase text-sm font-semibold">
                <th className="py-3 px-6 text-left">Categoria</th>
                <th className="py-3 px-6 text-left">Tokens Encontrados</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {Object.entries(analysisResult).map(([category, tokens], index) => (
                <tr
                  key={category}
                  className={`border-b border-gray-600 ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } hover:bg-gray-600 transition duration-300 ease-in-out`}
                >
                  <td className="py-3 px-6 whitespace-nowrap font-medium capitalize">
                    {category === "errors" ? "Erros" : category.replace(/([A-Z])/g, ' $1').trim()}
                  </td>
                  <td className="py-3 px-6 break-words">
                    {tokens.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {tokens.map((token, tokenIndex) => (
                          <span
                            key={tokenIndex}
                            className="bg-purple-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full shadow-md"
                          >
                            {token}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Nenhum</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Code Snippet */}
        <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 bg-gray-700 text-gray-200 font-semibold text-lg border-b border-gray-600">
            Código de Exemplo Analisado
          </div>
          <pre className="p-4 text-sm bg-gray-900 text-gray-100 overflow-auto rounded-b-lg">
            <code>{exampleCode.trim()}</code>
          </pre>
        </div>
      </main>

      {/* Footer - You can customize or remove this if not needed */}
      <footer className="mt-12 text-gray-500 text-sm">
        <p>&copy; 2025 Análise Léxica. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

