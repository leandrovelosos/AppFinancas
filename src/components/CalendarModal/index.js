import React, { useState } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { ButtonFilterText, Container, ModalContent, ButtonFilter } from './styles'
import { Calendar, LocaleConfig } from "react-native-calendars";
export default function CalendarModal({ setVisible, handleFilter }) {

    const [dateNow, setDateNow] = useState(new Date());
    const [markeddates, setMarkedDates] = useState({});

    function handleOnDayPress(date) {
        // console.log(date.dateString)

        setDateNow(new Date(date.dateString));

        let markeDay = {};

        markeDay[date.dateString] = {
            selected: true,
            selectedColor: "#3B3DBF",
            textColor: "#FFF"
        }

        setMarkedDates(markeDay);
    }

    function handleFilterDate() {
        handleFilter(dateNow);
        setVisible();
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={{ flex: 1 }}>
                </View>
            </TouchableWithoutFeedback>

            <ModalContent>

                <Calendar
                    onDayPress={handleOnDayPress}
                    markedDates={markeddates}
                    enableSwipeMonths={true}
                    theme={{
                        todayTextColor: "#FF0000",
                        selectedDayBackgroundColor: "#00ADF5",
                        selectedDayTextColor: "#FFF"

                    }}
                />

                <ButtonFilter onPress={handleFilterDate}>
                    <ButtonFilterText>Filtrar</ButtonFilterText>
                </ButtonFilter>

            </ModalContent>
        </Container>
    )
}