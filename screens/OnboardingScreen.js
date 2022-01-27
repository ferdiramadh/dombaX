import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, Image,View , TouchableOpacity} from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Baloo2_400Regular,
    Baloo2_500Medium,
    Baloo2_600SemiBold,
    Baloo2_700Bold,
    Baloo2_800ExtraBold,
  } from '@expo-google-fonts/baloo-2';



const OnboardingScreen = ({navigation}) => {
    

    let [fontsLoaded] = useFonts({
        Baloo2_400Regular,
        Baloo2_500Medium,
        Baloo2_600SemiBold,
        Baloo2_700Bold,
        Baloo2_800ExtraBold,
      });



    const CustomImageContainer = (props) => {
        return(
            <View style={{justifyContent:'center', alignItems:'center',  backgroundColor:'red', }}>
                <Text style={styles.titleOnboarding}>{props.title}</Text>
                <Image source={props.img} style={props.styleImg}/>
            </View>
        )
    }

    const CustomOnDone = () => {
        return(
            <TouchableOpacity onPress={() => {
                navigation.navigate('Home')
                
            }} style={{width: 100, height: 40, backgroundColor:'#ED9B83', justifyContent:'center', alignItems:'center', borderRadius:10, marginHorizontal:5, borderWidth:2}}>
                <Text style={{fontSize:18, fontWeight:'bold'}}>Masuk</Text>
            </TouchableOpacity>
        )
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
    return (
        <Onboarding
            pages={[
                {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/images/onboard_1d.png')} style={{width:420,height:420}} />,
                // image: <CustomImageContainer title='Smart Stok' img={require('../assets/images/onboard_1d.png')} styleImg={{width:400, height: 400}}/>,
                title: 'Smart Stok',
                subtitle: 'Ketahui stok produk dan atur setiap unit peternakan domba Kamu sebanyak apapun dari satu tempat.',
                titleStyles:{marginTop:-50}
                },
                {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/images/Wallet.png')} style={{width:420,height:420}} resizeMode='contain'/>,
                // image: <CustomImageContainer title='Smart Finance' img={require('../assets/images/Wallet2.png')} styleImg={{width:300, height:300}}/>,
                title: 'Smart Finance',
                subtitle: 'Keuangan lebih rapi dan profesional tidak ada yang tercecer lagi.',
                titleStyles:{marginTop:-50}
                },
                {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/images/Printer123.png')} />,
                title: 'Invoice Generator',
                subtitle: 'Buat, download, kirim atau cetak invoice sesuka Kamu, cegah penipuan di internal.',
                titleStyles:{fontSize:40, marginTop:-50}
                },
                {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/images/LapKeuangan.png')} />,
                title: 'Laporan Interaktif',
                subtitle: 'Lihat laporan arus kas, untung/rugi, dan informasi finansial lainnya dalam satu dashboard interaktif. ',
                titleStyles:{fontSize:38, marginTop:-50}
                },
                {
                backgroundColor: '#fff',
                image: <Image source={require('../assets/images/Vault123.png')} />,
                title: 'Aman dan Nyaman',
                subtitle: 'Atur dan kembangkan bisnis Kamu lebih aman dalam satu aplikasi manajemen finansial khusus untuk peternak domba skala kecil dan menengah.',
                titleStyles:{fontSize:38, marginTop:0}
                },
                
            ]}
            containerStyles={{backgroundColor:'#fff',paddingHorizontal:20}}
            subTitleStyles={{fontSize:20, marginTop:300, fontWeight:'bold'}}
            bottomBarColor='#fff'
            imageContainerStyles={{position:'absolute', paddingHorizontal:10, }}
            titleStyles={styles.titleOnboarding}
            DoneButtonComponent={CustomOnDone} 
            onSkip={() => navigation.navigate('Home')}
            />
    );}
        
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },
    titleOnboarding:{
        fontFamily: 'Baloo2_800ExtraBold',
        fontSize: 50,

       
    }
})
