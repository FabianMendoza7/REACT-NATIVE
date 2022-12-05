import React, { useState, useEffect } from 'react'
import { Modal, Text, SafeAreaView, StyleSheet, TextInput, View, ScrollView, Pressable, Alert } from 'react-native'
import DatePicker from 'react-native-date-picker'

const Formulario = ({
    modalVisible, 
    setModalVisible, 
    pacientes, 
    setPacientes,
    paciente: pacienteObj
}) => {
    const [id, setId] = useState('')
    const [paciente, setPaciente] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [fecha, setFecha] = useState(new Date())
    const [sintomas, setSintomas] = useState('')

    useEffect(() => {
        // Este useEffect se va a ejecutar una sola vez (cuando el componente esté lsito).
        if(Object.keys(pacienteObj).length > 0){
            setId(pacienteObj.id)
            setPaciente(pacienteObj.paciente)
            setPropietario(pacienteObj.propietario)
            setEmail(pacienteObj.email)
            setTelefono(pacienteObj.telefono)
            setFecha(pacienteObj.fecha)
            setSintomas(pacienteObj.sintomas)
        }
    }, [])

    const handleCita = () => {
        // Validar
        if([paciente, propietario, email, fecha, sintomas].includes('')){
            Alert.alert(
                'Error',
                'Todos los campos sin obligatorios'
            )
            return;
        }

        const nuevoPaciente = {
            id: Date.now(),
            paciente, 
            propietario,
            email,
            telefono,
            fecha,
            sintomas
        }

        setPacientes([...pacientes, nuevoPaciente])
        setModalVisible(!modalVisible)

        setPaciente('')
        setPropietario('')
        setEmail('')
        setTelefono('')
        setFecha(new Date())
        setSintomas('')
    }

    return (
    <Modal
        animationType='slide'
        visible={modalVisible}
    >
        <SafeAreaView
            style={styles.contenido}
        >
            <ScrollView>
                <Text
                    style={styles.titulo}
                >
                    Nueva {''}
                    <Text
                        style={styles.tituloBold}
                    >
                        Cita
                    </Text>
                </Text>

                <Pressable 
                    style={styles.btnCancelar}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
                </Pressable>

                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre Paciente</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Nombre Paciente'
                        placeholderTextColor={'#666'}
                        value={paciente}
                        onChangeText={setPaciente}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre Propietario</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Nombre Propietario'
                        placeholderTextColor={'#666'}
                        value={propietario}
                        onChangeText={setPropietario}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Email Propietario</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Email Propietario'
                        placeholderTextColor={'#666'}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Teléfono Propietario</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Teléfono Propietario'
                        placeholderTextColor={'#666'}
                        keyboardType='number-pad'
                        value={telefono}
                        onChangeText={setTelefono}
                        maxLength={10}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Fecha</Text>
                    <View style={styles.fechaContenedor}>
                        <DatePicker
                            date={fecha}
                            locale='es'
                            onDateChange={(date) => setFecha(date)}
                        />
                    </View>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Síntomas</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Síntomas paciente'
                        placeholderTextColor={'#666'}
                        value={sintomas}
                        onChangeText={setSintomas}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                <Pressable
                    style={styles.btnNuevaCita} 
                    onPress={handleCita}
                >
                    <Text style={styles.btnNuevaCitaTexto}>Agregar Paciente</Text>
                </Pressable>                
            </ScrollView>                          
        </SafeAreaView>
    </Modal>        
    )
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#6D28D9',
        flex: 1
    },
    titulo: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#FFF'
    },
    tituloBold: {
        fontWeight: '900'
    },
    btnCancelar: {
        marginVertical: 30,
        backgroundColor: '#5827A4',
        marginHorizontal: 30,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFF'
    },
    btnCancelarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 20
    },    
    campo: {
        marginTop: 10,
        marginHorizontal: 30
    },
    label: {
        color: '#FFF',
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10
    },
    fechaContenedor: {
        backgroundColor: '#FFF',
        borderRadius: 10
    },
    btnNuevaCita: {
        marginVertical: 50,
        backgroundColor: '#F59E0B',
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10
    },
    btnNuevaCitaTexto: {
        textAlign: 'center',
        color: '#5827A4',
        textTransform: 'uppercase',
        fontWeight: '900',
        fontSize: 16
    }
})

export default Formulario