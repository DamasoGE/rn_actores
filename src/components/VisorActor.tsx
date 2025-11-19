import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Actor } from "../models/Types";
import { Image } from "expo-image";

type Props = {
  actor: Actor;
  seleccionarActor: (actor: Actor) => void;
};

export default function VisorActor({ actor, seleccionarActor }: Props) {
  const [errorCarga, setErrorCarga] = useState(false);
  const imagenError = require("../../assets/error.jpg");
  const imagenCarga = require("../../assets/loading.jpg");

  useEffect(() => setErrorCarga(false), [actor]);

  return (
    <Pressable onPress={() => seleccionarActor(actor)}>
      <Image
        source={errorCarga ? imagenError : actor.urlFoto}
        placeholder={imagenCarga}
        style={{ width: 150, height: 200 }}
        transition={800}
        onError={() => setErrorCarga(true)}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({});
