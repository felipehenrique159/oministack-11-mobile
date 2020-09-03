import React from 'react'
import {View,Text,Image,Linking} from 'react-native'
import styles from './styles'
import logoImg from '../../assets/logo.png'
import { TouchableOpacity} from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'
import {Feather} from '@expo/vector-icons/'
import * as MailComposer from 'expo-mail-composer'


export default function Detail(){

    const navigation = useNavigation();
    const message = 'Olá Apad, estou entrando em contato pois gostaria de ajudar no caso "Cadelinha atropelada" com o valor de R$ 120,00'

    function navigationBack() {
        navigation.goBack();
    }

    function sentMail() {
        MailComposer.composeAsync({
            subject: 'Herói do caso: Cadelinha atropelada',
            recipients:['felipecod6@hotmail.com'],
            body:message
        })
    }

    function setWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=5531983264088&text=${message}`)
    }

    return(
        <View style={styles.container}>
        <View style={styles.header}>
         <Image source={logoImg}/>
         <TouchableOpacity onPress={navigationBack}>
        <Feather name="arrow-left" size={28} color="#E82041"/>
         </TouchableOpacity>
         </View> 

        <View style={styles.incident}>
        <Text style={[styles.incidentProperty,{marginTop:0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>APAD</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>cachorro fatal</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>R$ 120,00</Text>
        </View>

        <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso!</Text>
        
        <Text style={styles.heroDescription}>Entre em contato:</Text>
        
        <View style={styles.actions}>
        
        <TouchableOpacity style={styles.action} onPress={setWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.action} onPress={sentMail}>
            <Text style={styles.actionText}>E-mail</Text>
        </TouchableOpacity>
        
        </View>

        </View>

        </View>
    )
}