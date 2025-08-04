import { globalStyle } from "@/styles/GlobalStyle";
import { useCallback, useState } from "react";
import { TouchableOpacity, Modal, Text, TextInput, View } from "react-native";
import { CalendarProps } from "react-native-calendars";
import { colours } from "@/constants/Colours";
import { BlurView } from "expo-blur";
import MaskedView from "@react-native-masked-view/masked-view";

import Arrow from "../assets/iconmonstr-arrow-left-circle-filled.svg";
import QuickNav from "../assets/iconmonstr-caret-down-circle.svg";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

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
                    height: 75,
                }}
            >
                <TouchableOpacity
                    onPress={onPressLeft}
                    touchSoundDisabled={false}
                >
                    <Arrow width={30} height={30} fill={colours.text}></Arrow>
                </TouchableOpacity>
                <Text style={globalStyle.h1Text}>
                    {month.toString(monthFormat)}
                </Text>
                <TouchableOpacity onPress={() => setQuickNavOpen(true)}>
                    <QuickNav
                        width={30}
                        height={30}
                        fill={colours.text}
                    ></QuickNav>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onPressRight}
                    touchSoundDisabled={false}
                >
                    <Arrow
                        width={30}
                        height={30}
                        rotation={180}
                        fill={colours.text}
                    ></Arrow>
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
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <LinearGradient
                        colors={[colours.text, colours.accent]}
                        start={{ x: 0.4, y: 0.3 }}
                        end={{ x: 0.05, y: 0.05 }}
                        style={{
                            width: 300,
                            height: 250,
                            borderRadius: 16,
                        }}
                    >
                        <View
                            style={{
                                // borderRadius: 0,
                                margin: 1,
                                justifyContent: "center",
                                flex: 1,
                            }}
                        >
                            <LinearGradient
                                colors={[colours.primary, colours.background]}
                                start={{ x: 1, y: 1 }}
                                end={{ x: 0, y: 0 }}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: 16,
                                }}
                            >
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 40,
                                        padding: 30,
                                    }}
                                >
                                    <TextInput
                                        placeholder="Month (m or mm)"
                                        placeholderTextColor={colours.textDim}
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 8,
                                            borderColor: colours.text,
                                            color: colours.text
                                        }}
                                        keyboardType="numeric"
                                        value={navMonth}
                                        onChangeText={(eventText) => {
                                            setNavMonth(eventText);
                                        }}
                                    ></TextInput>

                                    <TextInput
                                        placeholder="Year (yyyy)"
                                        placeholderTextColor={colours.textDim}
                                        style={{
                                            borderWidth: 1,
                                            borderRadius: 8,
                                            borderColor: colours.text,
                                            color: colours.text
                                        }}
                                        keyboardType="numeric"
                                        value={navYear}
                                        onChangeText={(eventText) => {
                                            setNavYear(eventText);
                                        }}
                                    ></TextInput>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            gap: 80,
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                setNavMonth("");
                                                setNavYear("");
                                                setQuickNavOpen(false);
                                            }}
                                            style={{
                                                ...globalStyle.buttonContainer,
                                                backgroundColor: "transparent",
                                                borderWidth: 1,
                                                borderColor: colours.text,
                                            }}
                                        >
                                            <Text style={globalStyle.buttonText}>
                                                Cancel
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (
                                                    navMonth != "" &&
                                                    navYear != ""
                                                ) {
                                                    handleNav(
                                                        navMonth,
                                                        navYear
                                                    );
                                                    setNavMonth("");
                                                    setNavYear("");
                                                    setQuickNavOpen(false);
                                                }
                                            }}
                                            style={{
                                                ...globalStyle.buttonContainer,
                                                backgroundColor: "transparent",
                                                borderWidth: 1,
                                                borderColor: colours.text,
                                            }}
                                        >
                                            <Text style={globalStyle.buttonText}>
                                                Go
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </LinearGradient>
                        </View>
                    </LinearGradient>
                </View>
            </Modal>
        </View>
    );
};
