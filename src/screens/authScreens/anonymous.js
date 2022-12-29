import { View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import { AuthContext } from './authProvider';
import { useTheme } from '@react-navigation/native';
import Title from '../../components/Title';
import CustomButton from '../../components/customButton';
import { CodeSnippet } from '../../components/codeSnippet';

const Anonymous = () => {

    const anonymous = () => {
        auth()
            .signInAnonymously()
            .then(() => {
                console.log('User signed in anonymously');
            })
            .catch(error => {
                if (error.code === 'auth/operation-not-allowed') {
                    console.log('Enable anonymous in your firebase console.');
                }
                console.error(error);
            });
    }

    const { checkUser } = useContext(AuthContext)

    useEffect(() => {
        checkUser("UserScreen")
    }, [])

    let data = ` auth()
    .signInAnonymously()
    .then(() => {
        console.log('User signed in anonymously');
    })
    .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.');
        }
        console.error(error);
    });`

    return (
        <View style={{ flex: 1, justifyContent: 'center', }}>

            <Title text={'Anonymous'} />

            <CodeSnippet data={data} copyCommand={data} />

            <CustomButton
                title="Sign in/ Sign up"
                bgStyle={{ marginTop: 30, }}
                onPress={() => anonymous()}
            />
        </View>
    )
}

export default Anonymous