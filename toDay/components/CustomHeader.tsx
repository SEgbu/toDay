import { globalStyle } from "@/styles/GlobalStyle";
import {
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    AccessibilityActionEvent,
    TouchableOpacity,
    Modal,
    StyleProp,
    Text,
    TextInput,
    View,
    ViewStyle,
    Image,
} from "react-native";
import { CalendarProps } from "react-native-calendars";
import { colours } from "@/constants/Colours";

import Arrow from "../assets/iconmonstr-arrow-left-circle-filled.svg"
import QuickNav from "../assets/iconmonstr-caret-down-circle.svg"
import { fontStyle } from "@/constants/Text";

export const CustomHeader: React.FC<CalendarProps> = (props) => {
    const {
        theme,
        style: propsStyle,
        addMonth: propsAddMonth,
        month,
        monthFormat = "MMMM yyyy",

        renderArrow,
        onPressArrowLeft,
        onPressArrowRight,
    } = props;

    const [isQuickNavOpen, setQuickNavOpen] = useState(false);

    const [navMonth, setNavMonth] = useState("");
    const [navYear, setNavYear] = useState("");

    const addMonth = useCallback(() => {
        propsAddMonth?.(1);
    }, [propsAddMonth]);

    const subtractMonth = useCallback(() => {
        propsAddMonth?.(-1);
    }, [propsAddMonth]);

    const onPressLeft = useCallback(() => {
        if (typeof onPressArrowLeft === "function") {
            return onPressArrowLeft(subtractMonth, month);
        }
        return subtractMonth();
    }, [onPressArrowLeft, subtractMonth, month]);

    const onPressRight = useCallback(() => {
        if (typeof onPressArrowRight === "function") {
            return onPressArrowRight(addMonth, month);
        }
        return addMonth();
    }, [onPressArrowRight, addMonth, month]);

    const handleNav = (pMonth: string, pYear: string) => {
        let inputAreNumbers = true;

        for (const c of pMonth) {
            if (!(c >= "0" && c <= "9")) {
                inputAreNumbers = false;
            }
        }

        for (const c of pYear) {
            if (!(c >= "0" && c <= "9")) {
                inputAreNumbers = false;
            }
        }

        if (inputAreNumbers) {
            const currentMonth = parseInt(month.toString("MM"));
            const currentYear = parseInt(month.toString("yyyy"));

            const distance =
                parseInt(pMonth) -
                currentMonth +
                (parseInt(pYear) - currentYear) * 12;

            propsAddMonth?.(distance);
        }
    };
    return (
        <View style={{ display: "flex", gap: 30 }}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center", 
                    height: 75
                }}
            >
                <TouchableOpacity
                    onPress={onPressLeft}
                    touchSoundDisabled={false}
                >
                    <Arrow width={30} height={30} fill={colours.text}></Arrow>
                </TouchableOpacity>
                <Text style={globalStyle.h1Text}>{month.toString(monthFormat)}</Text>
                <TouchableOpacity 
                    onPress={() => setQuickNavOpen(true)}
                >
                    <QuickNav width={30} height={30} fill={colours.text}></QuickNav>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onPressRight}
                    touchSoundDisabled={false}
                >
                    <Arrow width={30} height={30} rotation={180} fill={colours.text}></Arrow>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}
            >
                <Text style={globalStyle.smallText}>Sun</Text>
                <Text style={globalStyle.smallText}>Mon</Text>
                <Text style={globalStyle.smallText}>Tue</Text>
                <Text style={globalStyle.smallText}>Wed</Text>
                <Text style={globalStyle.smallText}>Thu</Text>
                <Text style={globalStyle.smallText}>Fri</Text>
                <Text style={globalStyle.smallText}>Sat</Text>
            </View>
            <Modal
                visible={isQuickNavOpen}
                animationType="slide"
                transparent={true}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "white",
                            width: 300,
                            padding: 30,
                            display: "flex",
                            gap: 3,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    >
                        <TextInput
                            placeholder="Month (m or mm)"
                            keyboardType="numeric"
                            value={navMonth}
                            onChangeText={(eventText) => {
                                setNavMonth(eventText);
                            }}
                        ></TextInput>
                        <TextInput
                            placeholder="Year (yyyy)"
                            keyboardType="numeric"
                            value={navYear}
                            onChangeText={(eventText) => {
                                setNavYear(eventText);
                            }}
                        ></TextInput>
                        <TouchableOpacity
                            onPress={() => {
                                if (navMonth != "" && navYear != "") {
                                    handleNav(navMonth, navYear);

                                    setNavMonth("");
                                    setNavYear("");
                                    setQuickNavOpen(false);
                                }
                            }}
                        >
                            <Text>Go</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setNavMonth("");
                                setNavYear("");
                                setQuickNavOpen(false);
                            }}
                        >
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
