import AppButton from "@/components/common/AppButton";
import Hero from "@/components/common/Hero"
import Section from "@/components/layout/Section"
import PrintBtn from "@/components/pages/privacy/PrintBtn";
import { createTranslator } from "@/lib/i18n";
import { canonical } from "@/lib/metadata";

export async function generateMetadata({ params }: {params: Promise<{ locale: string }>;}) {
    const { locale } = await params;
    return await canonical({
        path: "",
        locale: locale,
        title: "privacy.label", 
        description: "privacy.description", 
        images: ["/og/privacy.png"]
    });
}

export default async ({params} : {params: Promise<{locale : string}>}) => {
    const {locale} = await params;
    const t = await createTranslator(locale);
    const privacyEmail = `mailto:${process.env.NEXT_PUBLIC_PRIVACY_EMAIL}`;

    const buttons = (
        <div className="flex gap-3 mt-6">
            <AppButton href={privacyEmail} theme="primary" >{t("privacy.contact-cta")}</AppButton>
            <PrintBtn />
        </div>
    );

    return (
        <article>
            <Section className="bg-white">
                <Hero
                    title={t("privacy.label")}
                    description={t("privacy.description")}
                    slogan={t("privacy.slogan")}
                    svgImage="/media/secure.svg"
                    hasCta={false}
                >
                    {buttons}
                </Hero>
            </Section>
            <Section className="bg-gray-50 border-t" Tag={"div"}>
                <div className="p-6 sm:p-12 space-y-8">
                    <section>
                        <h2 className="text-xl font-medium">Introduction</h2>
                        <p className="mt-2 text-gray-700">Trayka LLC. develops AI-driven automation and agentic tooling (including RAG systems) used by organisations to streamline support, sales, and operations. This Privacy Policy explains what information we collect, how we use it, where it is processed, and the choices available to you regarding your personal data.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium">Contacting Our Privacy Team</h2>
                        <p className="mt-2 text-gray-700">If you have questions about this policy or wish to exercise your privacy rights, please contact our Privacy Team:</p>
                        <p className="mt-3 font-medium text-gray-800">Email: <a href={privacyEmail} className="text-[#3c01ff] hover:underline">privacy@trayka.com</a></p>
                        <p className="mt-1 text-sm text-gray-500">(Trayka LLC. adheres to industry-standard data protection and privacy practices.)</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium">Information We Collect</h2>
                        <p className="mt-2 text-gray-700">We collect professional and technical information needed to deliver our services. Common items include:</p>
                        <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1">
                            <li>Name</li>
                            <li>Job title</li>
                            <li>Company name</li>
                            <li>Work email and phone number</li>
                            <li>Work address (business address only)</li>
                        </ul>
                        <p className="mt-3 text-gray-700">We also automatically gather technical data when you use our website, such as IP address, browser type, operating system, and pages visited. This helps us improve the product and the user experience.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium">How We Use Your Data</h2>
                        <p className="mt-2 text-gray-700">We use collected information to provide and improve our services, communicate about products and events, troubleshoot issues, and operate securely. We do not sell personal information to third parties.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium">Cookies & Tracking</h2>
                        <p className="mt-2 text-gray-700">We use cookies and similar technologies for analytics, functionality, and user preference management. See our Cookie Notice for options to manage these settings.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium">Sharing & Subprocessors</h2>
                        <p className="mt-2 text-gray-700">Your data may be stored with trusted cloud providers and shared with service providers who act on our behalf for tasks like hosting, email delivery, and analytics. These subprocessors have access only to the information required to perform their duties and are contractually bound to protect it.</p>
                        <p className="mt-2 text-gray-700">We disclose personal data only when:</p>
                        <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                        <li>You request or authorise the disclosure</li>
                        <li>Required by law or legal process</li>
                        <li>To protect our rights, users, or staff</li>
                        <li>To vendors or agents performing services for us</li>
                        <li>In emergencies or to resolve disputes</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium">International Transfers</h2>
                        <p className="mt-2 text-gray-700">Trayka LLC. follows industry-standard data protection and privacy practices. Your information may be transferred internationally for storage or processing, including to countries where our providers operate. We implement appropriate safeguards (such as contractual protections and standard contractual clauses) to protect internationally transferred data.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium">Your Privacy Rights</h2>
                        <p className="mt-2 text-gray-700">Depending on applicable law, you may have rights to access, correct, delete, restrict processing, or port your personal data, and to object to certain uses. To exercise these rights, contact <a href={privacyEmail} className="text-[#3c01ff] hover:underline">privacy@trayka.com</a>. We will respond within a reasonable timeframe and explain any lawful reason for denying a request.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium">Google Workspace APIs</h2>
                        <p className="mt-2 text-gray-700">We use Google Workspace APIs only to provide specific product features. Data accessed through these APIs is not used to train or improve general AI/ML models.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium">Security & Data Protection</h2>
                        <p className="mt-2 text-gray-700">We maintain industry-standard security controls including encryption in transit and at rest, role-based access, rate limiting, domain allowlisting for embedded agents, and secure cloud infrastructure. We also follow GDPR-aligned and SOC 2–oriented practices where applicable.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium">Data Retention</h2>
                        <p className="mt-2 text-gray-700">We retain customer data for the duration of the business relationship and for a limited period afterwards for operational, analytical, and archival needs. Prospect data is retained only while it remains relevant for legitimate business purposes. You may request deletion or portability of your data by contacting us.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-medium">Children’s Data</h2>
                        <p className="mt-2 text-gray-700">Trayka LLC. does not knowingly collect information from children. If we learn we have collected such data, we will delete it promptly.</p>
                    </section>

                    <section className="pt-4 border-t border-gray-100">
                        <h2 className="text-lg font-semibold">Contact & Requests</h2>
                        <p className="mt-2 text-gray-700">For questions, concerns, or to exercise your privacy rights, please contact our Privacy Team at:</p>
                        <p className="mt-3 font-medium text-gray-800">Email: <a href={privacyEmail} className="text-[#3c01ff] hover:underline">privacy@trayka.com</a></p>
                        <p className="mt-6 text-sm text-gray-500">This policy is maintained by Trayka LLC. and reflects our adherence to industry-standard data protection and privacy practices. We may update it periodically — the latest version will always be posted here.</p>
                    </section>

                    {buttons}
                </div>
            </Section>
        </article>
    )
}