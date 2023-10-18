import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated"
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler"
import { ReactNode, useEffect } from "react"
import { Dimensions, ScrollView } from "react-native";

type Props = {
    children: ReactNode,
    handleScroll: (x: number, y: number) => void
    }

  const Draggable = ({ children, handleScroll }: Props) => {

	const width = Dimensions.get('window').width;
    console.log(width)
    // carouselRef.scrollTo({animated: true, index: currentIndex + 1})
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const isGestureActive = useSharedValue(false)
    const panGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startY: number, startX: number }
    >({
        onStart: (_, context) => {
            context.startX = translateX.value;
            context.startY = translateY.value;
        },
        onActive: (event, context) => {
            translateX.value = context.startX + event.translationX;
            translateY.value = context.startY + event.translationY;
            console.log('x:', translateX.value, 'y:', translateY.value)
            isGestureActive.value = true;

            try {
                if (isGestureActive.value && translateX.value > width / 2) {
                    handleScroll(600, 0); // Adjust the parameters as needed
                    isGestureActive.value = false;
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
        const position = isGestureActive.value ? 'fixed' : 'relative'
        return {
            zIndex,
            position,
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
