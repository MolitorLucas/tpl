"use client";
import { runLexer } from "@/app/grammar/lexer/lexer-runner";
import { useEffect, useRef, useState } from "react";
import { TPLParser, parse } from "./grammar/parser/parser";

export default function Home() {
  const parser = useRef(new TPLParser()).current;
  const [codigo, setCodigo] = useState(`*InicioDoFim
  !joaomarcelo_num1:Infi _VsfdAdmin;
  !joaomarcelo_num2:Infi
  !joaomarcelo_media:Infi _VsfdAdmin;

  IssoEhGulaCara (° !joaomarcelo_num1 °) _VsfdAdmin;
  IssoEhGulaCara (° !joaomarcelo_num2 °) _VsfdAdmin;
  !joaomarcelo_media <- (° !joaomarcelo_num1 °+° !joaomarcelo_num2 °)°/° 2_VsfdAdmin;

  Banido (° !joaomarcelo_media °) _VsfdAdmin;
FimDoInicio*`);

  const [resultadoLexer, setResultadoLexer] = useState(
    () => runLexer(codigo).categorizedResult
  );

  const [resultadoParser, setResultadoParser] = useState(() =>
    parse(parser, runLexer(codigo).result)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setResultadoLexer(runLexer(codigo).categorizedResult);
      setResultadoParser(parse(parser, runLexer(codigo).result));
    }, 300);

    return () => clearTimeout(timer);
  }, [codigo]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-10 font-inter">
      <main className="flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8 text-center leading-tight rounded-xl p-4 shadow-lg bg-gray-800">
          Analisador Léxico TPL
        </h1>

        <div className="w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-8">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-700 text-gray-200 uppercase text-sm font-semibold">
                <th className="py-3 px-6 text-left">Categoria</th>
                <th className="py-3 px-6 text-left">Tokens Encontrados</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {Object.entries(resultadoLexer).map(
                ([category, tokens], index) => (
                  <tr
                    key={category}
                    className={`border-b border-gray-600 ${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                    } hover:bg-gray-600 transition duration-300 ease-in-out`}
                  >
                    <td className="py-3 px-6 whitespace-nowrap font-medium capitalize">
                      {category === "errors"
                        ? "Erros"
                        : category.replace(/([A-Z])/g, " $1").trim()}
                    </td>
                    <td className="py-3 px-6 break-words">
                      {tokens.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {tokens.map((token: string, tokenIndex: number) => (
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
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 bg-gray-700 text-gray-200 font-semibold text-lg border-b border-gray-600">
            Código de Entrada
          </div>
          <textarea
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            rows={12}
            className="w-full p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none outline-none border-none"
            spellCheck={false}
          />
        </div>
      </main>
    </div>
  );
}
