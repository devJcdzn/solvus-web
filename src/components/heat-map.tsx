"use client";

import React, { useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tooltip } from "react-tooltip";
import { accessData, MapKey } from "@/features/admin/dashboard/types";

const geoUrl =
  "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/brazil-states.geojson";

const colorScale = scaleLinear<string>()
  .domain([0, 1, 5, 10]) // escala reduzida, focada em valores pequenos
  .range(["#cce5ff", "#66b2ff", "#0066cc", "#003366"]);

export function BrazilHeatMap({ mapa_calor }: Pick<accessData, "mapa_calor">) {
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const estadosOficiais: Record<string, string> = {
    ac: "acre",
    al: "alagoas",
    ap: "amapá",
    am: "amazonas",
    ba: "bahia",
    ce: "ceará",
    df: "distrito federal",
    es: "espírito santo",
    go: "goiás",
    ma: "maranhão",
    mt: "mato grosso",
    ms: "mato grosso do sul",
    mg: "minas gerais",
    pa: "pará",
    pb: "paraíba",
    pr: "paraná",
    pe: "pernambuco",
    pi: "piauí",
    rj: "rio de janeiro",
    rn: "rio grande do norte",
    rs: "rio grande do sul",
    ro: "rondônia",
    rr: "roraima",
    sc: "santa catarina",
    sp: "são paulo",
    se: "sergipe",
    to: "tocantins",
  };

  const mediaPorEstado = useMemo(() => {
    if (!mapa_calor || typeof mapa_calor !== "object") return {};

    const acumulado = new Map<string, { total: number; count: number }>();
    let visitantesAnonimos = 0;

    Object.values(mapa_calor).forEach((estados: MapKey[]) => {
      estados.forEach(({ uf, quantidade }) => {
        const valor = Number(quantidade);
        if (!uf || uf.trim() === "") {
          visitantesAnonimos += valor;
          return;
        }

        const nomeOficial = estadosOficiais[normalize(uf)];
        if (!nomeOficial) return;

        const estado = normalize(nomeOficial);

        if (!acumulado.has(estado)) {
          acumulado.set(estado, { total: 0, count: 0 });
        }

        const atual = acumulado.get(estado)!;
        acumulado.set(estado, {
          total: atual.total + valor,
          count: atual.count + 1,
        });
      });
    });

    const resultado: Record<string, number> = {};
    acumulado.forEach(({ total, count }, estado) => {
      resultado[estado] = count > 0 ? total / count : 0;
    });

    // Adiciona os visitantes anônimos em uma chave especial
    resultado["__anonimo"] = visitantesAnonimos;

    return resultado;
  }, [mapa_calor]);

  const getValorEstado = (nome: string): number =>
    mediaPorEstado[normalize(nome)] ?? 0;

  if (!mapa_calor || typeof mapa_calor !== "object") {
    return (
      <Card className="w-full h-64 flex items-center justify-center">
        <CardContent>Sem dados disponíveis para exibir o mapa.</CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle>Mapa de Calor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <div className="w-full h-auto">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 800, center: [-55, -15] }}
              width={800}
              height={500}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const estado = geo.properties.name;
                    const valor = getValorEstado(estado);

                    console.log({ estado, valor });

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        data-tooltip-id="tooltip"
                        data-tooltip-content={`${estado}: ${Math.round(valor)}`}
                        style={{
                          default: {
                            fill: colorScale(valor),
                            stroke: "#FFF",
                            strokeWidth: 0.5,
                            outline: "none",
                          },
                          hover: {
                            fill: "#ffa726",
                            outline: "none",
                          },
                          pressed: {
                            fill: "#fb8c00",
                            outline: "none",
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
            <Tooltip id="tooltip" />
            <div className="flex gap-3 mt-4 text-xs items-center">
              {[0, 1, 5, 10].map((val, i, arr) => (
                <div key={i} className="flex items-center gap-1">
                  <div
                    className="w-4 h-3"
                    style={{ backgroundColor: colorScale(val) }}
                  ></div>
                  {i < arr.length - 1 && (
                    <span>
                      {val} - {arr[i + 1]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {mediaPorEstado["__anonimo"] > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            Visitantes anônimos: {Math.round(mediaPorEstado["__anonimo"])}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
