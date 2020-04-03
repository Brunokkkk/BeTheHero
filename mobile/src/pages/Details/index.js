import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Linking, View, Image, TouchableOpacity, Text } from 'react-native';
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png';

import styles from './style';

export default function Incidents(){

  const navigation = useNavigation();
  const routes = useRoute();

  const incident = routes.params.incident;

  const mensagem= `Olá, estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de ${
    Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.value)}`;

  function navigationBack(){
    navigation.goBack();
  }

  function sendMail(){
    MailComposer.composeAsync({
      subject: `Herói caso: ${incident.title}`,
      recipients: [`${incident.email}`],
      body: mensagem,
    });
  }

  function sendWhats(){
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${mensagem}`);
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigationBack}>
          <Feather name='arrow-left' size={28} color="#E82041"/>
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
          <Text style={[styles.incidentProperty, {marginTop: 0}]}>Ong: </Text>
          <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf} </Text>

          <Text style={styles.incidentProperty}>Caso: </Text>
          <Text style={styles.incidentValue}>{incident.title} </Text>

          <Text style={styles.incidentProperty}>Valor: </Text>
          <Text style={styles.incidentValue}>
           {Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.value)}
          </Text>
 
      </View>
      <View style={styles.contactBox}>
        <Text styles={styles.heroTitle}> Salve o dia</Text>
        <Text styles={styles.heroTitle}> Seja o herói desse caso</Text>
        
        <Text styles={styles.heroDescription}> Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhats}>
            <Text style={styles.actionText}>WhatsApp </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail </Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
}
