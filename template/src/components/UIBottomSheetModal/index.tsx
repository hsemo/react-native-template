import { forwardRef } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useStyles from '@src/customHooks/useStyles';

import stylesFunc from './styles';

const CustomBackDrop = ({
  animatedIndex,
  animatedPosition,
}: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    animatedIndex={animatedIndex}
    animatedPosition={animatedPosition}
    disappearsOnIndex={-1}
    appearsOnIndex={0}
  />
);

const UIBottomSheetModal = forwardRef<
  BottomSheetModal,
  UIBottomSheetModalProps
>(function UIBottomSheetModal(
  {
    botomSheetViewStyle,
    handleStyle,
    handleIndicatorStyle,
    children,
    ...props
  },
  bottomSheetRef,
) {
  const styles = useStyles(stylesFunc);
  const { bottom } = useSafeAreaInsets();

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backdropComponent={CustomBackDrop}
      handleStyle={[styles.bottomSheetHandle, handleStyle]}
      handleIndicatorStyle={[
        styles.bottomSheetHandleIndicator,
        handleIndicatorStyle,
      ]}
      {...props}
    >
      <BottomSheetView
        style={[
          styles.modalView,
          { paddingBottom: bottom },
          botomSheetViewStyle,
        ]}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default UIBottomSheetModal;
