"use client";

import { FiShare2 } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CardInfoPortal from "@/components/CardInfoPortal";

export default function SingleBlogView() {
  return (
    <div>
      <section className='py-12 2xl:py-16' style={{ background: 'linear-gradient(to bottom, var(--color-primary) 50%, white 50%)' }}>
        <div className="flex gap-0">
          <div className="w-1/2 p-12 pr-0">
            {/* Image placeholder */}
            <img
              className="w-full h-full object-cover aspect-[10/7] rounded-tr-4xl overflow-hidden translate-x-16"
              src={"https://testazfabucket.s3.us-east-2.amazonaws.com/vecteezy_digital_logistics_futuristic_semi_truck_on_circuit_board_59901512_1_b9e86f1019.png"} alt={"blog title"} />
          </div>
          <div className="w-1/2 bg-background-2">
            <div className="p-8 h-full flex flex-col gap-8 justify-center text-text-primary pl-28">
              <h1 className="text-h3">blig title</h1>
              {/* Tags */}
              <div className="flex gap-2">
                <span className="text-caption bg-white rounded-full px-4 py-1">Tag 1</span>
                <span className="text-caption bg-white rounded-full px-4 py-1">Tag 2</span>
                <span className="text-caption bg-white rounded-full px-4 py-1">Tag 3</span>
                {/* Tag Date */}
                <span className="text-caption bg-transparent border border-text-primary text-text-primary rounded-full px-4 py-1">Tag 4</span>
              </div>
              <hr className="border-details w-32" />
              {/* Icon share */}
              <div className="flex gap-2">
                <FiShare2 className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic content */}
      <article className="py-16 2xl:py-24 bg-white">
        <div className="container mx-auto px-4">

        </div>
      </article>

      {/* Related blogs */}
      <section className="py-16 bg-background-1">
        <div className="container mx-auto px-4">

          {/* Swiper */}
          <div className="relative">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-h3 text-text-primary">Contenido relacionado</h2>
              <div className="flex justify-end gap-4 z-10">
                <div className="[&>button]:border-text-primary [&>button]:text-text-primary">
                  <button className="custom-swiper-button-prev bg-transparent border text-lg border-text-primary text-text-primary hover:bg-white hover:text-text-primary w-16 h-16 rounded-full flex items-center justify-center transition cursor-pointer">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                <div className="[&>button]:border-text-primary [&>button]:text-text-primary">
                  <button className="custom-swiper-button-next bg-transparent border text-lg border-text-primary text-text-primary hover:bg-white hover:text-text-primary w-16 h-16 rounded-full flex items-center justify-center transition cursor-pointer">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <Swiper
              modules={[Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                nextEl: '.custom-swiper-button-next',
                prevEl: '.custom-swiper-button-prev',
              }}
              className="swiper-custom !p-0 !pb-10"
              loop={true}
              speed={1000}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {Array.from({ length: 10 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <CardInfoPortal
                    image={"https://testazfabucket.s3.us-east-2.amazonaws.com/vecteezy_digital_logistics_futuristic_semi_truck_on_circuit_board_59901512_1_b9e86f1019.png"}
                    title={"Related blog"}
                    description={"Related blog description"}
                    tags={["Tag 1", "Tag 2", "Tag 3"]}
                    date={"2021-01-01"}
                    noSpaceImage={true}
                    button={{
                      label: "Leer artículo",
                      onClick: () => { },
                    }}
                    isReadMore={true}
                    arrowColor="text-details"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  )
}
