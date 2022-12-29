import React from 'react'
import { useTheme } from '@react-navigation/native';
import { TextInput as TextInputPaper } from 'react-native-paper';

export const TextInput = ({ label, onChangeText, placeholder, keyboardType, style, ...props }) => {
    const { colors } = useTheme()
    return (
        <TextInputPaper
            label={label}
            onChangeText={onChangeText}
            style={[{ width: '80%', backgroundColor: colors.background,  }, {...style}]}
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoCapitalize='none'
            placeholderTextColor={colors.subMainText}
            mode="outlined"
            activeOutlineColor={colors.primary}
            outlineColor={colors.border}
            theme={{
                colors: { onSurface: colors.mainText }
            }}
            {...props}
        />
    )
}