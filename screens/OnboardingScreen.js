import React from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'

const OnboardingScreen = ({ navigation }) => {

    const CustomImageContainer = (props) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
                <Text style={styles.titleOnboarding}>{props.title}</Text>
                <Image source={props.img} style={props.styleImg} />
            </View>
        )
    }

    const CustomOnDone = () => {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('Home')

            }} style={{ width: 100, height: 40, backgroundColor: '#ED9B83', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginHorizontal: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFF', fontFamily: 'Baloo' }}>Masuk</Text>
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
            subTitleStyles={{ fontSize: 20, marginTop: 300, fontWeight: 'bold' }}
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
        fontFamily: 'Baloo-ExtraBold',
        fontSize: 50,
    }
})
