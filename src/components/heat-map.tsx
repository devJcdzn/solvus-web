// components/BrazilHeatMap.tsx
"use client";

import React from "react";
import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip } from "react-tooltip";

type EstadoData = {
  estado: string;
  valor: number;
};

const geoUrl =
  "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/brazil-states.geojson";

const colorScale = scaleLinear<string>()
  .domain([0, 50, 100, 200])
  .range(["#cce5ff", "#66b2ff", "#0066cc", "#003366"]);

export function BrazilHeatMap() {
  const [dadosAPI, setDadosAPI] = useState<EstadoData[]>([
    {
      estado: "São Paulo",
      valor: 100,
    },
    {
      estado: "Espirito Santo",
      valor: 20,
    },
  ]);

  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const getValorEstado = (nome: string): number => {
    return (
      dadosAPI.find((e) => normalize(e.estado) === normalize(nome))?.valor ?? 0
    );
  };

  return (
    <Card className="w-full">
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

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        data-tooltip-id="tooltip"
                        data-tooltip-content={`${estado}: ${valor}`}
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
              {[0, 50, 100, 200].map((val, i, arr) => (
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
    </Card>
  );
}
