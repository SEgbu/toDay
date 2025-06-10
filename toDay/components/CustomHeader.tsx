import {
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    AccessibilityActionEvent,
    Button,
    Modal,
    Text,
    TextInput,
    View,
} from "react-native";
import { CalendarProps } from "react-native-calendars";

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
                    justifyContent: "space-between",
                }}
            >
                <Button
                    title={"Left"}
                    onPress={onPressLeft}
                    touchSoundDisabled={false}
                ></Button>
                <Text>{month.toString(monthFormat)}</Text>
                <Button
                    title={"QuickNav"}
                    onPress={() => setQuickNavOpen(true)}
                ></Button>
                <Button
                    title="Right"
                    onPress={onPressRight}
                    touchSoundDisabled={false}
                ></Button>
            </View>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}
            >
                <Text style={{ color: "grey" }}>Sun</Text>
                <Text style={{ color: "grey" }}>Mon</Text>
                <Text style={{ color: "grey" }}>Tue</Text>
                <Text style={{ color: "grey" }}>Wed</Text>
                <Text style={{ color: "grey" }}>Thu</Text>
                <Text style={{ color: "grey" }}>Fri</Text>
                <Text style={{ color: "grey" }}>Sat</Text>
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
                        <Button
                            title="Submit"
                            onPress={() => {
                                if (navMonth != "" && navYear != "") {
                                    handleNav(navMonth, navYear);

                                    setNavMonth("");
                                    setNavYear("");
                                    setQuickNavOpen(false);
                                }
                            }}
                        ></Button>
                        <Button
                            title="Close"
                            onPress={() => {
                                setNavMonth("");
                                setNavYear("");
                                setQuickNavOpen(false);
                            }}
                        ></Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
