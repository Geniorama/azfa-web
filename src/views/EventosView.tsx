"use client"

import CardEventsMonth from '@/components/CardEventsMonth'
import BackgroundEventos from '@/assets/img/bg-eventos.jpg'
import { useState } from 'react'
import { EventType, EventsPageType } from '@/types/componentsType'

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
        }} className='py-16 bg-primary bg-cover bg-center bg-no-repeat text-center'>
            <div className="container mx-auto px-4">
                <h1 className='text-h1'>{eventsPageData?.headingSection?.title || "Eventos"}</h1>
                <p className='text-body1 lg:text-lg'>{eventsPageData?.headingSection?.description || "Conozca aquí los próximos eventos del año"}</p>

                {/* Tabs */}
                <div className='flex flex-col md:flex-row w-full max-w-screen-lg gap-0.5 md:gap-0 justify-center mx-auto mt-10'>
                    <button className={`text-body1 text-text-primary p-2 px-6 md:w-1/3 lg:rounded-tl-lg lg:rounded-bl-lg cursor-pointer transition-colors border-r border-gray-300 font-medium ${activeTab === "todos" ? "bg-details-hover text-gray-800" : "bg-white hover:bg-gray-50"}`} onClick={() => setActiveTab("todos")}>Todos</button>
                    <button className={`text-body1 text-text-primary p-2 px-6 md:w-1/3 cursor-pointer transition-colors border-r border-gray-300 font-medium ${activeTab === "proximos" ? "bg-details-hover text-gray-800" : "bg-white hover:bg-gray-50"}`} onClick={() => setActiveTab("proximos")}>Próximos</button>
                    <button className={`text-body1 text-text-primary p-2 px-6 md:w-1/3 lg:rounded-tr-lg lg:rounded-br-lg cursor-pointer transition-colors border-l border-gray-300 font-medium ${activeTab === "pasados" ? "bg-details-hover text-gray-800" : "bg-white hover:bg-gray-50"}`} onClick={() => setActiveTab("pasados")}>Pasados</button>
                </div>
            </div>
        </section>

        <section className='bg-white lg:py-16 py-10'>
            <div className="container mx-auto px-4">
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
            </div>
        </section>
    </div>
  )
}
