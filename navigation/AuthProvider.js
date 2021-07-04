import React, { createContext, useState } from 'react'
import firebase from '../Firebaseconfig'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null)

    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try{
                        const respons = await firebase.auth().signInWithEmailAndPassword(email,password);
                        console.log(respons.user)
                        navigation.navigate('Home')
                    }catch(e){
                        console.log(e)
                        setError(e.toString())
                    }
                },
                register: async (email, password) => {
                    try{
                        const respons = await firebase.auth().createUserWithEmailAndPassword(email,password);
                        console.log(respons)
                        navigation.navigate('Home')
                    }catch(err){
                        console.log(err)
                        setError(err.message)
                    }
                },
                logout: async() => {
                    try{
                        await firebase.auth().signOut()
                    } catch(e){
                        console.log(e)
                    }
                }
            }}
        >
        {children}
        </AuthContext.Provider>
    )
}