export const formatearFecha = fecha => {
    // Para arreglar el problema de la fecha
    const nuevaFecha = new Date(fecha.split("T")[0].split("-"))

    const opciones = {
        weekday: "long",
        month: "long",
        day: "2-digit",
        year: "numeric",
    }


    return nuevaFecha.toLocaleDateString('es-Es', opciones)
}

export const formatearFechaHistorial = fecha => {
    const nuevaFecha = new Date(fecha)

    const opciones = {
        weekday: "long",
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }


    return nuevaFecha.toLocaleDateString('es-Es', opciones)
}