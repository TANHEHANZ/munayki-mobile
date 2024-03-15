import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { peticionGet } from "../../utilitis/getRequest";
import useUserStore from "../../components/context/UserContext";
import { colors } from "../../styles/CompStyle";
import { BarChart, Grid, YAxis } from "react-native-svg-charts";;

const ResultQuizz = () => {
  const [data, setData] = useState("");
  const user = useUserStore((state) => state.user);
  const tokenLoguet = user.tokenLogauth;

  let userData = user.login[0].id;
  const fill = "rgb(134, 65, 244)";
  const contentInset = { top: 40, bottom: 40 };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await peticionGet(
          "resultado-cuestionario/usuario/" + userData, tokenLoguet
        );
        setData(result);
        let siCount = 0;
        let noCount = 0;
        result.forEach((item) => {
          Object.values(item.respuestas).forEach((respuesta) => {
            if (respuesta === "si") {
              siCount++;
            } else if (respuesta === "no") {
              noCount++;
            }
          });
        });
        setCounts({ siCount, noCount });
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

  const [counts, setCounts] = useState({ siCount: 0, noCount: 0 });
  const siLabel = `"Si" (${counts.siCount})`;
  const noLabel = `"No" (${counts.noCount})`;

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      {data.length > 0 ? (
        <>
          <Text style={{ fontSize: 18, color: colors.CC, fontWeight: 500 }}>
            Resultado{" "}
          </Text>
          <ScrollView horizontal>
            {Object.entries(data).map(([key, value], index) => (
              <View key={index} style={{ marginHorizontal: 20 }}>
                <Text>Puntuación: {value.puntuacion}</Text>
                <ScrollView
                  key={index}
                  style={{
                    backgroundColor: colors.CC,
                    marginVertical: 10,
                    width: 250,
                    height: 250,
                    padding: 10,
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                  }}
                >
                  {Object.entries(value.respuestas).map(
                    ([pregunta, respuesta], index) => (
                      <View style={{ padding: 15 }} key={index}>
                        <Text style={{ color: colors.primary, fontSize: 16 }}>
                          Pregunta {pregunta}: {respuesta}
                        </Text>
                      </View>
                    )
                  )}
                </ScrollView>
              </View>
            ))}
          </ScrollView>

          <ScrollView horizontal>
            <View style={dataStyle.contenido}>
              <Text
                style={{ fontSize: 16, textAlign: "left", marginBottom: 10 }}
              >
                Respuestas
              </Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Text>{siLabel}</Text>
                <Text
                  style={{ fontSize: 16, color: colors.CC, fontWeight: 700 }}
                >
                  vs
                </Text>
                <Text>{noLabel}</Text>
              </View>
              <View style={{ height: 200, flexDirection: "row" }}>
                <YAxis
                  data={[0, counts.siCount, counts.noCount]}
                  contentInset={contentInset}
                  svg={{ fontSize: 10, fill: "grey" }}
                  numberOfTicks={10}
                  formatLabel={(value) => value}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <BarChart
                    style={{ flex: 1 }}
                    data={[counts.siCount, counts.noCount]}
                    svg={{ fill }}
                    contentInset={contentInset}
                  >
                    <Grid />
                  </BarChart>
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <View
          style={{
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              textAlign: "center",
              marginBottom: 10,
              width: "100%",
            }}
          >
            No a realizado el quiz
          </Text>
          <TouchableOpacity
            style={{
              marginVertical: "2%",
              padding: "3%",
              borderRadius: 50,
              borderWidth: 2,
              borderColor: colors.CC,
              justifyContent: "center",
              alignItems: "center",
              width: "80%",
              flexDirection: "row",
              gap: 10,
              elevation: 5,
              backgroundColor: colors.primary,
            }}
            onPress={() =>
              Linking.openURL("https://munayki.cochabamba.bo/#/Quizz")
            }
          >
            <Text
              style={{
                textAlign: "center",
                width: "100%",
                color: colors.black,
                fontSize: 18,
              }}
            >
              Realizar el quiz
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ResultQuizz;

const dataStyle = StyleSheet.create({
  contenido: {
    width: 300,
    backgroundColor: "#fff",
    padding: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 15,
  },
});
