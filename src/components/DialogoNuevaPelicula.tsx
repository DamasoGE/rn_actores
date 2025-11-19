import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Pelicula } from '../models/Types'
import Dialog from "react-native-dialog";

type Props = {
    dialogoVisible: boolean, 
    setDialogoVisible: React.Dispatch<React.SetStateAction<boolean>>,
    nuevaPelicula: (pelicula: Pelicula) => void
}

export default function DialogoNuevaPelicula({dialogoVisible, setDialogoVisible, nuevaPelicula}: Props) {
  const [titulo, setTitulo] = useState("");

  function cerrarDialogo(){
    setDialogoVisible(false)
  }
  
    return (
    <Dialog.Container
    visible={dialogoVisible}
    onBackdropPress={cerrarDialogo}
    onRequestClose={cerrarDialogo}
    >
      <Dialog.Title>Nueva película</Dialog.Title>
      <Dialog.Description>La película se añadirá al actor</Dialog.Description>
      <Dialog.Input label={"Títuo de la película"} value={titulo} onChangeText={setTitulo}></Dialog.Input>
      <Dialog.Button label={"cancelar"} onPress={cerrarDialogo}></Dialog.Button>
      <Dialog.Button label={"aceptar"} onPress={()=> nuevaPelicula(titulo)}></Dialog.Button>
    </Dialog.Container>
  )
}

const styles = StyleSheet.create({})