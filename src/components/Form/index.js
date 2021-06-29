import React, { useState } from "react";
import  { View,
         TextInput,
         Text,
         TouchableOpacity,
         Vibration,
         Pressable,
         Keyboard,
         FlatList } from "react-native";
import ResultIMC from "../ResultIMC";
import styles from "./style";

export default function Form(){

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageIMC, setMessageIMC] = useState("Prencha o peso e altura");
    const [IMC, setIMC] = useState(null);
    const [textButton, setTextButton] = useState("Calcular");
    const [errorMessage, setErrorMessage] = useState(null);
    const [IMCList, setIMCList] = useState([]);
    
    function verificationIMC(){
        if(IMC==null){
            setErrorMessage("Campo obrigatório *");
            Vibration.vibrate();
        }
    }
    

    function calcularIMC(){
        let heightFormat = height.replace(",",".");
        let totalIMC = ((weight/(heightFormat*heightFormat)).toFixed(2));
        setIMCList ((arr) => [...arr, {id: new Date().getTime, imc: totalIMC}]);
        setIMC(totalIMC);
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
        <View style={styles.formContext}>
            {IMC == null ?
            <Pressable onPress={Keyboard.dismiss} style={styles.form}>
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
            </Pressable>
            :
            <View style ={styles.exhibitionResultIMC}>
                <ResultIMC messageResultIMC={messageIMC} resultIMC={IMC}/>
                <TouchableOpacity 
                    style={styles.buttonCalculator}
                    onPress = {()=>{validatorIMC()}}
                    >
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            }
            <FlatList 
                showsVerticalScrollIndicator={false}
                style={styles.listIMCs}
                data ={IMCList.reverse()}
                renderItem={({item})=>{
                    return(
                        <Text style={styles.resultIMCItem}>
                            <Text style={styles.textResultItemList}>
                                Resultado IMC =  
                            </Text>
                            {item.imc}
                        </Text>
                    )
                }}
                keyExtractor={(item) => {
                    item.id;
                  }}/>
        </View>
    );
}