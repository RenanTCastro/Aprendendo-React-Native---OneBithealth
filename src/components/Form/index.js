import React, { useState } from "react";
import  { View, TextInput, Text, Button} from "react-native";
import ResultIMC from "../ResultIMC";

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
        <View>
            <View>
                <Text>Altura</Text>
                <TextInput
                    onChangeText = {setHeight} 
                    value={height}
                    placeholder = "Ex: 1.75"
                    keyboardType = "numeric"
                />
                <Text>Peso</Text>
                <TextInput
                    onChangeText = {setWeight} 
                    value={weight} 
                    placeholder = "Ex: 75.385"
                    keyboardType = "numeric"
                />
                <Button
                    onPress = {() => validatorIMC()} 
                    title={textButton}/>
            </View>
            <ResultIMC messageResultIMC={messageIMC} resultIMC={IMC}/>
        </View>
    );
}