import React, { useEffect, useState, useContext } from 'react'; 
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MyContext from './MyContext';

export default function GiaoDien3({ route, navigation }) {
    const { name } = useContext(MyContext);
    const { task } = route.params || {}; 
    const [inputTitle, setInputTitle] = useState(task ? task.title : ''); 

    const handleFinish = () => {
        const updatedTask = {
            ...task,
            title: inputTitle,
        };

        fetch(`https://66f606b5436827ced975b8c7.mockapi.io/bai7/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Task updated:', data);
            // Quay lại GiaoDien2 và truyền task đã cập nhật
            navigation.navigate('GiaoDien2', { updatedTask: data });
        })
        .catch(error => console.error('Error updating task:', error));
    };

    return (
        <View style={styles.container}> 
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <TouchableOpacity style={styles.nutback} onPress={() => navigation.navigate("GiaoDien2")}>
                        <Icon name="arrow-back" size={30} color="black" />
                    </TouchableOpacity>
                    <Image source={require("../img/goyong.jpg")} style={styles.profileImage} />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerText}>{name}</Text>
                        <Text style={styles.subText}>Have a great day ahead</Text>
                    </View>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.addjob_txt}>EDIT YOUR JOB</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="description" size={24} color="gray" style={styles.icon} />
                    <TextInput
                        style={styles.inputJob}
                        placeholder="Input your job"
                        value={inputTitle}
                        onChangeText={setInputTitle}
                    />
                </View>

                <View style={styles.finish}>
                    <TouchableOpacity style={styles.addButton} onPress={handleFinish}>
                        <Text style={styles.addButtonText}>FINISH</Text>
                        <Icon name="arrow-forward" size={30} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.hinh_notebook}>
                    <Image source={require("../img/notebook.png")} style={styles.image}/>
                </View>
            </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    hinh_notebook: {
        alignItems: 'center',
        paddingTop: 30,
    },
    image: {
        width: 200,
        height: 200,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10,
    },
    nutback: {
        marginRight: 10,
    },
    headerTextContainer: {
        flexDirection: 'column',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    subText: {
        fontSize: 14,
        color: '#666',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    addjob_txt: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    inputJob: {
        flex: 1,
        height: 50,
        paddingHorizontal: 10,
    },
    finish: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    addButton: {
        backgroundColor: '#9ddceb',
        width: 250,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    addButtonText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});

