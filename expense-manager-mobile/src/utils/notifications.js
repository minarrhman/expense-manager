import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification : async () => ({
        shouldShowBanner: true,
        showShowList: true,
        shouldSetBadge: true,
        shouldPlaySound: true
    }),
});

export async function requestNotificationPermission (){
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
}

export async function sendBudgetNotification(
    title,
    body,
){
    await Notifications.scheduleNotificationAsync({
        content: {
            title,
            body,
        },
        trigger: null,
    });
}