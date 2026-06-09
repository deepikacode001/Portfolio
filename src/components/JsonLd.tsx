import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Deepika Rajpurohit",
  url: SITE_URL,
  image: `${SITE_URL}/images/deepika.jpeg`,
  jobTitle: "Full Stack Developer",
  description: SITE_DESCRIPTION,
  email: "deepikaraj01999@gmail.com",
  telephone: "+91-8905975919",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/deepikacode001",
    "https://www.linkedin.com/in/deepika-rajpurohit-4812a8320/",
  ],
  knowsAbout: [
    "JavaScript",
    "React.js",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Web Development",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  author: {
    "@type": "Person",
    name: "Deepika Rajpurohit",
  },
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
