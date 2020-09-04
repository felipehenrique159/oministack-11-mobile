import React,{useEffect,useState} from 'react'
import {View,FlatList, Text,Image, TouchableOpacity} from 'react-native'
import {Feather} from '@expo/vector-icons/'
import {useNavigation} from '@react-navigation/native'
import styles from './styles'
import axios from '../../services/api'
import logoImg from '../../assets/logo.png'
import api from '../../services/api'

export default function Incidents(){

    const navigation = useNavigation();
    const [incidents,setIncidents] = useState([])
    const [total,setTotal] = useState(0)

    function navigationToDetail(){
        navigation.navigate('Detail');
    }

    async function loadIncidents() {
        const res = await api.get('/incidents')
        setIncidents(res.data)
        setTotal(res.headers['x-total-count'])     
    }
    
    useEffect(() => {
        loadIncidents()
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
            Total de <Text style={styles.headerTextBold}>{total} casos</Text> 
        </Text>
         </View>
         <Text style={styles.title}>Bem-vindo!</Text>
         <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

        <FlatList 
            data={incidents}
            style={styles.incidentList}
            keyExtractor={incident => String(incident)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item:incident }) => (
                <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR',{style : 'currency', currency: 'BRL'}).format(incident.value)}</Text>

                <TouchableOpacity style={styles.detailsButton} onPress={navigationToDetail}>
                    <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                    <Feather name="arrow-right" size={16} color="#E02041"/>
                </TouchableOpacity>

             </View>
            )}
        />

        </View>
    )
}