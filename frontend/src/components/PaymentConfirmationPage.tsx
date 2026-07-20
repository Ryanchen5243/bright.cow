import { CheckCircle, ErrorOutline, ReceiptLong } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type PaymentConfirmation = {
    paid: boolean;
    booking: {
        creatorName: string;
        serviceName: string;
        amountTotal: number;
        currency: string;
        sessionId: string;
        bookingDate: string;
        bookingTime: string;
    };
};

const formatCurrency = (amount: number, currency: string) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
}).format(amount / 100);

export default function PaymentConfirmationPage() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [confirmation, setConfirmation] = useState<PaymentConfirmation | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!sessionId) {
            setError('We could not find a payment confirmation to display.');
            return;
        }

        let cancelled = false;
        const loadConfirmation = async () => {
            try {
                const response = await fetch(`/api/checkout/session/${encodeURIComponent(sessionId)}`);
                const data = await response.json() as PaymentConfirmation & { error?: string };

                if (!response.ok || !data.paid) {
                    throw new Error(data.error || 'Your payment has not been confirmed yet.');
                }

                if (!cancelled) {
                    setConfirmation(data);
                }
            } catch (loadError) {
                if (!cancelled) {
                    setError(loadError instanceof Error ? loadError.message : 'Unable to load your payment confirmation.');
                }
            }
        };

        loadConfirmation();
        return () => { cancelled = true; };
    }, [sessionId]);

    return (
        <main className="payment-confirmation-page">
            <section className="payment-confirmation-card" aria-live="polite">
                {!confirmation && !error && <p className="payment-confirmation-loading">Confirming your payment…</p>}
                {error && <>
                    <ErrorOutline className="payment-confirmation-icon error" aria-hidden="true" />
                    <h1>We couldn’t confirm that payment</h1>
                    <p>{error}</p>
                    <Link className="payment-confirmation-button secondary" to="/app">Return to home</Link>
                </>}
                {confirmation && <>
                    <CheckCircle className="payment-confirmation-icon" aria-hidden="true" />
                    <p className="payment-confirmation-eyebrow">Payment successful</p>
                    <h1>Your booking is confirmed</h1>
                    <p className="payment-confirmation-copy">Thanks for your payment. We’ll send the session details as soon as they’re finalized.</p>
                    <div className="payment-confirmation-receipt">
                        <div className="payment-confirmation-receipt-heading"><ReceiptLong fontSize="small" /> <span>Booking receipt</span></div>
                        <div><span>Creator</span><strong>{confirmation.booking.creatorName}</strong></div>
                        <div><span>Session</span><strong>{confirmation.booking.serviceName}</strong></div>
                        <div><span>Date &amp; time</span><strong>{confirmation.booking.bookingDate} at {confirmation.booking.bookingTime}</strong></div>
                        <div className="payment-confirmation-total"><span>Paid</span><strong>{formatCurrency(confirmation.booking.amountTotal, confirmation.booking.currency)}</strong></div>
                        <small>Receipt #{confirmation.booking.sessionId.slice(-12)}</small>
                    </div>
                    <Link className="payment-confirmation-button" to="/app">Go to home</Link>
                </>}
            </section>
        </main>
    );
}
