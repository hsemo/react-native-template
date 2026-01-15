import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEventListener } from 'react-native';

type KeyboardState = {
  isOpen: boolean;
  keyboardHeight: number;
};

const KEYBOARD_SHOW_EVENT_NAME = 'keyboardDidShow';
const KEYBOARD_HIDE_EVENT_NAME = 'keyboardDidHide';

export const useKeyboardStatus: () => KeyboardState = () => {
  const [keyboardVisibility, setKeyboardVisibility] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const onKeyboardShow: KeyboardEventListener = e => {
    setKeyboardHeight(e.endCoordinates.height);
    setKeyboardVisibility(true);
  };

  const onKeyboardHide = () => {
    setKeyboardHeight(0);
    setKeyboardVisibility(false);
  };

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      KEYBOARD_SHOW_EVENT_NAME,
      onKeyboardShow,
    );

    const keyboardHideListener = Keyboard.addListener(
      KEYBOARD_HIDE_EVENT_NAME,
      onKeyboardHide,
    );

    return () => {
      keyboardShowListener?.remove();
      keyboardHideListener?.remove();
    };
  }, []);

  return {
    isOpen: keyboardVisibility,
    keyboardHeight: keyboardHeight,
  };
};
