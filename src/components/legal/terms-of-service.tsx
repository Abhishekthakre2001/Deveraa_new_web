"use client";

// components/legal/terms-of-service.tsx

import { CalendarDays, FileText, Key, MapPin, Scale } from "lucide-react";
import { LegalPage, type LegalSection } from "./legal-page";

// Placeholders: replace with your real company details
const COMPANY = "Deveraa";
const EFFECTIVE = "3 October 2026";
const EMAIL = "info@deveraa.com";
const PHONE = "+91 92701 39519";
const ADDRESS = "Nagpur, Maharashtra 440009, India";

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    paragraphs: [
      `These Terms of Service ("Terms") apply when you visit the ${COMPANY} website or use our software development services. By accessing the website or engaging us, you agree to be bound by these Terms. If you do not agree, please do not use the website.`,
      "Work on a specific project is governed by a written proposal, statement of work or services agreement signed or accepted by both parties. If it conflicts with these Terms, that written agreement prevails for the project.",
      "You confirm that you are at least 18 years old and legally able to enter into a contract under the Indian Contract Act, 1872, or that you are acting on behalf of a business that is.",
    ],
  },
  {
    id: "our-services",
    title: "Our services",
    paragraphs: [
      `${COMPANY} is a software development company based in Nagpur, Maharashtra, India. We offer web development, mobile apps, SaaS solutions, AI and ML, UI/UX design, and cloud and DevOps services.`,
      "Descriptions of services on our website are for general information and are not a binding offer. The exact scope, deliverables, timelines and fees for your project are set out in our written proposal.",
    ],
  },
  {
    id: "website-use",
    title: "Using the website",
    paragraphs: ["You agree to use the website lawfully and not to:"],
    items: [
      "Break any applicable law, including the Information Technology Act, 2000",
      "Try to gain unauthorised access to our systems, accounts or data",
      "Introduce malware, or interfere with how the website works",
      "Scrape, copy or collect content using automated tools without our permission",
      "Impersonate any person or misrepresent your connection to a person or business",
    ],
  },
  {
    id: "projects",
    title: "Quotes and project work",
    items: [
      "Proposals: quotes are valid for [30] days unless stated otherwise, and become binding once both parties accept them in writing or by email.",
      "Scope changes: requests outside the agreed scope are handled as written change requests, which may affect the timeline and the fees.",
      "Your responsibilities: you agree to provide timely feedback, content, approvals and access. Delays on your side may move delivery dates.",
      "Timelines: dates in a proposal are good-faith estimates that depend on your cooperation and on third parties.",
    ],
  },
  {
    id: "fees",
    title: "Fees and payment",
    items: [
      "Payment schedule: fees are payable as set out in the proposal, usually in milestones, and invoices are due within the period stated on the invoice.",
      "Taxes: fees are exclusive of GST and other applicable taxes unless stated otherwise. We issue GST-compliant invoices as required by Indian law.",
      "Currency: payments are made in Indian Rupees (INR) unless agreed otherwise. For international clients, bank charges and any withholding taxes are borne by the client unless agreed otherwise.",
      "Late payment: we may pause work on overdue invoices, and interest may apply as stated in your agreement.",
      "Refunds: fees for work already carried out are non-refundable.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    items: [
      "Your materials: content, data, logos and other materials you provide remain yours. You confirm you have the right to give them to us for the project.",
      "Deliverables: once we have received full payment, ownership of the custom code and designs created specifically for you passes to you, as set out in your written agreement.",
      "Our tools: our pre-existing code, libraries, frameworks, templates and know-how remain ours. We grant you a non-exclusive, perpetual licence to use them as part of your deliverables.",
      "Third-party and open-source components: these stay under their own licences.",
      "Our website: the content, design, logo and branding on our site belong to us and may not be used without written permission.",
      "Portfolio: unless we agree otherwise in writing, we may show non-confidential work in our portfolio.",
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    paragraphs: [
      "Each party agrees to keep the other's non-public business and technical information confidential and to use it only for the project. This does not apply to information that is public, already known to the receiving party, or that must be disclosed by law or a court.",
      "We are happy to sign a separate non-disclosure agreement (NDA) before you share sensitive details. Confidentiality obligations continue after the project ends.",
    ],
  },
  {
    id: "third-party",
    title: "Third-party services",
    paragraphs: [
      "Projects often rely on third-party services such as cloud hosting, payment gateways, APIs and app stores. Their terms and fees apply, and we are not responsible for their availability, changes or decisions, including app store review outcomes.",
    ],
  },
  {
    id: "warranties",
    title: "Warranties and disclaimers",
    paragraphs: [
      "We carry out our services with reasonable skill and care. For delivered work, we will fix defects that do not match the agreed specification and that you report within [30] days of delivery, unless your agreement says otherwise.",
      'The website is provided "as is" and "as available". We do not promise that it will be uninterrupted or error-free. We also do not guarantee specific business outcomes, such as revenue, search rankings or user numbers.',
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    paragraphs: [
      "To the fullest extent permitted by law, we are not liable for indirect, incidental, special or consequential loss, including loss of profit, revenue, data or goodwill.",
      "Our total liability for any claim relating to a project is limited to the fees you paid us for that project in the [12] months before the claim arose. Nothing in these Terms excludes liability that cannot be excluded under Indian law, such as liability for fraud or wilful misconduct.",
    ],
  },
  {
    id: "indemnity",
    title: "Indemnity",
    paragraphs: [
      "You agree to compensate us for losses and claims arising from materials you provide that infringe a third party's rights, from your unlawful use of our deliverables, or from your breach of these Terms.",
    ],
  },
  {
    id: "termination",
    title: "Term and termination",
    paragraphs: [
      "Either party may end a project as provided in the written agreement. We may suspend or end your access to the website if you breach these Terms.",
      "If a project ends early, you will pay for work done up to the end date, and each party will return or delete the other's confidential information. Sections on intellectual property, confidentiality, liability and governing law continue after termination.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    paragraphs: [
      "Our Privacy Policy explains how we collect and use personal data, in line with the Digital Personal Data Protection Act, 2023. It forms part of these Terms.",
    ],
    links: [{ label: "Read the Privacy Policy", href: "/privacy" }],
  },
  {
    id: "force-majeure",
    title: "Events beyond our control",
    paragraphs: [
      "Neither party is liable for a delay or failure caused by events beyond its reasonable control, such as natural disasters, power or internet outages, government action, epidemics or failures of third-party services. The affected party will tell the other promptly and resume as soon as it can.",
    ],
  },
  {
    id: "disputes",
    title: "Governing law and disputes",
    paragraphs: [
      "These Terms are governed by the laws of India. If a dispute arises, both parties will first try to resolve it amicably through good-faith discussion for 30 days.",
      "If it is not resolved, it will be referred to arbitration under the Arbitration and Conciliation Act, 1996, before a sole arbitrator appointed by mutual consent. The seat and venue of arbitration will be Nagpur, Maharashtra, and the language will be English.",
      "Subject to this, the courts at Nagpur, Maharashtra have exclusive jurisdiction.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these Terms",
    paragraphs: [
      "We may update these Terms from time to time. The latest version is always on this page with its effective date. Continuing to use the website after a change means you accept the updated Terms. Changes do not affect projects already agreed in writing.",
    ],
  },
  {
    id: "general",
    title: "General",
    items: [
      "Entire agreement: these Terms and your written proposal are the whole agreement between us on their subject.",
      "Severability: if a provision is found unenforceable, the rest stays in force.",
      "No waiver: not enforcing a right does not mean we give it up.",
      "Assignment: you may not transfer your rights under these Terms without our written consent.",
      "Electronic records: under the Information Technology Act, 2000, emails and electronic records are valid for notices and agreements between us.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paragraphs: ["If you have any questions about these Terms, you can reach us here:"],
    kv: [
      ["Company", COMPANY],
      ["Address", ADDRESS],
      ["Email", EMAIL],
      ["Phone", PHONE],
    ],
  },
];

export function TermsOfService() {
  return (
    <LegalPage
      breadcrumb="Terms of Service"
      titleStart="Terms of"
      titleEnd="Service"
      subtitle={`The rules that apply when you use the ${COMPANY} website and work with our team.`}
      chips={[
        { icon: CalendarDays, label: `Effective: ${EFFECTIVE}` },
        { icon: MapPin, label: "Nagpur, Maharashtra, India" },
        { icon: Scale, label: "Laws of India" },
      ]}
      highlights={[
        { icon: FileText, title: "Clear scope in writing", text: "Every project starts with a written proposal covering scope, timelines and fees." },
        { icon: Key, title: "You own your deliverables", text: "Custom work transfers to you once payment is complete." },
        { icon: Scale, title: "Governed by Indian law", text: "Disputes are handled under the laws of India, with Nagpur as the seat." },
      ]}
      sections={SECTIONS}
      contact={{
        title: "Questions about these terms?",
        text: "Write to us and we'll be happy to clarify anything.",
        email: EMAIL,
      }}
    />
  );
}