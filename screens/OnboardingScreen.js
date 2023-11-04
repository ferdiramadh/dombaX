import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'

const OnboardingScreen = ({ navigation }) => {

    const CustomOnDone = () => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('Home')

            }} style={styles.doneBtn}>
                <Text style={styles.doneBtnTxt}>Masuk</Text>
            </TouchableOpacity>
        )
    }

    return (
        <Onboarding
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/images/onboard_1d.png')} style={{ width: 420, height: 420 }} />,
                    title: 'Kelola Stok',
                    subtitle: 'Ketahui stok produk dan atur setiap unit peternakan domba Kamu sebanyak apapun dari satu tempat.',
                    titleStyles: { marginTop: -50 }
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/images/aturtransaksinewest.png')} style={{ width: 280, height: 280 }} resizeMode='contain' />,
                    title: 'Atur Transaksi',
                    subtitle: 'Keuangan lebih rapi dan profesional tidak ada yang tercecer lagi.',
                    titleStyles: { fontSize: 38, marginTop: -50 }
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/images/LaporanInteraktif.png')} />,
                    title: 'Laporan Interaktif',
                    subtitle: 'Lihat laporan arus kas, untung/rugi, dan informasi finansial lainnya dalam satu dashboard interaktif. ',
                    titleStyles: { fontSize: 38, marginTop: -50 }
                }
            ]}
            containerStyles={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
            subTitleStyles={styles.subTitle}
            bottomBarColor='#fff'
            imageContainerStyles={{ position: 'absolute', paddingHorizontal: 10, }}
            titleStyles={styles.titleOnboarding}
            DoneButtonComponent={CustomOnDone}
            onSkip={() => navigation.navigate('Home')}
        />
    )

}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleOnboarding: {
        fontFamily: 'Baloo',
        fontSize: 50,
    },
    doneBtn: {
        width: 100,
        height: 40,
        backgroundColor: '#ED9B83',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 5
    },
    doneBtnTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        fontFamily: 'Baloo'
    },
    subTitle: { 
        fontSize: 20, 
        marginTop: 300, 
        fontFamily: 'Quicksand', 
        color: '#000' 
    }
})
