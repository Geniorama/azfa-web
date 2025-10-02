"use client"

import CardEventsMonth from '@/components/CardEventsMonth'
import CardEvent from '@/components/CardEvent'
import BackgroundEventos from '@/assets/img/bg-eventos.jpg'
import { useState, useRef } from 'react'
import { EventType, EventsPageType } from '@/types/componentsType'
import CardNextEvent from '@/components/CardNextEvent'

interface EventosViewProps {
  eventsData: EventType[];
  eventsPageData: EventsPageType | null;
  isLoading?: boolean;
  error?: string | null;
}

// Tipo para el formato esperado por la vista
interface FormattedEvent {
  title: string;
  date: string;
  link: string;
  isFirst: boolean;
  isLast: boolean;
  isNext: boolean;
}

interface MonthEvents {
  month: string;
  events: FormattedEvent[];
}

// Función para transformar eventos de la API al formato esperado por la vista
const transformEventsData = (apiEvents: EventType[]): MonthEvents[] => {
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Crear estructura inicial con todos los meses
  const monthsData: MonthEvents[] = monthNames.map(month => ({
    month,
    events: []
  }));

  // Agrupar eventos por mes
  apiEvents.forEach(event => {
    const eventDate = new Date(event.startDate);
    const monthIndex = eventDate.getMonth();
    
    const formattedEvent: FormattedEvent = {
      title: event.title,
      date: event.startDate,
      link: event.buttonUrl || '#',
      isFirst: false, // Se calculará después
      isLast: false,  // Se calculará después
      isNext: false   // Se calculará después
    };

    monthsData[monthIndex].events.push(formattedEvent);
  });

  // Ordenar eventos dentro de cada mes por fecha
  monthsData.forEach(monthData => {
    monthData.events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  });

  return monthsData;
};

