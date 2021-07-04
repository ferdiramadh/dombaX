import React, { useState,useRef  } from 'react'
import { StyleSheet, Text, View, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { AntDesign, Entypo } from "@expo/vector-icons"

const FloatingButton = (props) => {
    const animation = useRef(new Animated.Value(0)).current;
    const [open, setOpen] = useState(false)
    const toggleMenu = () => {
        const toValue = open ? 0:1;

        Animated.spring(animation, {
            toValue,
            friction: 5,
            useNativeDriver: true
        }).start();
        setOpen(!open)

    }
    const rotation = {
        transform:[
            {
                rotate: animation.interpolate({
                    inputRange: [0,1],
                    outputRange:["0deg","45deg"]
                })
            }
        ]
    }

    const pinStyle = {
        transform:[
            {scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0,1],
                    outputRange:[0, -80]
                })
            }
        ]
    }

    const thumbStyle = {
        transform:[
            {scale: animation},
            {
                translateX: animation.interpolate({
                    inputRange: [0,1],
                    outputRange:[0, -80]
                })
            }
        ]
    }
    return (
        <View style={[styles.container, props.style]}>
            <TouchableWithoutFeedback>
                <Animated.View style={[styles.button,styles.secondary,thumbStyle]}>
                    <TouchableOpacity style={[styles.button]} onPress={() => {
                        props.setModalVisible(!props.modalVisible)
                    }}>
                        <Text style={{textAlign:'center', fontWeight:'600',color:'white'}}>Var Cost</Text>
                    </TouchableOpacity>
                    
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <Animated.View style={[styles.button,styles.secondary,pinStyle]}>
                    <TouchableOpacity style={[styles.button]} onPress={() => {
                        props.setModalCostVisible(!props.modalCostVisible)
                    }}>
                        <Text style={{textAlign:'center', fontWeight:'600',color:'white'}}>Fix Cost</Text>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={toggleMenu}>
                <Animated.View style={[styles.button,styles.menu,rotation]}>
                    <AntDesign name="plus" size={30} color="#fff" />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default FloatingButton

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        position:'absolute',
        right:50
    },
    button:{
        position:'absolute',
        width: 60,
        height: 60,
        borderRadius: 60/2,
        alignItems:'center',
        justifyContent:'center',
        // elevation: 4,
        shadowRadius:10,
        shadowColor: '#f02a48',
        shadowOpacity: 0.3,
        shadowOffset:{height: 10}
    },
    menu:{
        backgroundColor:'#ED9B83'
    },
    secondary:{
        width: 60,
        height: 60,
        backgroundColor:'#ED9B83',
        
    }
})
