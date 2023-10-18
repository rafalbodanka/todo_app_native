import { useState } from "react" 
import Animated, { useAnimatedGestureHandler, useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue } from "react-native-reanimated"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import { ReactNode, useEffect } from "react"
import { Dimensions, ScrollView } from "react-native";
import { useAppDispatch } from "../../redux/hooks";
import { setDraggedTaskIndex } from "../../redux/currentColumn";
import { TaskType } from "../../types/Types";

type Props = {
    children: ReactNode,
    task: TaskType,
    }

  const Draggable = ({ children, task }: Props) => {

	const width = Dimensions.get('window').width;
    const dispatch = useAppDispatch()
    // carouselRef.scrollTo({animated: true, index: currentIndex + 1})
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const draggedTaskIndex = useSharedValue("")
    const isGestureActive = useSharedValue(false)
    const panGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startY: number, startX: number }
    >({
        onStart: (_, context) => {
            context.startX = translateX.value;
            context.startY = translateY.value;
            draggedTaskIndex.value = task._id
            
        },
        onActive: (event, context) => {
            translateX.value = context.startX + event.translationX;
            translateY.value = context.startY + event.translationY;
            console.log('x:', translateX.value, 'y:', translateY.value)
            isGestureActive.value = true;

            try {
                if (isGestureActive.value && translateX.value > width / 2) {
                    console.log('elo')
                }
              } catch (error) {
                console.error("Error in scrollTo:", error);
              }
        },
        onFinish: () => {
            isGestureActive.value = false
        }
    })

    const animatedStyle = useAnimatedStyle(() => {
        const zIndex = isGestureActive.value ? 1000 : 1;
        return {
            zIndex,
            transform: [
                {translateX: translateX.value},
                {translateY: translateY.value}
            ]
        }
    })

    return (
        <Animated.View style={animatedStyle}>
            <PanGestureHandler onGestureEvent={panGesture} activateAfterLongPress={300} >
                <Animated.View>
                    {children}
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    )
}

export default Draggable
