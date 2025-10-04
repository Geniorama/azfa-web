import HeadingPage from "@/components/HeadingPage"

export default function AgregarInmuebleView() {
  return (
    <div>
        <HeadingPage
          title="Agregar inmueble"
          smallTitle="Agrega un nuevo inmueble a tu lista de inmuebles"
        />

        <section className="bg-white py-12 lg:py-16">
            <div className="container mx-auto px-4">
                <div className="w-full max-w-screen-md mx-auto text-text-primary">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="w-full md:w-1/2">
                            <h5 className="text-h5 font-medium">Formulario de inmueble</h5>
                        </div>
                        <div className="w-full md:w-1/2 text-right">
                            <p className="text-body1">3/5 inmuebles usados</p>
                        </div>
                    </div>

                    <form className="text-text-primary mt-5 space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-body1 font-medium block">Nombre del inmueble</label>
                            <input type="text" id="title" placeholder="Escriba el nombre del inmueble" className="w-full p-2 rounded-md border border-background-2 focus:outline-details" />
                        </div>

                        {/* Two columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="country" className="text-body1 font-medium block">País</label>
                                <select name="country" id="country" className="w-full p-2 rounded-md border border-background-2 focus:outline-details">
                                    <option value="AR">Argentina</option>
                                    <option value="BR">Brasil</option>
                                    <option value="CL">Chile</option>
                                    <option value="CO">Colombia</option>
                                    <option value="PE">Perú</option>
                                    <option value="UY">Uruguay</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="city" className="text-body1 font-medium block">Ciudad</label>
                                <input type="text" id="city" placeholder="Ingrese el nombre de la ciudad" className="w-full p-2 rounded-md border border-background-2 focus:outline-details" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="images" className="text-body1 font-medium block">Imágenes del inmueble</label>
                                <div>
                                    <div className="w-30 aspect-square bg-background-1 rounded-md">
                                    </div>
                                </div>
                                
                                {/* <input type="file" id="images" className="w-full p-2 rounded-md border border-background-2 focus:outline-details" /> */}
                            </div>
                        </div>
                    </form>
                </div>

                
            </div>
        </section>
    </div>
  )
}
