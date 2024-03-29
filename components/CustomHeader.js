import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, PixelRatio } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { PhotoContext } from '../context/PhotoProfileContext';
import { MaterialIcons } from '@expo/vector-icons';
import {useSelector} from 'react-redux'
import { windowHeigth } from '../utils/DimensionSetup'

var FONT_NORMAL = 48

if(PixelRatio.get() <= 2) {
    FONT_NORMAL = 18
}

const CustomHeader = (props) => {
    const image = useSelector(state => state.profileReducer.image)
    
    const [ leftOn, setLeftOn ] = useState(true);
    const navigation = useNavigation();
    // const { image,setImage } = useContext(PhotoContext)

    
    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <View style={[styles.leftSide]}>
                    <View style={[styles.leftSideSubMenus,props.home?{display:'none'}:null]}>
                        <TouchableOpacity style={{ marginLeft:20,}} onPress={() => {
                            setLeftOn(!leftOn)
                            props.setState(true)
                        }} disabled={true}><Text style={[styles.subMenuTitle,props.styleFont]} >{props.leftSubMenu || props.descProfile}</Text></TouchableOpacity>
                    </View>
                    <View style={[{width:'10%', flexDirection:'column', justifyContent:'center',alignItems:'center'},props.home?{display:'none'}:null]}>
                        <Text style={styles.pipeSeparator}>{props.leftSubMenu == 'Transaksi' || props.leftSubMenu == 'Laporan' || props.leftSubMenu == 'Stok' || props.descProfile || props.leftSubMenu == 'Profil'? '' :'|'}</Text>
                    </View>

                    <View style={[styles.leftSideSubMenus]}>
                        <TouchableOpacity onPress={() => {
                            setLeftOn(!leftOn)
                            props.setState(false)
                        }}><Text style={[styles.subMenuTitle,leftOn?null:{borderBottomColor: '#000'},props.styleFont]}>{props.rightSubMenu}</Text></TouchableOpacity>
                    </View>
                </View>
               
                <View style={styles.righhtSide}>
                    {/* <TouchableOpacity onPress={() => {
                        signOut()
                        navigation.replace("Login")
                    }}>
                        <FontAwesome name="sign-out" size={24} color="black" />
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                    {image ? <Image source={{ uri: image }} style={styles.photoProfileIcon} />:<MaterialIcons name="account-circle" size={80} color="black" />}
                    </TouchableOpacity> */}
                   
                </View>
            </View>
        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:windowHeigth*.085,
        backgroundColor:'#fff',
        position:'absolute',
        top: 28,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1
    },
    headerContent:{
        width:'100%',
        height:'100%',
    },
    leftSide:{
        flexDirection:'row',
        width:'70%',
        height:'100%',
    },

    leftSideSubMenus:{
        
        flexDirection:'column', 
        justifyContent:'center',
        alignContent:'flex-start',
        // backgroundColor:'blue'

    },
    pipeSeparator:{
        fontSize:40,
        fontWeight:'bold',
    },
    subMenuTitle:{
        fontSize:48,
        fontFamily:'Baloo',
        borderBottomColor: 'transparent', // Add this to specify bottom border color
        borderBottomWidth: 3 // Add this to specify bottom border thickness
        
    },
    righhtSide:{
       
        width:'30%',
        // flex: 1,
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row',

    },
    photoProfileIcon:{
        width:70,
        height:70,
        borderRadius:35
    }
})