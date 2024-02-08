import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { peticionGet } from "../../utilitis/getRequest";
import useUserStore from "../../components/context/UserContext";
import { colors } from "../../styles/CompStyle";
import { BarChart, Grid, XAxis, YAxis } from "react-native-svg-charts";

const ResultQuizz = () => {
  const [data, setData] = useState("");
  const user = useUserStore((state) => state.user);
  let userData = user.data.id;

  const fill = "rgb(134, 65, 244)";

  const contentInset = { top: 40, bottom: 40 };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await peticionGet(
          "resultado-cuestionario/usuario/" + userData
        );
        console.log("resultado", result);
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

  const siLabel = `Respuestas "Si" (${counts.siCount})`;
  const noLabel = `Respuestas "No" (${counts.noCount})`;

  return (
  
      <View style={{ justifyContent: "center", width: "100%",padding:20,}}>
        <Text> Resultado </Text>
        {Object.entries(data).map(([key, value], index) => (
          <View key={index}>
            <View>
              <Text>puntuacion: {value.puntuacion}</Text>
              <ScrollView
                key={index}
                style={{
                  backgroundColor: colors.CC,
                  marginVertical: 10,
                  width: 310,
                  height: 250,
                  padding: 10,
                  borderRadius: 7,
                }}
              >
                {Object.entries(value.respuestas).map(
                  ([pregunta, respuesta], index) => (
                    <View style={{ padding: 10 }} key={index}>
                      <Text style={{ color: colors.primary }}>
                        Pregunta {pregunta}: {respuesta}
                      </Text>
                    </View>
                  )
                )}
              </ScrollView>
            </View>
          </View>
        ))}
        <View style={dataStyle.contenido}>
          <Text>
            {siLabel} vs. {noLabel}
          </Text>
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
      </View>

  );
};

export default ResultQuizz;

const dataStyle = StyleSheet.create({
  contenido: {
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
