import React, { useState } from "react";
import  { View,
         TextInput,
         Text,
         TouchableOpacity,
         Vibration,
         Pressable,
         Keyboard } from "react-native";
import ResultIMC from "../ResultIMC";
import styles from "./style";

export default function Form(){

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageIMC, setMessageIMC] = useState("Prencha o peso e altura");
    const [IMC, setIMC] = useState(null);
    const [textButton, setTextButton] = useState("Calcular");
    const [errorMessage, setErrorMessage] = useState(null);

    function verificationIMC(){
        if(IMC==null){
            setErrorMessage("Campo obrigatório *");
            Vibration.vibrate();
        }
    }
    

    function calcularIMC(){
        let heightFormat = height.replace(",",".");
        return setIMC((weight/(heightFormat*heightFormat)).toFixed(2));
    }

    function validatorIMC(){
        if(height != null && weight != null){
            calcularIMC();
            setMessageIMC("Seu IMC é igual a: ");
            setHeight(null);
            setWeight(null);
            setTextButton("Calcular novamente");
            setErrorMessage(null);
            return;
        }
        verificationIMC();
        setIMC(null);
        setTextButton("Calcular");
        setMessageIMC("Prencha o peso e altura");
    }
    return(
        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText = {setHeight} 
                    value={height}
                    placeholder = "Ex: 1.75"
                    keyboardType = "numeric"
                />
                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
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
        </Pressable>
    );
}