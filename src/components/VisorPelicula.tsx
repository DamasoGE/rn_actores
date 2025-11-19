import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pelicula } from '../models/Types'
import { MaterialIcons } from '@expo/vector-icons'

type Props = {
  pelicula: Pelicula,
  accionBorrarPelicula: (pelicula: Pelicula) => void
}

export default function VisorPelicula({pelicula, accionBorrarPelicula}: Props) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>{pelicula}</Text>
      <Pressable onPress={()=> accionBorrarPelicula(pelicula)}>
        <MaterialIcons name={"cancel"} size={16} color={"#E0E0FF"}/>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    backgroundColor: "#6366F1",
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: "100%"
  },
  texto:{
    color: "#FFF"
  }
})