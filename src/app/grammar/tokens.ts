import { createToken, Lexer } from "chevrotain";

const WhiteSpace = createToken({
  name: "WhiteSpace",
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

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

const Identifier = createToken({
  name: "Identifier",
  pattern: /!joaomarcelo_[a-zA-Z][a-zA-Z0-9]*/,
  categories: { name: "identifier" },
});

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

export { allTokens };

