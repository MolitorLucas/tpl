"use client";
import { runLexer } from "@/app/grammar/lexer/lexer-runner";
import { useEffect, useRef, useState, Fragment } from "react";
import { TPLParser, parse } from "./grammar/parser/parser";

// Recursive renderer for parser tree JSON
function renderTree(node: any): any {
  // If node is null/undefined, render nothing
  if (node == null) return <></>;

  // If node is an array, render each element
  if (Array.isArray(node)) {
    return (
      <ul className="ml-3 list-disc list-inside">
        {node.map((child, i) => (
          <li key={i} className="mb-1">
            {renderTree(child)}
          </li>
        ))}
      </ul>
    );
  }

  // If node has 'image' or 'name', render a leaf with those details
  if (typeof node === "object") {
    const hasImage = typeof node.image === "string";
    const title = node.name ?? node.image ?? node.tokenType?.name ?? "node";

    // If node has children as an object mapping, render keys and arrays
    if (node.children && typeof node.children === "object") {
      return (
        <div>
          <div className="font-medium">{title}</div>
          <div className="ml-3">
            {Object.entries(node.children).map(([key, value]) => (
              <div key={key} className="mb-2">
                <div className="text-xs font-semibold text-gray-300">{key}</div>
                {renderTree(value)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Leaf object
    return (
      <div>
        <div className="flex items-baseline gap-2">
          <div className="text-sm font-semibold">{title}</div>
          {hasImage && (
            <div className="text-xs text-gray-400">{JSON.stringify(node.image)}</div>
          )}
        </div>
      </div>
    );
  }

  // Primitive value
  return <span>{String(node)}</span>;
}

// Convert parser JSON into node/edge lists for simple graph rendering
function buildGraph(root: any) {
  const nodes: Array<{ id: string; label: string; }> = [];
  const edges: Array<{ from: string; to: string; }> = [];
  let idCounter = 0;

  function nextId() {
    return `n${idCounter++}`;
  }

  function walk(node: any): string {
    const id = nextId();
    const label = node?.name ?? node?.image ?? node?.tokenType?.name ?? String(node ?? "node");
    nodes.push({ id, label });

    if (node && typeof node === "object" && node.children && typeof node.children === "object") {
      for (const [key, childArray] of Object.entries(node.children)) {
        // create intermediate grouping node
        const groupId = nextId();
        nodes.push({ id: groupId, label: String(key) });
        edges.push({ from: id, to: groupId });

        if (Array.isArray(childArray)) {
          for (const child of childArray) {
            const childId = walk(child);
            edges.push({ from: groupId, to: childId });
          }
        } else {
          const childId = walk(childArray);
          edges.push({ from: groupId, to: childId });
        }
      }
    }

    return id;
  }

  walk(root);
  return { nodes, edges };
}

// Very simple layout: position nodes by their index and depth-level inferred from edges
function layoutGraph(nodes: any[], edges: any[]) {
  // compute depth by BFS from root (node with id 'n0')
  const adj = new Map<string, string[]>();
  for (const n of nodes) adj.set(n.id, []);
  for (const e of edges) {
    adj.get(e.from)!.push(e.to);
  }

  const levels: Record<string, number> = {};
  const rootId = nodes[0]?.id;
  const queue: string[] = [];
  if (rootId) {
    queue.push(rootId);
    levels[rootId] = 0;
  }

  while (queue.length) {
    const cur = queue.shift()!;
    const level = levels[cur];
    for (const nb of adj.get(cur) || []) {
      if (levels[nb] === undefined) {
        levels[nb] = level + 1;
        queue.push(nb);
      }
    }
  }

  // group by level
  const byLevel: Record<number, string[]> = {};
  for (const n of nodes) {
    const lv = levels[n.id] ?? 0;
    byLevel[lv] = byLevel[lv] || [];
    byLevel[lv].push(n.id);
  }

  const positions: Record<string, { x: number; y: number }> = {};
  const levelKeys = Object.keys(byLevel).map((k) => parseInt(k)).sort((a, b) => a - b);
  const vGap = 80;
  const hGap = 140;

  // compute max nodes in any level to center levels horizontally
  const maxCount = Math.max(...Object.values(byLevel).map((arr) => arr.length));
  const baseVisualWidth = (maxCount - 1) * hGap + 120; // includes node width
  const baseLeft = 40;

  for (const lv of levelKeys) {
    const ids = byLevel[lv];
    const m = ids.length;
    const levelVisualWidth = (m - 1) * hGap + 120;
    // leftmost center position for this level
    const leftmostCenter = baseLeft + (baseVisualWidth - levelVisualWidth) / 2 + 60;
    for (let i = 0; i < ids.length; i++) {
      const center = leftmostCenter + i * hGap;
      // p.x is stored in the same manner as before (center - 20)
      positions[ids[i]] = { x: center - 20, y: lv * vGap + 40 };
    }
  }

  const width = baseLeft * 2 + baseVisualWidth + 40;
  const height = (levelKeys.length + 1) * vGap + 80;

  return { positions, width, height };
}

function renderParserGraph(root: any): any {
  try {
    const { nodes, edges } = buildGraph(root);
  const layout = layoutGraph(nodes, edges);
  const positions = layout.positions;
  const width = layout.width || 400;
  const height = layout.height || 200;

    return (
      <svg width={width} height={height} className="bg-gray-900">
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#9CA3AF" />
          </marker>
        </defs>
        {/* edges */}
        {edges.map((e, i) => {
          const from = positions[e.from as string];
          const to = positions[e.to as string];
          if (!from || !to) return null;
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#9CA3AF"
              strokeWidth={1}
              markerEnd="url(#arrow)"
            />
          );
        })}

        {/* nodes */}
        {nodes.map((n) => {
          const p = positions[n.id as string];
          if (!p) return null;
          return (
            <g key={n.id}>
              <rect x={p.x - 40} y={p.y - 16} width={120} height={32} rx={6} fill="#1F2937" stroke="#374151" />
              <text x={p.x + 20} y={p.y + 6} fill="#E5E7EB" fontSize={12} textAnchor="middle">
                {String(n.label).slice(0, 24)}
              </text>
            </g>
          );
        })}
      </svg>
    );
  } catch (err) {
    return <div className="text-red-400">Erro ao renderizar grafo</div>;
  }
}

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
                {/* <th className="py-3 px-6 text-left">Árvore Sintática</th> */}
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
                    {/* If this is the errors row, render a third cell with the parser tree */}
                    
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Graph output: render a SVG graph of the parser result */}
        <div className="w-full bg-gray-800 rounded-lg shadow-xl overflow-auto mb-8 p-4">
          <div className="p-2 bg-gray-700 text-gray-200 font-semibold text-lg border-b border-gray-600 mb-3" style={{borderRadius: 7}}>
            Árvore (Grafo)
          </div>
          <div className="text-sm text-gray-200">
            {typeof resultadoParser !== "string" ? (
              <div style={{ width: "100%", overflow: "auto" }}>
                {/** center the svg horizontally */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ maxWidth: "100%", overflow: "auto" }}>
                    {renderParserGraph(resultadoParser)}
                  </div>
                </div>
              </div>
            ) : (
                <span className="text-gray-400 italic">{resultadoParser}</span>
            )}
          </div>
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
