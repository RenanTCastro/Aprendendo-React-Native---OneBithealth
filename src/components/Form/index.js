import React, { useState } from "react";
import  { View, TextInput, Text, TouchableOpacity } from "react-native";
import ResultIMC from "../ResultIMC";
import styles from "./style";

export default function Form(){

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageIMC, setMessageIMC] = useState("Prencha o peso e altura");
    const [IMC, setIMC] = useState(null);
    const [textButton, setTextButton] = useState("Calcular");

    function calcularIMC(){
        return setIMC((weight/(height*height)).toFixed(2));
    }

    function validatorIMC(){
        if(height != null && weight != null){
            calcularIMC();
            setMessageIMC("Seu IMC é igual a: ");
            setHeight(null);
            setWeight(null);
            setTextButton("Calcular novamente");
            return;
        }
        setIMC(null);
        setTextButton("Calcular");
        setMessageIMC("Prencha o peso e altura");
    }
    return(
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <TextInput
                    style={styles.input}
                    onChangeText = {setHeight} 
                    value={height}
                    placeholder = "Ex: 1.75"
                    keyboardType = "numeric"
                />
                <Text style={styles.formLabel}>Peso</Text>
                <TextInput
                    style={styles.input}
                    onChangeText = {setWeight} 
                    value={weight} 
                    placeholder = "Ex: 75.385"
                    keyboardType = "numeric"
                />
                <TouchableOpacity 
                    style={styles.buttonCalculator}
                    onPress = {()=>{validatorIMC()}}
                    >
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultIMC messageResultIMC={messageIMC} resultIMC={IMC}/>
        </View>
    );
}