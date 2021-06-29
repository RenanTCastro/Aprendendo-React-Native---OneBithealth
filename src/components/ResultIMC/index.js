import React from "react";
import  { View, Text, TouchableOpacity, Share } from "react-native";
import styles from "./style";
export default function ResultIMC(props){
    
    const onShare = async () => {
        const reuslt = await Share.share({
            message: "Meu IMC hoje é: " + props.resultIMC,
        })
    }
    return(
        <View style={styles.resultImc}>
            <View style = { styles.boxShareButton}>
            <Text style={styles.information}>{props.messageResultIMC}</Text>
            <Text style={styles.numberIMC}>{props.resultIMC}</Text>
                <TouchableOpacity 
                    onPress={onShare}
                    style ={styles.shared}>
                    <Text style={styles.sharedText}>
                        Share
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}