import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  FlatListProps,
  KeyboardTypeOptions,
  ListRenderItem,
  StatusBarStyle,
  StyleProp,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { AnimatedComponentProps } from 'react-native-reanimated/lib/typescript/createAnimatedComponent/commonTypes';
import { LottieViewProps } from 'lottie-react-native';

declare global {
  interface FCWithChildren {
    children?: React.ReactNode;
  }

  type ButtonType = 'solid' | 'outline' | 'flat';

  interface UITextProps extends TextProps {
    children: string;
    style?: StyleProp<TextStyle>;
    isError?: boolean;
  }

  interface InputProps extends TextInputProps {
    label?: string;
    value: string;
    onChangeText: (x: string) => void | Dispatch<SetStateAction<string>>;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    style?: ViewStyle;
    inputStyle?: any;
    labelStyle?: TextStyle;
    error?: string | null;
    errorStyle?: TextStyle;
    leftIcon?: any;
    isRequired?: boolean;
    useBottomSheetInput?: boolean;
  }

  type AppViewProps = {
    children: React.ReactNode;
    style?: ViewStyle;
    barStyle?: StatusBarStyle;
    barColor?: string | 'transparent';
  };

  interface ButtonProps {
    title: string;
    onPress: () => void;
    type?: ButtonType;
    disabled?: boolean;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
    isLoading?: boolean;
    icon?: React.JSX.Element;
    leftIcon?: React.JSX.Element;
  }

  interface PaginatedListProps<T> {
    data: T[];
    renderItem: ListRenderItem<T>;
    fetchMoreData?: () => void;
    isFetching?: boolean;
    isRefetching?: boolean;
    hasMoreData?: boolean;
    keyExtractor?: (item: T, index: number) => string;
    onRefresh?: () => void;
    flatListProps?: FlatListProps;
  }

  interface PwdIconProps {
    isVisible: boolean;
    onPress: () => void;
  }

  interface NetworkContextType {
    isConnected: boolean;
    checkConnection: () => Promise<void>;
  }

  interface ErrorBoundaryProps {
    children: React.ReactNode;
  }

  interface NoInternetScreenProps {
    onRetry: () => void;
  }

  interface NetworkProviderProps {
    children: React.ReactNode;
  }

  interface SvgPropsExtended extends SvgProps {
    size?: number;
  }

  interface AnimatedSwitchProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    bodyWidth?: number;
    bodyHeight?: number;
    bodyPadding?: number;
    bodyStyle?: Omit<
      ViewStyle,
      'width' | 'height' | 'padding' | 'paddingHorizontal' | 'paddingVertical'
    >;
    handleStyle?: Omit<
      ViewStyle,
      'width' | 'height' | 'padding' | 'paddingHorizontal' | 'paddingVertical'
    >;
  }

  interface DropDownOptionObj {
    name: string;
    value: string;
  }

  interface DropDownPickerProps {
    options?: DropDownOptionObj[];
    selectedOption: DropDownOptionObj;
    onChange?: (selectedOption: DropDownOptionObj) => void;
    pressableStyle?: StyleProp<ViewStyle>;
  }

  interface DropDownOptionProps extends DropDownOptionObj {
    selected: boolean;
    onClick: (option: DropDownOptionObj) => void;
  }

  interface CommonScreenProps {
    style?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    statusBarStyle?: StatusBarStyle;
    statusBarBGColor?: string;
    statusBarHidden?: boolean;
    children?: ReactNode;
  }

  interface UIBottomSheetModalProps extends BottomSheetModalProps {
    children?: ReactNode | ReactNode[];
    botomSheetViewStyle?: StyleProp<ViewStyle>;
  }

  interface DropDownModalProps extends BottomSheetModalProps {
    children?: ReactNode;
  }

  type IconNames = (typeof ButtonIconsNames)[keyof typeof ButtonIconsNames];

  interface IconButtonProps extends TouchableOpacityProps {
    icon: IconNames;
    size?: number;
    iconStyle?: StyleProp<ViewStyle>;
    iconProps?: SvgPropsExtended;
  }

  type AnimatedLottieViewProps = AnimatedComponentProps<LottieViewProps>;
}
