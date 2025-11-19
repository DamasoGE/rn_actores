export type Actor = {
    id: string,
    urlFoto: string
}

export type Actores = Array<Actor>

export type ActorCompleto = Actor & {
    nombre: string,
    biografia: string
    fechaNacimiento: string,
    activo: boolean,
    peliculas: Array<string>
}

export type DatosFormulario = Omit<ActorCompleto, "id">

export type Pelicula = string
export type Peliculas = Array<string>



