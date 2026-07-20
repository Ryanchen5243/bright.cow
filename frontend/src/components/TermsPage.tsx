import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function TermsPage() {
    const [termsTab, setTermsTab] = useState(
        "terms" as
            | "terms"
            | "cookies"
            | "privacy"
            | "community"
            | "agreements"
            | "complaints"
    );
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [tocHeadings, setTocHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

    useEffect(() => {
        const root = contentRef.current;
        if (!root) return;

        const nodes = Array.from(root.querySelectorAll("h2, h3")) as HTMLElement[];
        const headings = nodes.map((n) => {
            let id = n.id;
            if (!id) {
                id = (n.textContent || "")
                    .trim()
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-");
                n.id = id;
            }
            return { id, text: n.textContent || "", level: n.tagName === "H2" ? 2 : 3 };
        });
        setTocHeadings(headings);
    }, [termsTab]);

    const TabButton = ({ id, label }: { id: typeof termsTab; label: string }) => (
        <div
            className={`terms-page-tab ${termsTab === id ? "active" : ""}`}
            onClick={() => setTermsTab(id)}
        >
            {label}
        </div>
    );

    const Section = ({
        title,
        children,
    }: {
        title: string;
        children: React.ReactNode;
    }) => (
        <div className="terms-container terms-section-block">
            <h1>{title}</h1>
            <p className="updated">Last Updated: June 10, 2026</p> 
            <hr />
            <div className="legal-section">{children}</div>
        </div>
    );

    return (
        <div className="terms-page-wrapper">

            {/* 🔵 MINIMAL NAVBAR */}
            <nav className="simple-navbar">
                <div className="simple-navbar-left">
                    <Link to="/" className="simple-navbar-logo">
                        UWUVIBE
                    </Link>
                </div>
            </nav>

                <div className="terms-page">

                {/* Sidebar */}
                <div className="terms-page-tabs">
                    <TabButton id="terms" label="Terms and Conditions" />
                    <TabButton id="cookies" label="Cookies Settings" />
                    <TabButton id="privacy" label="Privacy Policy" />
                    <TabButton id="community" label="Community Guidelines" />
                    <TabButton id="agreements" label="User & Creator Agreements" />
                    <TabButton id="complaints" label="Complaint Policy" />
                </div>

                {/* Content */}
                <div className="terms-page-content" ref={contentRef}>
                    {termsTab === "terms" && (
                        <Section title="Terms and Conditions">
                            <p><>
    <p>Please carefully review these Terms and Conditions before using UWUVIBE.</p>

    <hr />

    <div className="legal-section">

        <h2>Terms of Use</h2>

        <h3>Introduction</h3>
        <p>
            By using UWUVIBE, you agree to be bound by these Terms of Use. Please read them carefully before accessing or using the platform. If you do not agree, you may not use our services.
        </p>

        <h3>General Terms</h3>
        <p>
            Konevo LLC reserves the right to modify these Terms at any time. Individuals under the age of 18 may not create accounts, purchase subscriptions, or book services. If a dispute arises, you agree to notify us and attempt mediation before pursuing legal action. We will contact you using the email associated with your account.
        </p>

        <h3>Our Services</h3>
        <p>
            UWUVIBE is a marketplace platform designed to connect creators and the community. Users may discover creators, communicate with them, book interactive sessions, purchase digital experiences, and become creators themselves. Services may change over time.
        </p>
        <p>
            UWUVIBE does not directly provide creator services. Any agreement between a user and a creator is solely between those parties.
        </p>

        <h3>Account Usage</h3>
        <p>
            You must be 18 or older to register. By creating an account, you agree to comply with these Terms. Konevo LLC may decline or terminate accounts that violate our policies.
        </p>
        <p>
            You agree not to impersonate others, create false identities, or sell/transfer accounts without permission.
        </p>

        <h3>Content Responsibilities</h3>
        <p>
            You are responsible for all content you upload. Content must comply with our policies. Violations may result in suspension or termination.
        </p>
        <p>
            Content posted on UWUVIBE is not confidential and may be viewed by other users. You retain ownership of your content but grant UWUVIBE a worldwide, non-exclusive, royalty-free license to host, display, reproduce, distribute, and promote it for platform operation and marketing.
        </p>
        <p>
            You represent that you own or have permission to use any uploaded content.
        </p>

        <h3>Intellectual Property</h3>
        <p>
            All UWUVIBE branding, software, design, trademarks, and platform materials are owned by UWUVIBE or its licensors. You may not copy, reproduce, distribute, modify, reverse engineer, scrape, or exploit platform materials without authorization.
        </p>

        <h3>Copyright & IP Complaints</h3>
        <p>If you believe your intellectual property rights have been infringed, you may submit a written notice including:</p>
        <ul>
            <li>Your contact information</li>
            <li>Identification of the copyrighted work or IP</li>
            <li>Identification of the allegedly infringing material</li>
            <li>A good‑faith statement that the use is unauthorized</li>
            <li>A statement under penalty of perjury confirming accuracy and authority</li>
        </ul>
        <p>UWUVIBE may remove infringing content and suspend repeat offenders.</p>

        <h3>Payment Policies</h3>
        <p>By making purchases on UWUVIBE:</p>
        <ul>
            <li>Payments are non‑refundable unless required by law or stated in our Refund Policy.</li>
            <li>Prices are set by creators or platform pricing.</li>
            <li>Platform fees may apply.</li>
            <li>Payments are processed through Stripe.</li>
            <li>You are responsible for your financial decisions.</li>
        </ul>

        <h3>Prohibited Conduct</h3>
        <p>You may not use UWUVIBE for unlawful or harmful activities, including:</p>
        <ul>
            <li>Threatening, harassing, or blackmailing others</li>
            <li>Uploading harmful, malicious, or fraudulent content</li>
            <li>Infringing intellectual property rights</li>
            <li>Distributing malware or spam</li>
            <li>Payment fraud or money laundering</li>
            <li>Scams or activities causing harm to individuals</li>
            <li>Using fake identities to commit fraud</li>
            <li>Sexual exploitation, trafficking, coercion, or illegal activity</li>
        </ul>
        <p>UWUVIBE may investigate and report unlawful conduct. You are solely responsible for your actions.</p>

        <h3>Disclaimers</h3>
        <p>
            UWUVIBE is provided “as is” and “as available.” We do not guarantee uninterrupted service, creator availability, error‑free 
            functionality, or user outcomes. We are not responsible for disputes between users and creators. However, if a party is found to have
            violated the terms of service or involved in fraudulent activity, you may report the user to our support team.
            UWUVIBE will conduct a full investigation into the incident and we reserve the right to take appropriate action, 
            including account suspension, termination, or referral to authorities when required. For more information regarding our User-Creator Agreements and Complaint Policy, please refer to the respective sections in our Terms and Conditions.
            please refer to the "User & Creator Agreements" and "Community Guidelines" sections. 
        </p>

        <h3>Tax Compliance</h3>
        <p>
            Users and creators are responsible for their own tax obligations. UWUVIBE does not provide tax advice and is not 
            liable for your tax compliance. Users outside the United States must follow their local tax laws. We strongly urge you to 
            review the laws in your jurisdictiona or consult with a tax professional to ensure compliance with all applicable tax regulations 
            related to your use of UWUVIBE and any income earned from the platform, while also considering any tax obligations in your country of residence.
        </p>

        <h3>Arbitration & Dispute Resolution</h3>
        <p>
            If an issue arises between you and UWUVIBE or Konevo LLC, both parties agree to attempt informal resolution for the incident for at 
            least 30 days before initiating arbitration or initiating any forms of legal actions. If we need to contact you regarding the dispute,
            we will do so with the email address provided/associated with your account. 
        </p>
        <p>

            If a dispute cannot be resolved informally, the dispute shall be resolved exclusively through final and 
            binding arbitration administered by the American Arbitration Association (AAA) under its applicable consumer 
            arbitration rules, unless both parties agree otherwise. Each party is responsible for paying its own AAA filing, 
            administrative, and arbitration fees in accordance with applicable AAA rules, unless otherwise required by law. A. 
            Any information regarding the American Arbitration Association (AAA) can be found on https://adr.org/

        </p>
        <p>Arbitration will:</p>
        <ul>
            <li>Be conducted in New York, USA (unless required otherwise)</li>
            <li>Be conducted in English</li>
            <li>Be decided by a single neutral arbitrator</li>
        </ul>
        <p>By using UWUVIBE, you waive the right to a jury trial.</p>

        <h3>Class Action Waiver</h3>
        <p>
            All disputes must be brought individually. You may not participate in class actions, collective actions, or representative proceedings. The arbitrator may not hear class‑wide claims or award relief to non‑parties.
        </p>

        <h3>Indemnification</h3>
        <p>
           You agree to defend, indemnify, and hold harmless UWUVIBE, Konevo LLC, and their respective affiliates, 
           officers, directors, employees, contractors, agents, partners, and representatives from and against any claims, 
           demands, actions, disputes, liabilities, damages, losses, judgments, settlements, fines, penalties, costs, and expenses, 
           including reasonable attorneys' fees and legal costs, arising out of or relating to: </p>
        <ul>
            <li>Your access to, use of, or misuse of the UWUVIBE platform or services;</li>
            <li>Any content, communications, or materials you submit, post, upload, share, or otherwise make 
                available through the platform;</li>
            <li>Your interactions, transactions, bookings, agreements, or disputes with other users or creators;</li>
            <li>Your violation of these Terms of Service, Community Guidelines, Privacy Policy, or any other platform policies;</li>
            <li>Your violation of any applicable law, regulation, or third-party rights, including intellectual property, privacy, publicity, or contractual rights;</li>
            <li>Any fraudulent, misleading, unlawful, abusive, or negligent conduct committed by you through or in connection with the platform.</li>
        </ul>

        <p>UWUVIBE (and Konevo LLC) reserves the right, at its own expense, to assume the exclusive defense and control of any matter otherwise 
        subject to indemnification by you. In such circumstances, you agree to cooperate fully with UWUVIBE and Konevo LLC in asserting any available defenses and resolving the matter.</p>

        <h3>Privacy Policy</h3>
        <p>
            Your use of UWUVIBE is governed by our Privacy Policy, which explains how we collect, use, store, and process your information. We may use third‑party providers for payments, analytics, moderation, and infrastructure.
        </p>

        <h3>Limitation of Liability</h3>
        <p>
            To the fullest extent permitted by law, Konevo LLC and UWUVIBE are not liable for indirect, incidental, consequential, special, or punitive damages, including loss of profits, data, or access. Total liability shall not exceed the amount you paid in the past 12 months.
        </p>

        <h3>Force Majeure</h3>
        <p>
            UWUVIBE is not liable for delays or failures caused by events outside our control, including natural disasters, outages, cyberattacks, government actions, labor disputes, or technical failures.
        </p>

        <h3>Our Rights & Duties</h3>
        <ul>
            <li>We may suspend or terminate accounts violating our Terms.</li>
            <li>We may investigate misconduct or fraud.</li>
            <li>We may remove illegal or policy‑violating content.</li>
            <li>We may use AI and software tools for moderation and investigation.</li>
            <li>We are not liable for financial loss or user experiences.</li>
            <li>We may recommend creators to improve user experience.</li>
            <li>We may share information with third‑party providers as needed.</li>
            <li>We may modify Terms, payment features, platform design, or settings.</li>
            <li>We may communicate with you via email, SMS, or platform messages.</li>
            <li>We may use anonymous data as permitted by law.</li>
        </ul>

        <h2>Changes to This Policy</h2>

    <p>UWUVIBE may update these policies periodically to reflect changes in platform features, legal requirements, 
        operational needs, or community standards. Updated versions will become effective upon publication unless otherwise stated. 
        Continued use of UWUVIBE constitutes acceptance of any revised Guidelines.</p>



    </div>
</>
</p>
                        </Section>
                    )}

                    {termsTab === "cookies" && (
                        <Section title="Cookies Settings">
                            <h2>Cookie Policy</h2>
                            <p><>
    <p>
        UWUVIBE uses cookies and similar technologies to improve your experience,
        maintain account security, remember your preferences, and help us understand
        how our platform is used.
    </p>

    <h3>What Are Cookies?</h3>
    <p>
        Cookies are small text files stored on your device that help websites function
        properly and remember information about your visit.
    </p>

    <h3>How We Use Cookies</h3>
    <ul>
        <li>Keep you signed in to your account</li>
        <li>Maintain platform security</li>
        <li>Remember your preferences and settings</li>
        <li>Improve website performance and functionality</li>
        <li>Analyze platform usage and traffic</li>
    </ul>

    <h3>Third‑Party Services</h3>
    <p>
        Some cookies may be placed by trusted third‑party providers that support
        services such as payment processing, analytics, fraud prevention, and website
        infrastructure.
    </p>

    <h3>Managing Cookies</h3>
    <p>
        Most browsers allow you to control or disable cookies through their settings.
        Please note that disabling certain cookies may affect the functionality of
        UWUVIBE.
    </p>

    <h3>Updates to This Policy</h3>
    <p>
        We may update this Cookie Policy from time to time. Any changes will be posted
        on this page and become effective upon publication.
    </p>
</>
</p>
                        </Section>
                    )}

                    {termsTab === "privacy" && (
                        <Section title="Privacy Policy">
                            <p><div>
    <h2>Privacy Policy</h2>

    <p>
        At UWUVIBE, operated by Konevo LLC ("UWUVIBE," "Konevo," "we," "our," or "us"), we value your privacy and are committed to protecting your personal information. This Privacy Policy explains what information we collect, how we use it, how information may be shared, and the choices available to you when using our platform, website, applications, and related services.
    </p>

    <p>
        By accessing, browsing, creating an account, purchasing services, offering services, or otherwise using UWUVIBE, you acknowledge that you have read and agree to this Privacy Policy.
    </p>

    <h2>About UWUVIBE</h2>
    <p>
        UWUVIBE is a platform designed to connect users and creators through gaming, entertainment, mentorship, livestreams, social interactions, and other creator-driven experiences.
    </p>

    <p>
        Because UWUVIBE is built around community engagement, certain information you choose to share may become publicly visible to other users and visitors of the platform. Furthermore, it may also appear on public search engines such as Google and AI operated websites such as ChatGpt.
    </p>

    <h2>Information We Collect</h2>
    <p>
        We collect information that helps us operate, secure, and improve our services.
        You are not required to create an account simply to browse portions of the platform. However, account registration may be required to access certain features, interact with other users, communicate with creators, make purchases, accept bookings, or participate in platform activities.
    </p>

    <p>Information you provide may include:</p>
    <p>
        • Name or display name<br />
        • Username<br />
        • Email address<br />
        • Country or region of residence<br />
        • Profile information<br />
        • Creator profile information<br />
        • Booking history<br />
        • Payment and billing information<br />
        • Customer support requests<br />
        • Messages submitted through platform features<br />
        • Information voluntarily shared through user-generated content
    </p>

    <p>We may also automatically collect certain technical information, including:</p>
    <p>
        • IP address<br />
        • Browser type and version<br />
        • Device information<br />
        • Operating system information<br />
        • Usage activity<br />
        • Session information<br />
        • Referral information<br />
        • Cookies and similar technologies<br />
        • Security and fraud prevention data
    </p>

    <p>
        We strive to collect only the information reasonably necessary to provide our services, maintain platform integrity, and improve user experience. Furthermore we are committed in protecting your security.
    </p>

    <h2>Identity Verification</h2>
    <p>To help maintain a safe and trustworthy marketplace, UWUVIBE may require identity verification for certain users, creators, transactions, or platform activities.</p>

    <p>Identity verification may include:</p>
    <p>
        • Legal name<br />
        • Date of birth<br />
        • Government-issued identification<br />
        • Verification photographs or selfies<br />
        • Tax information when required by law<br />
        • Business verification information
    </p>

    <p>
        Verification may be conducted directly by UWUVIBE or through trusted third-party verification providers.
    </p>

    <p>Identity verification information may be used to:</p>
    <p>
        • Confirm account authenticity<br />
        • Prevent fraud and impersonation<br />
        • Protect users and creators<br />
        • Comply with legal and regulatory requirements<br />
        • Meet payment processor requirements<br />
        • Maintain platform safety and integrity<br />
        • Detect Identity theft and protect user safety
    </p>

    <p>
        Providing false information during verification may result in account restrictions, suspension, or permanent removal from the platform.
    </p>

    <h2>How We Use Your Information</h2>
    <p>We use information collected through UWUVIBE to:</p>
    <p>
        • Create and manage user accounts<br />
        • Process bookings and transactions<br />
        • Facilitate communication between users and creators<br />
        • Process payments, refunds, and payouts<br />
        • Improve platform functionality and performance<br />
        • Personalize platform experiences<br />
        • Provide customer support<br />
        • Detect, investigate, and prevent fraud<br />
        • Protect users from abuse and unauthorized activity<br />
        • Enforce platform policies and agreements<br />
        • Comply with legal obligations<br />
        • Maintain the safety and security of our community
    </p>

    <p>
        We may also use aggregated or anonymized information to improve our services and better understand platform usage trends.
    </p>

    <h2>Public Content and User Visibility</h2>
    <p>
        UWUVIBE is a community based public platform. Certain information you voluntarily make public may be visible to other users, visitors, and third parties.
    </p>

    <p>Public information may include:</p>
    <p>
        • Usernames<br />
        • Creator profiles<br />
        • Public posts<br />
        • Reviews and ratings<br />
        • Public comments<br />
        • Creator content<br />
        • Profile images<br />
        • Other information you choose to share publicly
    </p>

    <p>
        Content published publicly on UWUVIBE may also be indexed by search engines such as Google and Bing. Publicly available information may also be accessible through third-party services, artificial intelligence systems, social media platforms, or other websites beyond our control.
    </p>

    <p>
        Users should carefully consider the information they choose to share publicly. Once information becomes public, UWUVIBE cannot guarantee complete removal from external services, search engines, archives, or third-party systems.
    </p>

    <h2>Payments and Financial Information</h2>
    <p>
        UWUVIBE uses Stripe and other approved payment providers to process transactions, payments, refunds, and creator payouts.
        Payment card information is processed directly by Stripe and is not stored on UWUVIBE servers.
        Users should review Stripe's Privacy Policy and Terms of Service to understand how financial information is collected, processed, and protected by Stripe.
    </p>

    <h2>Cookies and Analytics</h2>
    <p>
        UWUVIBE uses cookies and similar technologies to improve functionality, security, and user experience.
    </p>

    <p>Cookies may be used to:</p>
    <p>
        • Maintain account sessions<br />
        • Remember user preferences<br />
        • Improve website performance<br />
        • Detect suspicious activity<br />
        • Measure platform performance<br />
        • Analyze user engagement
    </p>

    <p>
        We may use analytics providers, including Google Analytics, to better understand how visitors use our services.
    </p>

    <p>Analytics data may include:</p>
    <p>
        • Device information<br />
        • Browser information<br />
        • Website usage patterns<br />
        • Session activity<br />
        • Referral sources
    </p>

    <p>
        This information helps us improve platform performance and user experience.
        Most browsers allow users to manage or disable cookies through browser settings. Disabling certain cookies may affect the functionality of some platform features.
    </p>

    <h2>Sharing of Information</h2>
    <p>
        UWUVIBE does not sell personal information to data brokers or third-party advertisers.
    </p>

    <p>We may share information with trusted service providers that help us operate our platform, including:</p>
    <p>
        • Stripe and payment providers<br />
        • Cloud hosting providers<br />
        • Analytics providers<br />
        • Fraud prevention services<br />
        • Identity verification providers<br />
        • Customer support tools<br />
        • Security and infrastructure providers
    </p>

    <p>
        These service providers may only access information necessary to perform services on our behalf.
    </p>

    <p>We may also disclose information when required to:</p>
    <p>
        • Comply with legal obligations<br />
        • Respond to lawful requests from authorities<br />
        • Protect platform security<br />
        • Prevent fraud and abuse<br />
        • Enforce our Terms of Service<br />
        • Protect the rights, safety, and property of UWUVIBE, users, creators, or the public
    </p>

    <h2>Creator Interactions</h2>
    <p>
        When users interact with creators through UWUVIBE, certain information may be shared as necessary to facilitate services.
    </p>

    <p>Information visible to creators may include:</p>
    <p>
        • Username<br />
        • Profile information<br />
        • Country or region<br />
        • Booking information<br />
        • Messages exchanged through platform tools
    </p>

    <p>
        Creators are responsible for handling information they receive in accordance with applicable laws and platform policies.
    </p>

    <h2>Data Security</h2>
    <p>
        UWUVIBE implements reasonable technical, administrative, and organizational safeguards designed to protect personal information against unauthorized access, misuse, disclosure, alteration, or destruction.
        However, no method of internet transmission or electronic storage can be guaranteed to be completely secure. While we work to protect your information, we cannot guarantee absolute security.
    </p>

    <h2>Data Retention</h2>
    <p>We retain personal information for as long as reasonably necessary to:</p>
    <p>
        • Provide our services<br />
        • Maintain account functionality<br />
        • Process transactions<br />
        • Resolve disputes<br />
        • Comply with legal obligations<br />
        • Enforce agreements<br />
        • Protect platform security
    </p>

    <p>
        Information may be retained after account closure when required by law, fraud prevention needs, or legitimate business purposes.
    </p>

    <h2>Your Rights and Choices</h2>
    <p>Depending on your jurisdiction and applicable law, you may have rights regarding your personal information.</p>

    <p>These rights may include:</p>
    <p>
        • Accessing information we hold about you<br />
        • Correcting inaccurate information<br />
        • Requesting deletion of your account<br />
        • Requesting deletion of certain personal data<br />
        • Restricting certain processing activities<br />
        • Receiving a copy of your personal information where permitted by law
    </p>

    <p>
        Requests may be submitted through our customer support channels.
    </p>

    <h2>Children's Privacy</h2>
    <p>
        UWUVIBE is intended for users who are 18 years of age or older.
        Individuals under the age of 18 may not create accounts, offer services, purchase services, or otherwise use features requiring registration.
        We do not knowingly collect personal information from children under 13. If we become aware that such information has been collected, we will take reasonable steps to remove it.
    </p>

    <h2>California Resident Specific Rights</h2>

<p>
    The California Consumer Privacy Act ("CCPA"), as amended by the California Privacy Rights Act ("CPRA"), provides California residents with certain rights regarding their personal information. This section explains those rights and how California residents may exercise them.
</p>

<p>
    If you are a California resident, subject to applicable law, you may have the right to:
    <br /><br />

    • Request information regarding the categories of personal information we collect, use, disclose, or share
    <br />

    • Request access to personal information we have collected about you
    <br />

    • Request deletion of certain personal information, subject to applicable legal exceptions
    <br />

    • Request correction of inaccurate personal information
    <br />

    • Request information regarding the use and disclosure of sensitive personal information
    <br />

    • Not be discriminated against for exercising any privacy rights provided under California law
    <br />

    • If you are under 18 years of age, reside in California, and maintain a registered account with UWUVIBE, you may request the removal of content or information that you have publicly posted on our platform. To submit such a request, please contact our support team and provide sufficient information to verify your identity and California residency. While we will make reasonable efforts to remove the content from public display, complete removal cannot be guaranteed, and copies may remain in our systems, backups, search engine caches, or on third-party platforms.
</p>

<p>
    UWUVIBE and Konevo LLC do not sell personal information to data brokers. We also do not knowingly sell or share personal information for cross-context behavioral advertising as defined under applicable California law.
</p>

<p>
    For additional information regarding the categories of information we collect and how we use such information, please refer to the "Information We Collect" and "How We Use Your Information" sections of this Privacy Policy.
</p>

<p>
    California residents may exercise their privacy rights by contacting us through our designated support channels. To protect account security and prevent unauthorized access, we may verify your identity before processing any request.
</p>

<p>
    We may disclose personal information to trusted third-party service providers that help us operate, maintain, and secure our platform, including:
    <br /><br />

    • Payment processors
    <br />

    • Identity verification providers
    <br />

    • Cloud hosting providers
    <br />

    • Analytics providers
    <br />

    • Customer support providers
    <br />

    • Fraud prevention and security service providers
</p>

<p>
    Additional information regarding our collection, use, disclosure, and retention of personal information can be found throughout this Privacy Policy.
</p>

    <h2>International Users and Regional Privacy Rights</h2>

<p>
    Konevo LLC operates internationally and welcomes users from multiple countries and regions. If you access or use our Platform outside of the United States, your personal information may be collected, processed, stored, and transferred to the United States or other countries where Konevo LLC or our trusted service providers operate.
</p>

<p>
    By using our Platform, you acknowledge and consent to the transfer, storage, and processing of your personal information in accordance with this Privacy Policy and applicable laws. Data protection laws in these countries may differ from those in your country of residence.
</p>

<p>
    We implement reasonable administrative, technical, and organizational safeguards to protect your personal information during international transfers and while it is stored or processed by us or our trusted service providers.
</p>

<h3>Your Privacy Rights</h3>

<p>
    Depending on your country or region of residence, you may have additional privacy rights under applicable laws. Subject to applicable law, you may have the right to:
</p>

<ul>
    <li>Request access to the personal information we maintain about you.</li>
    <li>Request correction of inaccurate or incomplete personal information.</li>
    <li>Request deletion of your personal information where permitted by law.</li>
    <li>Request restriction or suspension of certain processing activities.</li>
    <li>Object to certain uses of your personal information where permitted by law.</li>
    <li>Withdraw consent where processing is based on your consent.</li>
    <li>Request a copy of your personal information in a portable format where applicable.</li>
    <li>Submit a complaint to the appropriate privacy or data protection authority within your jurisdiction.</li>
</ul>

<p>
    We may request additional information to verify your identity before processing any privacy-related request.
</p>

<h3>International Compliance</h3>

<p>
    Konevo LLC strives to comply with applicable privacy and data protection laws in the jurisdictions where our services are offered. These may include, where applicable:
</p>

<ul>
    <li>United States privacy laws</li>
    <li>European Union General Data Protection Regulation (GDPR)</li>
    <li>United Kingdom General Data Protection Regulation (UK GDPR)</li>
    <li>Japan's Act on the Protection of Personal Information (APPI)</li>
    <li>South Korea's Personal Information Protection Act (PIPA)</li>
    <li>Canada's Personal Information Protection and Electronic Documents Act (PIPEDA)</li>
    <li>Australia's Privacy Act 1988</li>
    <li>Other applicable national or regional privacy laws</li>
</ul>

<p>
    Where local laws provide users with additional rights or impose additional obligations, those rights and obligations shall apply only to users located within the applicable jurisdiction.
</p>


    <h2>Changes to This Privacy Policy</h2>
    <p>
        We may update this Privacy Policy periodically to reflect changes in our services, legal requirements, or business practices.
        When updates are made, the revised version will be posted on this page with a new "Last Updated" date.
        Your continued use of UWUVIBE following the publication of updated policies constitutes acceptance of those changes.
    </p>
</div>
</p>
                        </Section>
                    )}

                    {termsTab === "community" && (
                        <Section title="Community Guidelines">
                            <h2>Community Guidelines</h2>
                            <p><div>

    <p>
        UWUVIBE is operated by Konevo LLC ("UWUVIBE," "we," "our," or "us"). These Community Guidelines establish the standards of behavior expected from all users, creators, visitors, and participants on the platform.
    </p>

    <p>
        UWUVIBE exists to create a safe, respectful, and trustworthy environment where users and creators can connect through gaming, entertainment, mentorship, livestreams, social experiences, and other creator driven services.
    </p>

    <p>
        By creating an account, accessing the platform, posting content, purchasing services, offering services, or otherwise participating in UWUVIBE, you agree to comply with these Community Guidelines, our Terms of Service, and all applicable laws.
    </p>

    <p>
        Failure to comply with these Guidelines may result in content removal, account restrictions, suspension, permanent account termination, loss of platform privileges, cancellation of bookings, forfeiture of earnings where legally permitted, or other enforcement actions deemed necessary by UWUVIBE.
    </p>

    <h2>Respectful Conduct</h2>
    <p>All users and creators are expected to engage with others respectfully and professionally.</p>

    <p>The following conduct is prohibited:</p>
    <p>
        • Harassment or bullying<br />
        • Targeted abuse<br />
        • Threats of violence<br />
        • Intimidation<br />
        • Stalking<br />
        • Hate speech<br />
        • Discriminatory conduct<br />
        • Excessive hostility directed at individuals or groups<br />
        • Encouraging others to harass or target individuals
    </p>

    <p>
        Healthy debate, criticism, and disagreements are permitted. However, interactions must remain respectful and may not escalate into personal attacks or abusive behavior.
        UWUVIBE reserves the right to determine whether conduct violates these standards.
    </p>

    <h2>Authenticity and Identity</h2>
    <p>Trust is fundamental to our community.</p>

    <p>Users and creators must accurately represent themselves and may not engage in deceptive or misleading conduct.</p>

    <p>Prohibited activities include:</p>
    <p>
        • Identity theft<br />
        • Impersonation of individuals, businesses, organizations, or public figures<br />
        • Use of stolen photographs or personal information<br />
        • Falsifying credentials, qualifications, certifications, or experience<br />
        • Creating misleading profiles or listings<br />
        • Misrepresenting services, products, or offerings
    </p>

    <p>
        UWUVIBE may require identity verification for certain users, creators, services, transactions, or platform activities.
        Providing false verification information may result in immediate account termination.
    </p>

    <h2>Fraud, Scams, and Financial Abuse</h2>
    <p>UWUVIBE maintains a zero-tolerance policy toward fraud and deceptive practices.</p>

    <p>Users and creators may not:</p>
    <p>
        • Conduct payment fraud<br />
        • Abuse chargeback systems<br />
        • Manipulate transactions<br />
        • Engage in refund fraud<br />
        • Operate pyramid schemes<br />
        • Promote scams<br />
        • Mislead users regarding services<br />
        • Request payments through deceptive means<br />
        • Engage in money laundering or unlawful financial activity
    </p>

    <p>
        Any attempt to exploit platform payment systems may result in permanent removal from the platform and referral to appropriate authorities when required.
    </p>

    <h2>Creator Standards</h2>
    <p>Creators play a central role in the UWUVIBE ecosystem and are expected to maintain professional standards.</p>

    <p>Creators must:</p>
    <p>
        • Accurately describe services offered<br />
        • Honor confirmed bookings whenever reasonably possible<br />
        • Provide services in good faith<br />
        • Treat users respectfully<br />
        • Communicate honestly and professionally<br />
        • Deliver services consistent with their advertised descriptions
    </p>

    <p>Creators may not:</p>
    <p>
        • Misrepresent service quality<br />
        • Deliberately deceive users<br />
        • Engage in abusive behavior<br />
        • Solicit users through fraudulent means<br />
        • Use manipulated reviews or ratings
    </p>

    <p>
        Repeated violations may result in removal from creator programs, suspension, or permanent termination.
    </p>

    <h2>User Responsibilities</h2>
    <p>Users are expected to engage respectfully with creators and other members of the community.</p>

    <p>Users may not:</p>
    <p>
        • Harass creators<br />
        • Abuse messaging systems<br />
        • Demand services outside purchased agreements<br />
        • Attempt to coerce creators<br />
        • Manipulate review systems<br />
        • Abuse refund requests<br />
        • Interfere with platform operations
    </p>

    <p>
        Users who repeatedly engage in disruptive conduct may lose access to platform features or face account suspension.
    </p>

    <h2>Prohibited Content</h2>
    <p>The following content is prohibited on UWUVIBE:</p>

    <p>
        • Illegal content<br />
        • Terrorist or extremist content<br />
        • Exploitative material<br />
        • Child sexual abuse material<br />
        • Human trafficking content<br />
        • Content promoting violence or criminal activity<br />
        • Malware, viruses, or harmful software<br />
        • Fraudulent schemes<br />
        • Copyright infringement<br />
        • Trademark infringement<br />
        • Content violating intellectual property rights<br />
        • Content intended to deceive users<br />
        • Non-consensual sharing of private information
    </p>

    <p>
        UWUVIBE reserves sole discretion to determine whether content violates these standards.
        Content may be removed without prior notice.
    </p>

    <h2>Privacy and Personal Information</h2>
    <p>Users must respect the privacy and security of others.</p>

    <p>The following activities are prohibited:</p>
    <p>
        • Doxxing<br />
        • Publishing personal information without consent<br />
        • Sharing confidential information<br />
        • Unauthorized disclosure of private communications<br />
        • Attempting to access another user's account<br />
        • Collecting personal information through deceptive means
    </p>

    <p>
        Users remain responsible for any information they voluntarily disclose publicly.
    </p>

    <h2>Platform Manipulation and Abuse</h2>
    <p>Users and creators may not attempt to interfere with, manipulate, or exploit UWUVIBE systems.</p>

    <p>Prohibited activities include:</p>
    <p>
        • Exploiting bugs or vulnerabilities<br />
        • Circumventing platform safeguards<br />
        • Reverse engineering platform systems<br />
        • Creating multiple accounts to evade enforcement actions<br />
        • Artificially inflating engagement metrics<br />
        • Manipulating ratings or reviews<br />
        • Spamming platform features<br />
        • Automated account creation<br />
        • Unauthorized scraping or data harvesting
    </p>

    <p>
        Attempts to undermine platform integrity may result in immediate enforcement action.
    </p>

    <h2>Off-Platform Conduct</h2>
    <p>
        UWUVIBE may consider serious misconduct occurring outside the platform when such conduct presents a credible risk to users, creators, employees, business partners, or platform operations.
    </p>

    <p>
        Off-platform behavior may be considered during enforcement decisions when reasonably necessary to protect community safety.
    </p>

    <h2>Reporting Violations</h2>
    <p>
        Users are encouraged to report suspected violations through available reporting tools or customer support channels.
    </p>

    <p>
        Submitting false, malicious, or intentionally misleading reports may itself constitute a violation of these Guidelines.
    </p>

    <p>
        UWUVIBE reserves the right to investigate reports and take appropriate action based on available information.
    </p>

    <h2>Investigations and Enforcement</h2>
    <p>
        UWUVIBE may investigate conduct that may violate these Guidelines, our Terms of Service, applicable law, or platform policies.
    </p>

    <p>During investigations, we may:</p>
    <p>
        • Review account activity<br />
        • Review communications submitted through platform systems<br />
        • Request additional information<br />
        • Temporarily restrict platform access<br />
        • Suspend transactions<br />
        • Remove content<br />
        • Limit account functionality
    </p>

    <p>
        Users are expected to cooperate with reasonable requests during investigations.
        Failure to cooperate may result in enforcement actions.
    </p>

    <h2>Enforcement Actions</h2>
    <p>Violations of these Community Guidelines may result in one or more of the following actions:</p>

    <p>
        • Content removal<br />
        • Warning notices<br />
        • Temporary feature restrictions<br />
        • Creator program removal<br />
        • Booking cancellations<br />
        • Payment holds where legally permitted<br />
        • Account suspension<br />
        • Permanent account termination<br />
        • Legal action<br />
        • Referral to law enforcement authorities
    </p>

    <p>
        UWUVIBE reserves the right to determine appropriate enforcement measures at its sole discretion.
    </p>

    <h2>No Right to Platform Access</h2>
    <p>
        Access to UWUVIBE is a privilege, not a right.
        UWUVIBE reserves the right to restrict, suspend, or terminate access to any account, content, service, feature, or platform functionality when necessary to protect the safety, integrity, reputation, or operations of UWUVIBE and its community.
    </p>

    <h2>Changes to These Guidelines</h2>
    <p>
        UWUVIBE may update these Community Guidelines periodically to reflect changes in platform features, legal requirements, operational needs, or community standards.
        Updated versions will become effective upon publication unless otherwise stated.
        Continued use of UWUVIBE constitutes acceptance of any revised Guidelines.
    </p>
</div>
</p>
                        </Section>
                    )}

                    {termsTab === "agreements" && (
                        <Section title="User & Creator Agreements">
                            <h2>User & Creator Agreements</h2>
                            <p><div>
    
    <p>
        This User & Creator Agreement (“Agreement”) is a legally binding contract between you 
        and Konevo LLC (“UWUVIBE,” “we,” “our,” or “us”). It governs your access to and use of 
        the UWUVIBE platform, whether as a user, creator, or visitor.
    </p>

    <p>
        By creating an account, purchasing services, offering services, posting content, or 
        otherwise using UWUVIBE, you agree to comply with this Agreement, our Community 
        Guidelines, Privacy Policy, and Terms of Service.
    </p>

    <h2>1. Eligibility</h2>
    <p>You must:</p>
    <p>
        • Be at least 18 years old<br />
        • Have the legal capacity to enter into a binding agreement<br />
        • Use the platform in compliance with all applicable laws<br />
        • Provide accurate and truthful information during registration
    </p>

    <h2>2. Roles on the Platform</h2>
    <p>UWUVIBE supports two primary roles:</p>

    <p><strong>Users</strong> — individuals who purchase, book, or participate in creator services.</p>
    <p><strong>Creators</strong> — individuals who offer services, content, or experiences through the platform.</p>

    <p>You may act as both a user and a creator, provided you comply with all applicable rules.</p>

    <h2>3. Account Responsibilities</h2>
    <p>You agree to:</p>
    <p>
        • Maintain the confidentiality of your login credentials<br />
        • Use your account personally and not share access<br />
        • Notify UWUVIBE of unauthorized access<br />
        • Keep your information accurate and up to date
    </p>

    <p>UWUVIBE may suspend or terminate accounts that violate platform rules.</p>

    <h2>4. Creator Obligations</h2>
    <p>Creators agree to:</p>
    <p>
        • Accurately describe services offered<br />
        • Deliver services as advertised<br />
        • Communicate professionally with users<br />
        • Honor confirmed bookings whenever reasonably possible<br />
        • Comply with all applicable laws and licensing requirements<br />
        • Avoid deceptive, fraudulent, or harmful conduct <br />
        • Provide evidence if user violates the agreement or guidelines for further investigation
    </p>

    <p>Creators are solely responsible for the quality, legality, and delivery of their services.</p>

    <h2>5. User Obligations</h2>
    <p>Users agree to:</p>
    <p>
        • Treat creators respectfully<br />
        • Pay for services as agreed<br />
        • Avoid abusive or manipulative behavior<br />
        • Use platform features responsibly<br />
        • Refrain from demanding services outside the agreed scope
    </p>

    <p>Users who violate these obligations may lose access to platform features.</p>

    <h2>6. Payments & Fees</h2>
    <p>
        Payments, refunds, and creator payouts are processed through Stripe or other approved 
        payment providers. By using UWUVIBE, you agree to comply with their terms.
    </p>

    <p>Creators authorize UWUVIBE to:</p>
    <p>
        • Collect payments from users<br />
        • Deduct platform fees<br />
        • Remit payouts to creators
    </p>

    <p>UWUVIBE does not store payment card information.</p>

    <h2>7. Cancellations & Refunds</h2>
    <p>
        In general, all purchases are final and there will be no refunds for any services once the booking is confirmed.
        However, cancellation and refund eligibility may vary depending on the service, creator policy, 
        and platform rules. UWUVIBE reserves the right to issue or deny refunds at its 
        discretion. If either the user or creator had violated the terms of service or community guidelines, 
        the other party may be eligible for a refund. For example, if a creator fails to deliver a service as advertised or violated the terms of service.
        Or if the creator is suspected in engaging in identity theft, impersonation, or other fradulent activities. The user may be eligible 
        for a refund claim. 
        In such cases, the party seeking a refund or cancellations must 
        provide clear supporting evidences of such violation. If there are no supporting evidences and no founding from UWUVIBE's
        investigation, the refund request will be denied and the booking will be considered valid and completed. 
        It is highly recommend for users and creators to communicate with each other and resolve any issues before seeking a refund or cancellations.
        Furthermore, it is also highly recommended for users and creators to provide supporting evidences when filing a claim with our customer 
        support team. This will help us to investigate the case and make a fair decision. <br /><br />

        On the other hand, if the user violates the terms of service or community guidelines, such as engaging in harassment, abuse
        or other forms of fradulent activities, the creator may postpone the service, block the user, and the session will be marked
        as completed, as the user will not be eligible for a refund. In such cases, the creator may report the user to our customer
        support team, as we will conduct a full investigation into the incident. It is the creator's responsibility and duty to provide
        full supporting evidences of the user's violation, such as screenshots of messages, recordings of the session, or 
        any other relevant information. If there are no supporting evidences and no founding from UWUVIBE's investigation, 
        our customer support team will reach out to both parties and try to resolve the issue. However, if there are no evidence 
        supporting the user's violation, the booking will be considered invalid, and the user will be eligible for a refund. <br />
    </p>

    <h2>8. Prohibited Conduct</h2>
    <p>Users and creators may not:</p>
    <p>
        • Engage in harassment, threats, or abusive behavior<br />
        • Commit fraud or manipulate transactions<br />
        • Impersonate others or falsify identity<br />
        • Post illegal or harmful content<br />
        • Circumvent platform systems or safeguards<br />
        • Interfere with platform operations<br />
        • Engage in off-platform transactions intended to bypass fees
    </p>

    <h2>9. Content Ownership & Licensing</h2>
    <p>
        You retain ownership of content you create and upload. However, by posting content on 
        UWUVIBE, you grant us a limited, worldwide, royalty-free license to display, host, 
        distribute, and promote that content as necessary to operate the platform.
    </p>

    <p>You may not upload content that:</p>
    <p>
        • Violates intellectual property rights<br />
        • Contains illegal or harmful material<br />
        • Infringes on privacy or publicity rights<br />
        • Misleads or deceives users
    </p>

    <h2>10. Safety & Enforcement</h2>
    <p>UWUVIBE may take enforcement actions including:</p>
    <p>
        • Content removal<br />
        • Warning notices<br />
        • Temporary restrictions<br />
        • Booking cancellations<br />
        • Payment holds where legally permitted<br />
        • Account suspension<br />
        • Permanent account termination<br />
        • Referral to law enforcement when required
    </p>

    <p>UWUVIBE reserves the right to determine appropriate enforcement measures.</p>

    <h2>11. Off-Platform Conduct</h2>
    <p>
        Serious misconduct occurring outside UWUVIBE may be considered if it poses a credible 
        risk to users, creators, employees, or platform operations.
    </p>

    <h2>12. Disclaimers</h2>
    <p>
        UWUVIBE provides a platform for users and creators to connect. We do not control, 
        supervise, or guarantee the quality, legality, or safety of creator services.
    </p>

    <p>
        UWUVIBE is not responsible for disputes between users and creators, though we may 
        assist at our discretion.
    </p>

    <h2>13. Creator and User Disputes</h2>

        <p>
            UWUVIBE is a marketplace platform that connects users with independent creators. Unless expressly stated otherwise, Konevo LLC is not a party to any agreement, booking, communication, transaction, or arrangement entered into between users and creators.
        </p>

        <p>
            Creators and users are solely responsible for their communications, bookings, transactions, payments, cancellations, conduct, and the fulfillment of any services provided through the Platform.
        </p>

        <p>
            If a dispute arises between a creator and a user, both parties agree to make a good-faith effort to resolve the matter directly before requesting assistance from Konevo LLC.
        </p>

        <p>
            Either party may submit a dispute through UWUVIBE's designated support channels. Upon receiving a dispute, Konevo LLC may, at its sole discretion, investigate the matter by reviewing booking records, payment history, messages exchanged through the Platform, uploaded content, and any other relevant information.
        </p>

        <p>
            Both creators and users agree to cooperate fully with any investigation conducted by Konevo LLC. Failure to respond to reasonable requests for information or attempts to obstruct an investigation may result in enforcement action against the non-cooperating party.
        </p>

        <p>
            During an investigation, Konevo LLC may temporarily place holds on payouts, suspend bookings, restrict account functionality, or take other reasonable measures necessary to protect the integrity of the Platform while the matter is being reviewed.
        </p>

        <p>
            After reviewing the available information, Konevo LLC may, at its sole discretion, determine the appropriate resolution. Such actions may include, but are not limited to:
        </p>

        <ul>
            <li>Issuing a full or partial refund to the user.</li>
            <li>Approving, reducing, delaying, or reversing creator payouts.</li>
            <li>Cancelling or modifying bookings.</li>
            <li>Removing content that violates Platform policies.</li>
            <li>Issuing warnings to either party.</li>
            <li>Temporarily suspending or permanently terminating accounts.</li>
            <li>Taking any other action reasonably necessary to protect users, creators, or the Platform.</li>
        </ul>

        <p>
            Konevo LLC reserves the right to make the final determination regarding disputes involving violations of the Terms of Service, Creator Agreement, User Agreement, Community Guidelines, Privacy Policy, or any other Platform policies. Our decisions regarding Platform enforcement are final unless otherwise required by applicable law.
        </p>

        <p>
            Nothing in this Agreement requires Konevo LLC to mediate, arbitrate, or resolve disputes between users and creators. Any assistance provided by Konevo LLC is voluntary and does not create any legal obligation, fiduciary duty, partnership, agency relationship, or liability on the part of Konevo LLC.
        </p>

        <p>
            Creators acknowledge that repeated customer complaints, excessive cancellations, fraudulent activity, misleading listings, failure to deliver booked services, poor communication, or other conduct that negatively impacts users or the Platform may result in warnings, reduced visibility, payout holds, suspension, permanent account termination, or other enforcement actions at Konevo LLC's sole discretion.
        </p>

        <p>
            Users acknowledge that fraudulent chargebacks, abusive behavior, harassment, false reports, attempts to circumvent the Platform, non-payment, or other violations of Platform policies may result in warnings, account restrictions, suspension, permanent account termination, legal action where appropriate, or other enforcement measures deemed necessary by Konevo LLC.
        </p>

    <h2>14. Limitation of Liability</h2>
    <p>
        To the maximum extent permitted by law, UWUVIBE is not liable for indirect, 
        incidental, consequential, or punitive damages arising from platform use.
    </p>

    <h2>15. Termination</h2>
    <p>
        UWUVIBE may suspend or terminate access to the platform at any time for violations of 
        this Agreement, legal requirements, or platform policies.
    </p>

    <h2>16. Changes to This Agreement</h2>
    <p>
        UWUVIBE may update this Agreement periodically. Updated versions become effective upon 
        publication unless otherwise stated. Continued use of the platform constitutes 
        acceptance of the revised Agreement.
    </p>
</div>
</p>
                        </Section>
                    )}

                    {termsTab === "complaints" && (
                        <Section title="Complaint Policy">
                            <h2>Complaint Policy</h2>
                            <p>

<p>
    If you have a complaint, concern, or dispute regarding UWUVIBE, Konevo LLC, another user, creator, or any aspect of the Platform, we encourage you to contact our support team first so we can attempt to resolve the issue promptly, fairly, and in good faith.
</p>

<p>
    Before initiating arbitration or any legal proceeding, both you and Konevo LLC agree to make a good-faith effort to resolve the dispute informally for at least thirty (30) days after written notice of the dispute has been provided.
</p>

<p>
    Written notice may be submitted through our designated customer support channels or by email. We may contact you regarding the dispute using the email address associated with your account.
</p>

<h2>Arbitration &amp; Dispute Resolution</h2>

<p>
    If a dispute cannot be resolved through informal negotiations, it shall be resolved exclusively through final and binding arbitration administered by the American Arbitration Association ("AAA") in accordance with its applicable Consumer Arbitration Rules, unless both parties mutually agree otherwise or applicable law requires a different procedure.
</p>

<p>Arbitration shall:</p>

<ul>
    <li>Be conducted in New York, New York, United States, unless applicable law requires another location.</li>
    <li>Be conducted in the English language.</li>
    <li>Be heard by one (1) neutral arbitrator.</li>
    <li>Be final and binding upon both parties, subject only to any rights of appeal provided by applicable law.</li>
</ul>

<p>
    Each party shall be responsible for its own arbitration costs, filing fees, administrative fees, attorney's fees, and related expenses unless otherwise required by applicable law or awarded by the arbitrator.
</p>

<p>
    Additional information regarding the American Arbitration Association may be found at https://adr.org/.
</p>

<p>
    BY USING UWUVIBE, YOU UNDERSTAND AND AGREE THAT, TO THE MAXIMUM EXTENT PERMITTED BY LAW, YOU ARE WAIVING YOUR RIGHT TO A TRIAL BY JURY FOR ANY DISPUTE SUBJECT TO ARBITRATION.
</p>

<h2>Class Action Waiver</h2>

<p>
    To the fullest extent permitted by applicable law, all claims and disputes must be brought solely in an individual capacity and not as a plaintiff, class member, or representative in any class action, collective action, consolidated action, private attorney general action, or other representative proceeding.
</p>

<p>
    The arbitrator shall have no authority to consolidate claims from multiple individuals or to preside over any class, collective, or representative proceeding unless required by applicable law.
</p>

<h2>Indemnification</h2>

<p>
    You agree to defend, indemnify, and hold harmless UWUVIBE, Konevo LLC, its parent companies, subsidiaries, affiliates, officers, directors, employees, contractors, agents, licensors, partners, successors, and assigns from and against any claims, demands, actions, lawsuits, liabilities, damages, judgments, settlements, penalties, fines, losses, costs, and expenses, including reasonable attorneys' fees and legal expenses, arising out of or relating to:
</p>

<ul>
    <li>Your access to or use of the Platform.</li>
    <li>Your misuse of the Platform or any services provided through it.</li>
    <li>Any content, messages, media, or other materials you upload, submit, publish, transmit, or otherwise make available.</li>
    <li>Your bookings, transactions, agreements, communications, or disputes with other users or creators.</li>
    <li>Your violation of these Terms of Service, Community Guidelines, Privacy Policy, Creator Agreement, User Agreement, or any other Platform policies.</li>
    <li>Your violation of any applicable law, regulation, or third-party rights, including intellectual property, privacy, publicity, or contractual rights.</li>
    <li>Any fraudulent, negligent, unlawful, abusive, misleading, or intentionally harmful conduct committed by you.</li>
</ul>

<p>
    Konevo LLC reserves the right, at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you. If we do so, you agree to fully cooperate with our defense and settlement of the matter.
</p>

<h2>International Disputes</h2>

<p>
    If you access or use the Platform from outside the United States, you acknowledge that these Terms of Service shall remain governed by the laws specified herein to the extent permitted by applicable law. Certain consumer protection laws or mandatory legal rights in your country or region of residence may apply and cannot be waived or limited by these Terms of Service.
</p>

<h2>Limitation of Liability</h2>

<p>
    TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, UWUVIBE, KONEVO LLC, ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, AGENTS, LICENSORS, AND PARTNERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF REVENUE, LOSS OF BUSINESS OPPORTUNITIES, LOSS OF DATA, LOSS OF GOODWILL, LOSS OF ACCESS TO THE PLATFORM, OR OTHER INTANGIBLE LOSSES ARISING OUT OF OR RELATING TO YOUR USE OF, INABILITY TO USE, OR RELIANCE UPON THE PLATFORM OR ANY SERVICES PROVIDED THROUGH IT, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
</p>

<p>
    TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE TOTAL AGGREGATE LIABILITY OF KONEVO LLC AND UWUVIBE FOR ANY CLAIM ARISING OUT OF OR RELATING TO THE PLATFORM, THESE TERMS OF SERVICE, OR ANY SERVICES PROVIDED SHALL NOT EXCEED THE TOTAL AMOUNT YOU PAID TO UWUVIBE DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
</p>

<p>
    Some jurisdictions do not allow certain limitations or exclusions of liability. In such jurisdictions, the foregoing limitations shall apply only to the maximum extent permitted by applicable law.
</p>

<h2>Force Majeure</h2>

<p>
    Konevo LLC and UWUVIBE shall not be liable for any delay, interruption, failure to perform, or inability to provide the Platform or any services resulting from causes beyond our reasonable control. Such events include, but are not limited to, natural disasters, acts of God, fire, flood, earthquakes, pandemics, epidemics, war, terrorism, civil unrest, labor disputes, government actions, changes in law, internet outages, power outages, cyberattacks, denial-of-service attacks, payment processor failures, telecommunications failures, hosting provider outages, equipment failures, or any other unforeseen event beyond our reasonable control.
</p>

<p>
    During any such event, our obligations shall be suspended for the duration of the event, and we will make commercially reasonable efforts to restore services as soon as reasonably practicable.
</p></p>

<h2>Changes to This Policy</h2>

    <p>UWUVIBE may update these policies periodically to reflect changes in platform features, legal requirements, 
        operational needs, or community standards. Updated versions will become effective upon publication unless otherwise stated. 
        Continued use of UWUVIBE constitutes acceptance of any revised Guidelines.</p>
                        </Section>
                    )}
                </div>

                
            </div>
        </div>
    );
}