export default function EventosView({ eventsData, eventsPageData, isLoading = false, error = null }: EventosViewProps) {
  const transformedEvents = transformEventsData(eventsData);
  const [events] = useState<MonthEvents[]>(transformedEvents)
  const [activeTab, setActiveTab] = useState("todos")
  const gridSectionRef = useRef<HTMLElement>(null)

  // Función para encontrar el evento destacado más próximo en fecha futura
  const getNextEvent = (): EventType | null => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Primero filtrar eventos destacados (featured: true)
    const featuredEvents = eventsData.filter(event => event.featured === true);

    // Si no hay eventos destacados, no mostrar ninguno
    if (featuredEvents.length === 0) {
      return null;
    }

    // Filtrar eventos destacados futuros y ordenarlos por fecha (más reciente primero)
    const futureFeaturedEvents = featuredEvents
      .filter(event => {
        const eventDate = new Date(event.startDate);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      })
      .sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateA.getTime() - dateB.getTime();
      });

    return futureFeaturedEvents.length > 0 ? futureFeaturedEvents[0] : null;
  };

  const nextEvent = getNextEvent();

  // Función para formatear fechas como "Mayo 5 al 9"
  const formatDateRange = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    const startMonth = monthNames[start.getMonth()];
    const startDay = start.getDate();
    const endDay = end.getDate();
    
    // Si es el mismo día
    if (startDate === endDate) {
      return `${startMonth} ${startDay}`;
    }
    
    // Si es el mismo mes
    if (start.getMonth() === end.getMonth()) {
      return `${startMonth} ${startDay} al ${endDay}`;
    }
    
    // Si son meses diferentes
    const endMonth = monthNames[end.getMonth()];
    return `${startMonth} ${startDay} al ${endMonth} ${endDay}`;
  };

  // Función para filtrar eventos según el tab activo
  const getFilteredEvents = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Resetear horas para comparar solo fechas

    // Primero obtener todos los eventos filtrados de todos los meses
    const allFilteredEvents: Array<{event: FormattedEvent, monthIndex: number, eventIndex: number}> = []
    
    events.forEach((monthData, monthIndex) => {
      const filteredEvents = monthData.events.filter(event => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)

        switch (activeTab) {
          case "proximos":
            return eventDate >= today
          case "pasados":
            return eventDate < today
          case "todos":
          default:
            return true
        }
      })

      filteredEvents.forEach((event, eventIndex) => {
        allFilteredEvents.push({ event, monthIndex, eventIndex })
      })
    })

    // Ordenar todos los eventos por fecha
    allFilteredEvents.sort((a, b) => {
      const dateA = new Date(a.event.date)
      const dateB = new Date(b.event.date)
      return dateA.getTime() - dateB.getTime()
    })

    // Encontrar el evento más próximo globalmente
    const closestEventIndex = allFilteredEvents.findIndex(item => {
      const eventDate = new Date(item.event.date)
      eventDate.setHours(0, 0, 0, 0)
      return eventDate >= today
    })

    // Ahora procesar cada mes con las propiedades calculadas globalmente
    return events.map((monthData, monthIndex) => {
      const filteredEvents = monthData.events.filter(event => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)

        switch (activeTab) {
          case "proximos":
            return eventDate >= today
          case "pasados":
            return eventDate < today
          case "todos":
          default:
            return true
        }
      })

      // Ordenar eventos del mes por fecha
      const sortedEvents = filteredEvents.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateA.getTime() - dateB.getTime()
      })

      // Calcular propiedades dinámicamente
      const eventsWithProperties = sortedEvents.map((event, eventIndex) => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)
        
        // Verificar si este evento es el más próximo globalmente
        const isGlobalFirst = closestEventIndex !== -1 && 
          allFilteredEvents[closestEventIndex].monthIndex === monthIndex &&
          allFilteredEvents[closestEventIndex].eventIndex === eventIndex
        
        return {
          ...event,
          isFirst: isGlobalFirst,
          isLast: eventIndex === sortedEvents.length - 1,
          isNext: eventDate >= today
        }
      })

      return {
        ...monthData,
        events: eventsWithProperties
      }
    })
  }

  const filteredEvents = getFilteredEvents()

  // Función para obtener eventos filtrados para mostrar en grid (próximos/pasados)
  const getFilteredEventsForGrid = (): EventType[] => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let filtered: EventType[] = []

    switch (activeTab) {
      case "proximos":
        filtered = eventsData
          .filter(event => {
            const eventDate = new Date(event.startDate)
            eventDate.setHours(0, 0, 0, 0)
            return eventDate >= today
          })
          .sort((a, b) => {
            const dateA = new Date(a.startDate)
            const dateB = new Date(b.startDate)
            return dateA.getTime() - dateB.getTime()
          })
        break;
      case "pasados":
        filtered = eventsData
          .filter(event => {
            const eventDate = new Date(event.startDate)
            eventDate.setHours(0, 0, 0, 0)
            return eventDate < today
          })
          .sort((a, b) => {
            const dateA = new Date(a.startDate)
            const dateB = new Date(b.startDate)
            return dateB.getTime() - dateA.getTime() // Más recientes primero
          })
        break;
      default:
        filtered = []
    }

    return filtered
  }

  const eventsForGrid = getFilteredEventsForGrid()

  // Función para cambiar tab y hacer scroll al grid
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    // Hacer scroll después del cambio de tab
    if (gridSectionRef.current) {
      setTimeout(() => {
        gridSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }, 100) // Pequeño delay para asegurar que el contenido se haya renderizado
    }
  }

  // Manejo de estados de carga y error
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-text-primary">Cargando eventos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">Error: {error}</p>
          <p className="text-text-primary">Por favor, intente recargar la página.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
        <section style={{
            backgroundImage: `url(${eventsPageData?.headingSection?.backgroundImg?.url || BackgroundEventos.src})`
        }} className={`pt-16 bg-primary bg-cover bg-center bg-no-repeat text-center ${nextEvent ? 'pb-16 lg:pb-40' : 'lg:pb-40 pb-16'}`}>
            <div className="container mx-auto px-4">
                <h1 className='text-h1'>{eventsPageData?.headingSection?.title || "Eventos"}</h1>
                <p className='text-body1 lg:text-lg'>{eventsPageData?.headingSection?.description || "Conozca aquí los próximos eventos del año"}</p>

                {/* Tabs - Solo mostrar aquí cuando NO hay evento destacado */}
                {!nextEvent && (
                    <div className='flex flex-col md:flex-row w-full max-w-screen-lg gap-0.5 md:gap-0 justify-center mx-auto mt-10'>
                        <button className={`text-body1 text-text-primary p-2 px-6 md:w-1/3 lg:rounded-tl-lg lg:rounded-bl-lg cursor-pointer transition-colors border-r border-gray-300 font-medium ${activeTab === "todos" ? "bg-details-hover text-gray-800" : "bg-white hover:bg-gray-50"}`} onClick={() => handleTabChange("todos")}>Calendario Anual</button>
                        <button className={`text-body1 text-text-primary p-2 px-6 md:w-1/3 cursor-pointer transition-colors border-r border-gray-300 font-medium ${activeTab === "proximos" ? "bg-details-hover text-gray-800" : "bg-white hover:bg-gray-50"}`} onClick={() => handleTabChange("proximos")}>Próximos</button>
                        <button className={`text-body1 text-text-primary p-2 px-6 md:w-1/3 lg:rounded-tr-lg lg:rounded-br-lg cursor-pointer transition-colors border-l border-gray-300 font-medium ${activeTab === "pasados" ? "bg-details-hover text-gray-800" : "bg-white hover:bg-gray-50"}`} onClick={() => handleTabChange("pasados")}>Pasados</button>
                    </div>
                )}
            </div>
        </section>

        {nextEvent && (
          <>
            <section className='bg-white lg:py-16 py-10'>
              <div className="container mx-auto px-4 lg:-mt-40 z-10">
                <CardNextEvent 
                  tag={nextEvent.tag}
                  title={nextEvent.title}
                  date={formatDateRange(nextEvent.startDate, nextEvent.endDate)}
                  location={nextEvent.location}
                  address={nextEvent.address}
                  image={nextEvent.featuredImage?.url || "https://testazfabucket.s3.us-east-2.amazonaws.com/img_evento_1a_World_FZO_af2dc47ee4.webp"}
                  calendarIcon={nextEvent.calendarIcon}
                  locationIcon={nextEvent.locationIcon}
                  addressIcon={nextEvent.addressIcon}
                  button={{ 
                    label: nextEvent.buttonText || "Ver más", 
                    onClick: () => {
                      if (nextEvent.buttonUrl) {
                        window.open(nextEvent.buttonUrl, "_blank");
                      } else {
                        // Redirigir a la página de eventos si no hay URL específica
                        window.location.href = "/eventos";
                      }
                    }
                  }}
                />
              </div>
            </section>

            {/* Tabs - Mostrar aquí cuando SÍ hay evento destacado */}
            <section className='bg-white py-8'>
              <div className="container mx-auto px-4">
                <div className='flex flex-col md:flex-row w-full max-w-screen-lg gap-0.5 md:gap-0 justify-center mx-auto border border-gray-300 rounded-lg overflow-hidden'>
                  <button className={`text-body1 text-text-primary p-2 px-6 md:w-1/3 lg:rounded-tl-lg lg:rounded-bl-lg cursor-pointer transition-colors border-r border-gray-300 font-medium ${activeTab === "todos" ? "bg-details-hover text-gray-800" : "bg-white hover:bg-gray-50"}`} onClick={() => handleTabChange("todos")}>Calendario Anual</button>
                  <button className={`text-body1 text-text-primary p-2 px-6 md:w-1/3 cursor-pointer transition-colors border-r border-gray-300 font-medium ${activeTab === "proximos" ? "bg-details-hover text-gray-800" : "bg-white hover:bg-gray-50"}`} onClick={() => handleTabChange("proximos")}>Próximos</button>
                  <button className={`text-body1 text-text-primary p-2 px-6 md:w-1/3 lg:rounded-tr-lg lg:rounded-br-lg cursor-pointer transition-colors border-l border-gray-300 font-medium ${activeTab === "pasados" ? "bg-details-hover text-gray-800" : "bg-white hover:bg-gray-50"}`} onClick={() => handleTabChange("pasados")}>Pasados</button>
                </div>
              </div>
            </section>
          </>
        )}

        <section ref={gridSectionRef} className='bg-white lg:py-16 py-0'>
            <div className="container mx-auto px-4">
                {activeTab === "todos" ? (
                    // Mostrar calendario anual cuando tab "todos" está activo
                    <div className='flex flex-col md:flex-row flex-wrap'>
                        <div className='w-full md:w-1/2 lg:w-1/4 p-3'>
                            <CardEventsMonth month="Enero" events={filteredEvents[0].events} />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/4 p-3'>
                            <CardEventsMonth month="Febrero" events={filteredEvents[1].events} />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/4 p-3'>
                            <CardEventsMonth month="Marzo" events={filteredEvents[2].events} />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/4 p-3'>
                            <CardEventsMonth month="Abril" events={filteredEvents[3].events} />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/4 p-3'>
                            <CardEventsMonth month="Mayo" events={filteredEvents[4].events} />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/4 p-3'>
                            <CardEventsMonth month="Junio" events={filteredEvents[5].events} />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/4 p-3'>
                            <CardEventsMonth month="Julio" events={filteredEvents[6].events} />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/4 p-3'>
                            <CardEventsMonth month="Agosto" events={filteredEvents[7].events} />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/4 p-3'>
                            <CardEventsMonth month="Septiembre" events={filteredEvents[8].events} />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/4 p-3'>
                            <CardEventsMonth month="Octubre" events={filteredEvents[9].events} />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/4 p-3'>
                            <CardEventsMonth month="Noviembre" events={filteredEvents[10].events} />
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/4 p-3'>
                            <CardEventsMonth month="Diciembre" events={filteredEvents[11].events} />
                        </div>
                    </div>
                ) : (
                    // Mostrar grid con CardEvent vertical para pestañas "próximos" y "pasados"
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventsForGrid.length > 0 ? (
                            eventsForGrid.map((event) => (
                                <CardEvent
                                    key={event.id}
                                    image={event.featuredImage?.url || "https://testazfabucket.s3.us-east-2.amazonaws.com/img_evento_1a_World_FZO_af2dc47ee4.webp"}
                                    title={event.title}
                                    category={event.tag || "Evento"}
                                    date={formatDateRange(event.startDate, event.endDate)}
                                    location={event.location}
                                    hotel={event.address}
                                    calendarIcon={event.calendarIcon}
                                    locationIcon={event.locationIcon}
                                    addressIcon={event.addressIcon}
                                    direction="vertical"
                                    button={{
                                        label: event.buttonText || "Ver más",
                                        onClick: () => {
                                            if (event.buttonUrl) {
                                                window.open(event.buttonUrl, "_blank");
                                            } else {
                                                window.location.href = "/eventos";
                                            }
                                        },
                                    }}
                                />
                            ))
                        ) : (
                            // Mensaje cuando no hay eventos en esa categoría
                            <div className="col-span-full text-center py-12">
                                <p className="text-lg text-text-primary">
                                    {activeTab === "proximos" 
                                        ? "No hay eventos próximos por el momento" 
                                        : "No hay eventos pasados disponibles"
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    </div>
  )
}
