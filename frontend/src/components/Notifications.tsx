import { useState } from "react";
import type { ReactNode } from "react";
import { EmailOutlined, PhoneIphoneOutlined } from "@mui/icons-material";
import { Switch } from "@/components/ui/switch";

const notificationTypes = [
    { key: "newMessage", title: "New Message", description: "When you receive a new message." },
    { key: "newRequest", title: "New Request", description: "When you receive a new booking request." },
    { key: "bookingReminder", title: "Booking Reminder", description: "Receive reminders before your scheduled bookings." },
] as const;

type NotificationKey = (typeof notificationTypes)[number]["key"];
type ChannelPreferences = Record<NotificationKey, boolean>;

const defaultPreferences: ChannelPreferences = {
    newMessage: true,
    newRequest: true,
    bookingReminder: true,
};

function NotificationChannel(props: {
    channel: string;
    icon: ReactNode;
    title: string;
    description: string;
    preferences: ChannelPreferences;
    onToggle: (key: NotificationKey, enabled: boolean) => void;
}){
    return(
        <section className="settings-notifications-panel">
            <div className="settings-notifications-panel-header">
                <span className="settings-notifications-panel-icon">{props.icon}</span>
                <div>
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                </div>
            </div>
            {notificationTypes.map((notificationType) => {
                const toggleId = `${props.channel}-${notificationType.key}`;

                return(
                    <div className="settings-notifications-row" key={notificationType.key}>
                        <label className="settings-notifications-row-label" htmlFor={toggleId}>
                            <span className="settings-notifications-row-title">{notificationType.title}</span>
                            <span className="settings-notifications-row-subtitle">{notificationType.description}</span>
                        </label>
                        <Switch
                            id={toggleId}
                            className="settings-notifications-switch"
                            checked={props.preferences[notificationType.key]}
                            onCheckedChange={(checked) => props.onToggle(notificationType.key, checked)}
                            aria-label={`${props.title} — ${notificationType.title}`}
                        />
                    </div>
                );
            })}
        </section>
    )
}

export default function Notifications(){
    const [emailPreferences, setEmailPreferences] = useState<ChannelPreferences>(defaultPreferences);
    const [phonePreferences, setPhonePreferences] = useState<ChannelPreferences>(defaultPreferences);

    return(
        <div className="settings-notifications-container">
            <div className="settings-notifications-header">
                <h2>Notifications</h2>
                <p>Choose how you want to be notified.</p>
            </div>

            <NotificationChannel
                channel="email"
                icon={<EmailOutlined />}
                title="Email Notifications"
                description="Receive notifications to your email address."
                preferences={emailPreferences}
                onToggle={(key, enabled) => setEmailPreferences((prev) => ({ ...prev, [key]: enabled }))}
            />

            <NotificationChannel
                channel="phone"
                icon={<PhoneIphoneOutlined />}
                title="Phone Notifications"
                description="Receive push notifications on your phone."
                preferences={phonePreferences}
                onToggle={(key, enabled) => setPhonePreferences((prev) => ({ ...prev, [key]: enabled }))}
            />
        </div>
    )
}
