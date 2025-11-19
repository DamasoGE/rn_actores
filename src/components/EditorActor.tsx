import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { ActorCompleto, DatosFormulario, Pelicula } from "../models/Types";
import VisorPelicula from "./VisorPelicula";
import { Image } from "expo-image";
import dayjs from "dayjs";
import BouncyCheckbox from "react-native-bouncy-checkbox"
import DialogoNuevaPelicula from "./DialogoNuevaPelicula";

type Props = {
  actorSeleccionado?: ActorCompleto;
  accionCrearActor: (datos: DatosFormulario) => void;
  accionModificarActor: (idActor: string, datos: DatosFormulario) => void;
  accionBorrarActor: (idAactor: string) => void;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditorActor({
  actorSeleccionado,
  accionCrearActor,
  accionModificarActor,
  accionBorrarActor,
  setModalVisible,
}: Props) {
  const [nombre, setNombre] = useState(actorSeleccionado?.nombre ?? "");
  const [fechaNacimiento, setFechaNacimiento] = useState(
    actorSeleccionado?.fechaNacimiento ?? ""
  );
  const [activo, setActivo] = useState(actorSeleccionado?.activo ?? false);
  const [biografia, setBiografia] = useState(
    actorSeleccionado?.biografia ?? ""
  );
  const [urlFoto, setUrlFoto] = useState(actorSeleccionado?.urlFoto ?? "");
  const [peliculas, setPeliculas] = useState(
    actorSeleccionado?.peliculas ?? []
  );

  const [dialogoVisible, setDialogoVisible] = useState<boolean>(false)

  function getEtiquetaPelicula(pelicula: Pelicula) {
    return (
      <VisorPelicula
        pelicula={pelicula}
        key={pelicula}
        accionBorrarPelicula={accionBorrarPelicula}
      />
    );
  }

  function accionNuevaPelicula() {
    setDialogoVisible(true)
  }

  function nuevaPelicula(pelicula: Pelicula){
    const nuevaListaPeliculas = [...peliculas, pelicula]
    setPeliculas(nuevaListaPeliculas);
  }

  function accionBorrarPelicula(pelicula: Pelicula){
    const nuevaListaPeliculas = peliculas.filter(p => p!==pelicula)
    setPeliculas(nuevaListaPeliculas)
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>
        {actorSeleccionado?.nombre ?? "Nuevo actor"}
      </Text>
      <Image style={styles.foto} source={urlFoto} contentFit={"scale-down"} />
      <View style={styles.fila}>
        <Text style={styles.etiqueta}>Nombre</Text>
        <TextInput
          placeholder="Nombre del actor"
          value={nombre}
          onChangeText={setNombre}
          style={styles.cuadroTexto}
        />
      </View>

      <View style={styles.fila}>
        <Text style={styles.etiqueta}>Fecha de nacimiento del actor</Text>
        <TextInput
          placeholder="Fecha de nacimiento del actor"
          value={
            fechaNacimiento !== ""
              ? dayjs(fechaNacimiento).format("D/MM/YYYY")
              : ""
          }
          onChangeText={setFechaNacimiento}
          style={styles.cuadroTexto}
        />
      </View>

      <View style={styles.fila}>
        <Text style={styles.etiqueta}>Biografía</Text>
        <TextInput
          placeholder="Biografía del actor"
          multiline={true}
          numberOfLines={3}
          value={biografia}
          onChangeText={setBiografia}
          style={styles.cuadroTexto}
        />
      </View>

      <View style={styles.fila}>
        <Text style={styles.etiqueta}>Url de la foto</Text>
        <TextInput
          placeholder="Url de la foto del actor"
          multiline={true}
          numberOfLines={3}
          value={urlFoto}
          onChangeText={setUrlFoto}
          style={styles.cuadroTexto}
        />
      </View>

      <View style={styles.fila}>
        <BouncyCheckbox
        size={16}
        fillColor={"#6366F1"}
        unFillColor={"white"}
        isChecked={activo}
        text={"Activo"}
        textStyle={{ textDecorationLine: "none"}}
        />
      </View>
      <ScrollView>
        <View style={styles.listaPeliculas}>
            {
                peliculas.map((pelicula) => getEtiquetaPelicula(pelicula))
            }
            <Pressable style={styles.botonNuevaPelicula} onPress={accionNuevaPelicula}>
                <Text style={styles.textoNuevaPelicula}>Nueva Película</Text>
            </Pressable>
        </View>
      </ScrollView>

      <View style={styles.filaBotones}>
        {
            actorSeleccionado !== undefined && (
                <>
                    <Pressable
                    style={styles.boton}
                    onPress={()=> accionBorrarActor(actorSeleccionado.id)}
                    >
                        <Text style={styles.textoBoton}>Eliminar</Text>
                    </Pressable>
                    <Pressable
                    style={styles.boton}
                    onPress={()=> accionModificarActor(
                        actorSeleccionado.id, {nombre, biografia, urlFoto, fechaNacimiento, activo, peliculas}
                    )}>
                        <Text style={styles.textoBoton}>Modificar</Text>
                    </Pressable>
                </>
            )
        }

        {
        actorSeleccionado === undefined && (
         <Pressable style={styles.boton}
         onPress={()=>accionCrearActor({nombre, biografia, urlFoto, fechaNacimiento, activo, peliculas})}>
            <Text style={styles.textoBoton}>Crear</Text>
         </Pressable>
        )
        }
        <Pressable style={styles.boton} onPress={()=> setModalVisible(false)}>
            <Text style={styles.textoBoton}>Salir</Text>
        </Pressable>
      </View>

      <View style={styles.contenedor}>
        <DialogoNuevaPelicula
          dialogoVisible={dialogoVisible}
          setDialogoVisible={setDialogoVisible}
          nuevaPelicula={nuevaPelicula}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  foto: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#6366f1",
    backgroundColor: "#e0e0ff",
  },
  fila: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  etiqueta: {
    flex: 1,
  },
  listaPeliculas: {
    flex: 1,
    rowGap: 8,
  },
  botonNuevaPelicula: {
    borderRadius: 20,
    backgroundColor: "#14b8a6",
    paddingHorizontal: 12,
    width: "100%",
  },
  textoNuevaPelicula: {
    color: "#fff",
    textAlign: "center",
  },
  filaBotones: {
    flexDirection: "row",
    columnGap: 5,
  },
  titulo: {
    fontSize: 36,
    fontWeight: "700",
    color: "#6366f1",
  },
  contenedor: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#f0f1ff",
    alignItems: "center",
    rowGap: 20,
  },
  cuadroTexto: {
    backgroundColor: "#fff",
    flex: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  areaTexto: {
    backgroundColor: "#fff",
    flex: 3,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#d1d5db",
    height: 100,
    textAlignVertical: "top",
  },
  textoBoton: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: 600,
  },
  boton: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#374151",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});
