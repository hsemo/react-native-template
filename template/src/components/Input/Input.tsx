import React, { forwardRef, useState } from 'react';
import { TextInput, View } from 'react-native';

import useThemeColors from '@src/customHooks/useThemeColors';
import useStyles from '@src/customHooks/useStyles';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { BottomSheetTextInputProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput';

import { UIText } from '../UIText';
import stylesFunc from './styles';

/**
 * Input component for rendering a customizable text input field.
 *
 * Props:
 * - label (string, **optional**): The label to display above the input field.
 * - value (string, **required**): The current value of the input field.
 * - onChangeText (function, **required**): Callback function to handle text changes.
 * - placeholder (string, **optional**): Placeholder text to display when the input is empty.
 * - keyboardType (string, **optional**): The type of keyboard to display. Defaults to 'default'.
 * - secureTextEntry (boolean, **optional**): If true, hides the text input for password entry. Defaults to false.
 * - style (object, **optional**): Additional styles to apply to the container.
 * - inputStyle (object, **optional**): Additional styles to apply to the text input.
 * - labelStyle (object, **optional**): Additional styles to apply to the label.
 * - error (string, **optional**): Error message to display below the input field.
 * - errorStyle (object, **optional**): Additional styles to apply to the error message.
 * - leftIcon (ReactNode, **optional**): An optional icon to display on the left side of the input.
 * - isRequired (boolean, **optional**): If true, indicates that the input is required. Defaults to false.
 * - props (object, **optional**): Additional props to pass directly to the TextInput component.
 *
 */
const Input = forwardRef<TextInput | BottomSheetTextInputProps, InputProps>(
  (
    {
      label,
      value,
      onChangeText,
      placeholder,
      keyboardType = 'default',
      secureTextEntry = false,
      style = {},
      inputStyle = {},
      labelStyle = {},
      error = '',
      errorStyle = {},
      leftIcon = null,
      isRequired = false,
      useBottomSheetInput,
      ...props
    }: InputProps,
    inputRef,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const COLORS = useThemeColors();
    const styles = useStyles(stylesFunc);

    const onInputFocus = () => {
      setIsFocused(true);
    };

    const onInputBlur = () => {
      setIsFocused(false);
    };

    const InputComponent = useBottomSheetInput
      ? BottomSheetTextInput
      : TextInput;

    return (
      <View style={[styles.container, style]}>
        {label && (
          <View style={styles.labelCont}>
            <UIText style={[styles.label, labelStyle]}>{label}</UIText>
            {isRequired ? <UIText style={styles.required}>{'*'}</UIText> : null}
          </View>
        )}
        <View style={styles.inputCont}>
          <InputComponent
            value={value}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={COLORS.MEDIUM_GRAY}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            allowFontScaling={false}
            style={[
              styles.input,
              isFocused ? styles.inputFocused : {},
              inputStyle,
            ]}
            ref={inputRef as any}
            {...props}
          />
          {leftIcon ? (
            <View style={styles.leftIconCont}>{leftIcon}</View>
          ) : null}
        </View>
        {error && <UIText style={[styles.error, errorStyle]}>{error}</UIText>}
      </View>
    );
  },
);

export default Input;
