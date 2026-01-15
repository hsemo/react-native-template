import { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useStyles from '@src/customHooks/useStyles';
import useThemeColors from '@src/customHooks/useThemeColors';

import { UIText } from '..';
import UIBottomSheetModal from '../UIBottomSheetModal';
import RightTick from '../svgComponents/RightTick';
import ArrowHeadRight from '../svgComponents/ArrowHeadRight';
import stylesFunc from './styles';

function DropDownModal({
  options,
  selectedOption,
  pressableStyle,
  onChange,
}: DropDownPickerProps) {
  const [dropDownVisible, setDropDownVisible] = useState(false);

  const ref = useRef<BottomSheetModal>(null);
  const viewRef = useRef<View>(null);

  const styles = useStyles(stylesFunc);
  const colors = useThemeColors();
  const { bottom } = useSafeAreaInsets();

  const handleDropDownClick = () => {
    setDropDownVisible(true);
    ref.current?.present();
  };

  const handleOptionClick = (option: DropDownOptionObj) => {
    onChange?.(option);
    ref.current?.close();
  };

  const handleBottmSheetDismiss = () => {
    setDropDownVisible(false);
  };

  return (
    <>
      <Pressable
        style={[styles.arrowIconContainer, pressableStyle]}
        onPress={handleDropDownClick}
      >
        <UIText>{selectedOption.name}</UIText>
        <ArrowHeadRight
          style={{
            transform: [{ rotate: dropDownVisible ? '270deg' : '90deg' }],
          }}
          size={14}
          color={colors.ON_PRIMARY}
        />
      </Pressable>
      <UIBottomSheetModal
        enableDynamicSizing
        ref={ref}
        onDismiss={handleBottmSheetDismiss}
      >
        <View
          style={[styles.optionsSubContainer, { paddingBottom: bottom }]}
          ref={viewRef}
        >
          {options?.map((option, i) => (
            <DropDownOption
              {...option}
              selected={selectedOption.value === option.value}
              onClick={handleOptionClick}
              key={i + option.value}
            />
          ))}
        </View>
      </UIBottomSheetModal>
    </>
  );
}

function DropDownOption({
  name,
  value,
  selected,
  onClick,
}: DropDownOptionProps) {
  const styles = useStyles(stylesFunc);
  const colors = useThemeColors();

  const selectedStyles = selected
    ? { color: colors.ON_TERTIARY }
    : { color: colors.ON_SECONDARY };

  const handleOptionClick = () => {
    onClick({ name, value });
  };

  return (
    <Pressable
      style={[
        styles.optionContainer,
        selected ? { backgroundColor: colors.TERTIARY } : null,
      ]}
      onPress={handleOptionClick}
    >
      <UIText style={selectedStyles}>{name}</UIText>
      <RightTick
        size={14}
        color={selected ? colors.ON_TERTIARY : colors.ON_SECONDARY}
      />
    </Pressable>
  );
}

export default DropDownModal;
