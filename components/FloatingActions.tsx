import { siteData } from "../data/site";

export default function FloatingActions() {
  const whatsappUrl = `https://wa.me/91${siteData.whatsapp}?text=${encodeURIComponent(
    `Hello ${siteData.name}, I need a taxi in Indore.`
  )}`;

  return (
    <>
      {/* Floating WhatsApp on Left */}
      <div className="fixed bottom-6 left-5 md:bottom-8 md:left-8 z-[100] group">
        <a
          className="bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.538-2.961-2.654-.087-.116-.708-.943-.708-1.798 0-.855.449-1.275.609-1.449.159-.174.347-.217.463-.217l.333.005c.106.005.246-.04.384.293.144.348.491 1.203.535 1.29.044.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.777 1.394.864.174.087.275.072.376-.044.101-.116.434-.506.549-.68.116-.174.231-.145.39-.087s1.013.477 1.186.564c.174.087.289.13.333.203.044.072.044.419-.1.824z" />
          </svg>
        </a>
      </div>

      {/* Floating Call on Right */}
      <div className="fixed bottom-6 right-5 md:bottom-8 md:right-8 z-[100]">
        <a
          className="bg-[#0F172A] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border border-white/20 cursor-pointer"
          href={`tel:${siteData.phones[0]}`}
          aria-label="Call Now"
        >
          <span className="material-symbols-outlined text-2xl">phone</span>
        </a>
      </div>
    </>
  );
}
