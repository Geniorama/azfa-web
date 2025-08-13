"use client";

import HeadingPage from "@/components/HeadingPage";
import MapGoogle from "@/components/MapGoogle";
import { useState } from "react";
import SearchInput from "@/utils/SearchInput";
import IncentivosCardCountry from "@/components/IncentivosCardCountry";
import colombiaFlag from "@/assets/img/flags/colombia.svg";
import brasilFlag from "@/assets/img/flags/brazil.svg";

export interface Marker {
  lat: number;
  lng: number;
  title: string;
  imgFlag?: string;
  numberZones?: number;
  numberCompanies?: number;
  directJobs?: number;
  list?: {
    name: string;
    value: string;
  }[];
}

export default function NuestrosAfiliados() {
  const [selectedTab, setSelectedTab] = useState("incentivos");

  const markers: Marker[] = [
    // Colombia
    {
      lat: 4.570868,
      lng: -74.297332,
      title: "Colombia",
      imgFlag: colombiaFlag.src,
      numberZones: 10,
      numberCompanies: 10,
      directJobs: 10,
      list: [
        {
          name: "IVA ZF",
          value: "0%",  
        },
        {
          name: "IVA ZF",
          value: "0%",  
        },
      ],
    },

    // Argentina
    {
      lat: -34.603722,
      lng: -58.381559,
      title: "Argentina", 
      numberZones: 10,
      numberCompanies: 10,
      directJobs: 10,
      list: [
        {
          name: "IVA ZF",
          value: "0%",  
        },
        {
          name: "Procesamientos Parciales",
          value: "Posibilidad de realizar procesamientos parciales fuera de la ZF hasta por 9 meses",  
        },
      ],
    },

    // Brasil
    {
      lat: -15.793889,
      lng: -47.882777,
      title: "Brasil",
      imgFlag: brasilFlag.src,
      numberZones: 10,
      numberCompanies: 10,
      directJobs: 10,
      list: [
        {
          name: "IVA ZF",
          value: "0%",  
        },
      ],
    },
  ];

  return (
    <div>
      <HeadingPage
        title="Nuestros Afiliados"
        smallTitle="Conozca aquí nuestros Afiliados y haga parte de AZFA"
      />

      <section>
        <div className="flex flex-row">
          <div className="w-full md:w-1/2 lg:w-2/3 bg-primary">
            {/* Map Google for countries*/}
            <MapGoogle markers={markers} />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 bg-white">
            <div className="h-screen overflow-y-scroll">
              <div className="sticky top-0 z-10">
                <div className="flex flex-row">
                  <div className="w-1/2">
                    <button
                      className={`bg-[#F5F8FC] text-body1 font-medium cursor-pointer w-full p-5 text-text-primary ${
                        selectedTab === "incentivos"
                          ? "bg-primary text-white"
                          : ""
                      }`}
                      onClick={() => setSelectedTab("incentivos")}
                    >
                      Incentivos
                    </button>
                  </div>
                  <div className="w-1/2">
                    <button
                      className={`bg-[#F5F8FC] text-body1 font-medium cursor-pointer w-full p-5 text-text-primary ${
                        selectedTab === "afiliados"
                          ? "bg-details-hover text-white"
                          : ""
                      }`}
                      onClick={() => setSelectedTab("afiliados")}
                    >
                      Afiliados
                    </button>
                  </div>
                </div>
                <SearchInput options={[]} />
              </div>

              {selectedTab === "incentivos" &&
                markers.map((marker, index) => (
                  <IncentivosCardCountry
                    index={index}
                    country={marker.title}
                    numberZones={marker.numberZones || 0}
                    numberCompanies={marker.numberCompanies || 0}
                    directJobs={marker.directJobs || 0}
                    list={marker.list || []}
                    imgFlag={marker.imgFlag}
                    key={marker.title}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
