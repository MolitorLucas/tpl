import { CstParser, IToken } from "chevrotain";
import { allTokens, tokens } from "../tokens";

export class TPLParser extends CstParser {
  constructor() {
    super(allTokens);

    // === Definição das Regras GramaticaIS ===

    this.RULE("program", () => {
      this.CONSUME(tokens.InicioDoFim);
      this.MANY(() => {
        this.SUBRULE(this.statement);
      });
      this.CONSUME(tokens.FimDoInicio);
    });

    this.RULE("block", () => {
      this.CONSUME(tokens.LCurly);
      this.MANY(() => {
        this.SUBRULE(this.statement);
      });
      this.CONSUME(tokens.RCurly);
    });

    this.RULE("statement", () => {
      this.OR([
        { ALT: () => this.SUBRULE(this.declarationStatement) },
        { ALT: () => this.SUBRULE(this.assignmentStatement) },
        { ALT: () => this.SUBRULE(this.readStatement) },
        { ALT: () => this.SUBRULE(this.printStatement) },
        { ALT: () => this.SUBRULE(this.ifStatement) },
        { ALT: () => this.SUBRULE(this.whileStatement) },
        { ALT: () => this.SUBRULE(this.forStatement) },
      ]);
    });

    this.RULE("declarationStatement", () => {
      this.CONSUME(tokens.Identifier);
      this.CONSUME(tokens.Colon);
      this.SUBRULE(this.type);
      this.CONSUME(tokens.Terminator);
    });

    this.RULE("type", () => {
      this.OR([
        { ALT: () => this.CONSUME(tokens.InfiType) },
        { ALT: () => this.CONSUME(tokens.Mel5050Type) },
        { ALT: () => this.CONSUME(tokens.SoMuchTextoType) },
      ]);
    });

    this.RULE("assignmentStatement", () => {
      this.SUBRULE(this.simpleAssignment);
      this.CONSUME(tokens.Terminator);
    });

    this.RULE("simpleAssignment", () => {
      this.CONSUME(tokens.Identifier);
      this.CONSUME(tokens.Assignment);
      this.SUBRULE(this.expression);
    });

    this.RULE("readStatement", () => {
      this.CONSUME(tokens.IssoEhGulaCara);
      this.CONSUME(tokens.LParen);
      this.CONSUME(tokens.Identifier);
      this.CONSUME(tokens.RParen);
      this.CONSUME(tokens.Terminator);
    });

    this.RULE("printStatement", () => {
      this.CONSUME(tokens.Banido);
      this.CONSUME(tokens.LParen);
      this.SUBRULE(this.expression);
      this.CONSUME(tokens.RParen);
      this.CONSUME(tokens.Terminator);
    });

    // 5. Condicional:
    // CORREÇÃO: "block" aparece 2x
    this.RULE("ifStatement", () => {
      this.CONSUME(tokens.DessaVez);
      this.CONSUME(tokens.LParen);
      this.SUBRULE(this.condition);
      this.CONSUME(tokens.RParen);
      this.CONSUME(tokens.EuAcredito);
      this.SUBRULE(this.block); // Primeira chamada a block
      this.OPTION(() => {
        this.CONSUME(tokens.Vish);
        this.SUBRULE2(this.block); // Segunda chamada a block (usa SUBRULE2)
      });
    });

    // 6. Repetição While:
    this.RULE("whileStatement", () => {
      this.CONSUME(tokens.FiuzaQuestiona);
      this.CONSUME(tokens.LParen);
      this.SUBRULE(this.condition);
      this.CONSUME(tokens.RParen);
      this.SUBRULE(this.block);
    });

    // 7. Repetição For:
    // CORREÇÃO: "simpleAssignment" aparece 2x e "Comma" aparece 2x
    this.RULE("forStatement", () => {
      this.CONSUME(tokens.JohnsonResponde);
      this.CONSUME(tokens.LParen);
      this.SUBRULE(this.simpleAssignment); // Primeira chamada
      this.CONSUME(tokens.Comma); // Primeira chamada
      this.SUBRULE(this.condition);
      this.CONSUME2(tokens.Comma); // Segunda chamada (usa CONSUME2)
      this.SUBRULE2(this.simpleAssignment); // Segunda chamada (usa SUBRULE2)
      this.CONSUME(tokens.RParen);
      this.SUBRULE(this.block);
    });

    // --- Expressões (com precedência) ---

    // CORREÇÃO: "relationalExpression" aparece 2x
    this.RULE("condition", () => {
      this.SUBRULE(this.relationalExpression); // Primeira chamada
      this.MANY(() => {
        this.OR([
          { ALT: () => this.CONSUME(tokens.And) },
          { ALT: () => this.CONSUME(tokens.Or) },
        ]);
        this.SUBRULE2(this.relationalExpression); // Segunda chamada (usa SUBRULE2)
      });
    });

    // CORREÇÃO: "expression" aparece 2x
    this.RULE("relationalExpression", () => {
      this.SUBRULE(this.expression); // Primeira chamada
      this.OR([
        { ALT: () => this.CONSUME(tokens.Equal) },
        { ALT: () => this.CONSUME(tokens.NotEqual) },
        { ALT: () => this.CONSUME(tokens.GreaterThan) },
        { ALT: () => this.CONSUME(tokens.LessThan) },
        { ALT: () => this.CONSUME(tokens.GreaterThanOrEqual) },
        { ALT: () => this.CONSUME(tokens.LessThanOrEqual) },
      ]);
      this.SUBRULE2(this.expression); // Segunda chamada (usa SUBRULE2)
    });

    // CORREÇÃO: "multiplicativeExpression" aparece 2x
    this.RULE("expression", () => {
      this.SUBRULE(this.multiplicativeExpression); // Primeira chamada
      this.MANY(() => {
        this.OR([
          { ALT: () => this.CONSUME(tokens.Plus) },
          { ALT: () => this.CONSUME(tokens.Minus) },
        ]);
        this.SUBRULE2(this.multiplicativeExpression); // Segunda chamada
      });
    });

    // CORREÇÃO: "atomicExpression" aparece 2x
    this.RULE("multiplicativeExpression", () => {
      this.SUBRULE(this.atomicExpression); // Primeira chamada
      this.MANY(() => {
        this.OR([
          { ALT: () => this.CONSUME(tokens.Multiplication) },
          { ALT: () => this.CONSUME(tokens.Division) },
        ]);
        this.SUBRULE2(this.atomicExpression); // Segunda chamada
      });
    });

    this.RULE("atomicExpression", () => {
      this.OR([
        {
          ALT: () => {
            this.CONSUME(tokens.LParen);
            this.SUBRULE(this.expression);
            this.CONSUME(tokens.RParen);
          },
        },
        { ALT: () => this.CONSUME(tokens.Identifier) },
        { ALT: () => this.CONSUME(tokens.NumberLiteral) },
        { ALT: () => this.CONSUME(tokens.StringLiteral) },
        { ALT: () => this.CONSUME(tokens.BooleanLiteral) },
      ]);
    });

    // Executa a auto-análise do parser. Essencial.
    this.performSelfAnalysis();
  }
}
export const parse = (parser: CstParser, tokens: IToken[]) => {
  parser.input = tokens;
  const cst = parser.program();
  console.log(cst);
  let result = "";

  if (parser.errors.length > 0) {
    result += "Erros encontrados no Analisador Sintático:\n";
    parser.errors.forEach((err) => {
      result += `- ${err.message};`;
    });
    console.log(result);
    return result;
  }

  return cst;
};
