import Link from "next/link";
import ArrowRightGreen from "@/assets/img/btn-arrow-green.svg";

interface CardEventsMonthProps {
  month: string;
  events?: {
    title: string;
    date: string;
    link?: string;
    isLast?: boolean;
    isFirst?: boolean;
    isNext?: boolean;
  }[];
}

export default function CardEventsMonth({
  month,
  events,
}: CardEventsMonthProps) {
  return (
    <div className="border border-background-2 rounded-sm overflow-hidden text-text-primary p-3">
      <h3 className="2xl:text-h3 text-[20px] leading-[28px] 2xl:leading-8">{month}</h3>
      <hr className="my-3 border-background-2" />
      {events && events.length > 0 ? (
        events.map((event, index) => (
          <Link target="_blank" rel="noopener noreferrer" href={event.link || ""} key={index}>
            <div
              className="flex flex-row gap-3 mb-3 bg-background-1 rounded-lg"
              key={index}
            >
              <div>
                {/* Day of the event */}
                <span
                  className={`rounded-lg p-2 2xl:text-h4 text-[16px] leading-[25px] 2xl:leading-8 w-12 h-12 2xl:w-16 2xl:h-16 flex font-semibold items-center justify-center ${
                    event.isFirst
                      ? "bg-details-hover text-white"
                      : event.isNext
                      ? "bg-black text-white"
                      : event.isLast
                      ? "bg-background-3 text-white"
                      : "bg-background-3 text-white"
                  }`}
                >
                  {event.date.split("-")[2]}
                </span>
              </div>
              <div className="p-2 py-3">
                <h4 className="2xl:text-h4 text-[16px] leading-[25px] 2xl:leading-8">{event.title}</h4>
                <img
                  src={ArrowRightGreen.src}
                  alt="arrow-right-green"
                  className="w-8 h-8"
                />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="bg-background-1 rounded-sm p-3">
          <p className="text-body2">No hay eventos</p>
        </div>
      )}
    </div>
  );
}
