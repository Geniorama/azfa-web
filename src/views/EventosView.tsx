"use client"

import CardEventsMonth from '@/components/CardEventsMonth'
import BackgroundEventos from '@/assets/img/bg-eventos.jpg'
import { useState } from 'react'

const eventsData = [
  {
    month: 'Enero',
    events: [
      {
        title: 'Evento 1',
        date: '2025-01-01',
        link: 'https://www.google.com',
        isFirst: false,
        isLast: true,
        isNext: false
      },
      {
        title: 'Evento 2',
        date: '2025-01-02',
        link: 'https://www.google.com',
        isFirst: true,
        isLast: false,
        isNext: false
      }
    ]
  },
  {
    month: 'Febrero',
    events: [
      {
        title: 'Evento 3',
        date: '2025-02-01',
        link: 'https://www.google.com',
        isFirst: false,
        isLast: false,
        isNext: true
      }
    ]
  },
  {
    month: 'Marzo',
    events: [
      {
        title: 'Evento 4',
        date: '2025-03-01',
        link: 'https://www.google.com',
        isFirst: false,
        isLast: false,
        isNext: true
      }
    ]
  },
  {
    month: 'Abril',
    events: [
      {
        title: 'Conferencia de Zonas Francas',
        date: '2025-04-15',
        link: 'https://www.google.com',
        isFirst: false,
        isLast: false,
        isNext: true
      },
      {
        title: 'Taller de Inversiones',
        date: '2025-04-22',
        link: 'https://www.google.com',
        isFirst: false,
        isLast: true,
        isNext: false
      }
    ]
  },
  {
    month: 'Mayo',
    events: [
      {
        title: 'Cumbre Iberoamericana',
        date: '2025-05-10',
        link: 'https://www.google.com',
        isFirst: true,
        isLast: false,
        isNext: true
      }
    ]
  },
  {
    month: 'Junio',
    events: [
      {
        title: 'Seminario de Exportaciones',
        date: '2025-06-05',
        link: 'https://www.google.com',
        isFirst: false,
        isLast: false,
        isNext: true
      },
      {
        title: 'Networking Empresarial',
        date: '2025-06-18',
        link: 'https://www.google.com',
        isFirst: false,
        isLast: true,
        isNext: false
      }
    ]
  },
  {
    month: 'Julio',
    events: [
      {
        title: 'Expo Zonas Francas 2025',
        date: '2025-07-12',
        link: 'https://www.google.com',
        isFirst: true,
        isLast: false,
        isNext: true
      },
      {
        title: 'Foro de Innovación',
        date: '2025-07-25',
        link: 'https://www.google.com',
        isFirst: false,
        isLast: true,
        isNext: false
      }
    ]
  },
  {
    month: 'Agosto',
    events: [
      {
        title: 'Convención Anual AZFA',
        date: '2025-08-08',
        link: 'https://www.google.com',
        isFirst: true,
        isLast: false,
        isNext: true
      }
    ]
  },
  {
    month: 'Septiembre',
    events: [
      {
        title: 'Workshop de Sostenibilidad',
        date: '2025-09-14',
        link: 'https://www.google.com',
        isFirst: false,
        isLast: false,
        isNext: true
      },
      {
        title: 'Panel de Expertos',
        date: '2025-09-28',
        link: 'https://www.google.com',
        isFirst: false,
        isLast: true,
        isNext: false
      }
    ]
  },
  {
    month: 'Octubre',
    events: [
      {
        title: 'Congreso Internacional',
        date: '2025-10-03',
        link: 'https://www.google.com',
        isFirst: true,
        isLast: false,
        isNext: true
      },
      {
        title: 'Feria de Inversiones',
        date: '2025-10-17',
        link: 'https://www.google.com',
        isFirst: false,
        isLast: true,
        isNext: false
      }
    ]
  },
  {
    month: 'Noviembre',
    events: [
      {
        title: 'Simposio de Comercio',
        date: '2025-11-11',
        link: 'https://www.google.com',
        isFirst: false,
        isLast: false,
        isNext: true
      }
    ]
  },
  {
    month: 'Diciembre',
    events: [
      {
        title: 'Cierre de Año AZFA',
        date: '2025-12-05',
        link: 'https://www.google.com',
        isFirst: true,
        isLast: false,
        isNext: true
      },
      {
        title: 'Gala de Premiación',
        date: '2025-12-15',
        link: 'https://www.google.com',
        isFirst: false,
        isLast: true,
        isNext: false
      }
    ]
  }
]   

export default function EventosView() {
  const [events] = useState<typeof eventsData>(eventsData)
  const [activeTab, setActiveTab] = useState("todos")

  // Función para filtrar eventos según el tab activo
  const getFilteredEvents = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Resetear horas para comparar solo fechas

    // Primero obtener todos los eventos filtrados de todos los meses
    const allFilteredEvents: Array<{event: typeof eventsData[0]['events'][0], monthIndex: number, eventIndex: number}> = []
    
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

  return (
    <div>
        <section style={{
            backgroundImage: `url(${BackgroundEventos.src})`
        }} className='py-16 bg-primary bg-cover bg-center bg-no-repeat text-center'>
            <div className="container mx-auto px-4">
                <h1 className='text-h1'>Eventos</h1>
                <p className='text-body1 lg:text-lg'>Conozca aquí los próximos eventos del año</p>

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
