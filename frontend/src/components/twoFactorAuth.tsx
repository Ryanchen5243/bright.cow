import { useState } from "react";

export function use2FA(){
    const [qrCode, setQRCode] = useState("");
    const setup2FA = async () => {
        const response = await fetch("/api/twoFactorAuth/setup", {
            credentials: "include"
        });

        const data = await response.json();

        setQRCode(data.qrCode);
    };
    return {qrCode, setup2FA};
}
