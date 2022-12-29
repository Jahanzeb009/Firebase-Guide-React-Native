import { View, Vibration, StyleSheet, Dimensions, Alert } from 'react-native'
import React, { useMemo, useState } from 'react'
// import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import CustomButton from './customButton';
import { useTheme } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { IconButton } from 'react-native-paper';
import toast from './toast';

import SyntaxHighlighter from 'react-native-syntax-highlighter';
import atelierSavannaDark from 'react-syntax-highlighter/dist/esm/styles/hljs/atelier-savanna-dark';
import googlecode from 'react-syntax-highlighter/dist/esm/styles/hljs/googlecode';

export const CodeSnippet = ({ data, copyCommand, mh, mv }) => {

    const { colors, dark } = useTheme()

    const { height, width } = Dimensions.get('window')
    let b = width.toFixed(0) * 0.04

    const style = StyleSheet.create({
        mainView: {
            flex: 1,
            borderWidth: 2,
            borderRadius: 16,
            marginVertical: mv ? mv : 10,
            marginHorizontal: mh ? mh : 10,
            borderColor: colors.border + 99,
            backgroundColor: dark ? '#141414' : '#fafafa'
        },
        customButton: {
            flex: 1,
            top: -13,
            right: 0,
            zIndex: 1,
            margin: 0,
            elevation: 0,
            borderRadius: 16,
            paddingVertical: 0,
            position: 'absolute',
            paddingHorizontal: 0,
            backgroundColor: 'transparent',
        }
    })



    return (
        <View style={style.mainView}>
            {copyCommand && <CustomButton
                title={<IconButton icon={'content-copy'} iconColor={colors.mainText + 90} size={20} />}
                bgStyle={style.customButton}
                onPress={() => {
                    Clipboard.setString(copyCommand), toast('Copied')
                    Vibration.vibrate(30)
                }} />}

            <SyntaxHighlighter
                lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
                language='javascript'
                style={dark ? atelierSavannaDark : googlecode}
                customStyle={{ paddingTop: 20, padding: 5, borderRadius: 14.5 }}
                fontSize={b}
                highlighter={'hljs'}

            >{data}</SyntaxHighlighter>
        </View>
    )
}