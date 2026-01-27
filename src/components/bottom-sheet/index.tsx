import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react';
import { Keyboard, ViewStyle } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModal as BottomSheetModalType,
} from '@gorhom/bottom-sheet';
import { SharedValue } from 'react-native-reanimated';

import { RW } from '@helpers';
import { palette } from '@theme';

export interface BottomSheetModalRefProps {
  presentBottomSheet: () => void;
  dismissBottomSheet: () => void;
  snapToIndex: (index: number) => void;
}

export interface BottomSheetModalProps {
  children: ReactNode;
  snapPoints?: Array<string | number> | SharedValue<Array<string | number>>;
  handleStyle?: ViewStyle;
  onChange?: (index: number) => void;
  backdropPressBehavior?: 'none' | 'close' | 'collapse' | number;
  disableSwipeDown?: boolean;
  disableBackdrop?: boolean;
  handleComponent?: any;
  topInset?: number;
  backgroundComponent?: any;
  backgroundColor?: string;
  animateOnMount?: boolean;
}

export const BottomSheet = forwardRef<
  BottomSheetModalRefProps,
  BottomSheetModalProps
>(
  (
    {
      children,
      snapPoints = ['100%'],
      handleStyle = {
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      },
      onChange,
      backdropPressBehavior = 'close',
      disableSwipeDown = false,
      disableBackdrop = false,
      handleComponent,
      topInset,
      backgroundComponent,
      backgroundColor = palette.white,
      animateOnMount = false,
    },
    ref,
  ) => {
    const bottomSheetModalRef = useRef<BottomSheetModalType>(null);

    const presentBottomSheet = () => {
      Keyboard.dismiss();
      bottomSheetModalRef.current?.present({ animateOnMount });
    };

    const dismissBottomSheet = () => {
      bottomSheetModalRef.current?.dismiss();
    };

    const snapToIndex = (index: number) => {
      bottomSheetModalRef.current?.snapToIndex(index);
    };

    useImperativeHandle(ref, () => ({
      presentBottomSheet,
      dismissBottomSheet,
      snapToIndex,
    }));

    const renderBackdrop = (props: BottomSheetBackdropProps) =>
      disableBackdrop ? null : (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior={backdropPressBehavior}
        />
      );

    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        topInset={topInset}
        snapPoints={snapPoints}
        onChange={onChange}
        stackBehavior="replace"
        enableDismissOnClose
        backgroundComponent={backgroundComponent}
        handleComponent={handleComponent}
        enablePanDownToClose={!disableSwipeDown}
        backdropComponent={disableBackdrop ? undefined : renderBackdrop}
        handleStyle={handleStyle}
        handleIndicatorStyle={{
          backgroundColor: palette.backgroundColor,
          width: RW(48),
        }}
        enableDynamicSizing={false}
        backgroundStyle={{ backgroundColor }}
      >
        {children}
      </BottomSheetModal>
    );
  },
);

BottomSheet.displayName = 'BottomSheet';
