import { Selection } from "@/types/challenge";

interface WebsiteViewerLargeProps {
  url: string;
  title: string;
  mainText: string[];
  formSections: {
    title: string;
    fields: { label: string; type: string; placeholder: string }[];
  }[];
  buttonText: string;
  footerLinks: string[];
  onSelect: (selection: Selection) => void;
  isSelected: (type: Selection["type"], index: number) => boolean;
}

export function WebsiteViewerLarge({
  url,
  title,
  mainText,
  formSections,
  buttonText,
  footerLinks,
  onSelect,
  isSelected,
}: WebsiteViewerLargeProps) {
  return (
    <div className="w-full bg-black/20 rounded-xl overflow-hidden border border-white/10">
      {/* Browser chrome/toolbar */}
      <div className="bg-white/5 p-4 border-b border-white/10">
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 font-mono text-sm">
          <span className="text-white/60">https://</span>
          <span
            className={`text-white/90 cursor-pointer ${
              isSelected("url", -1) ? "bg-lime-400/30" : "hover:bg-lime-400/30"
            }`}
            onClick={() => {
              console.log("Clicked URL");
              onSelect({ type: "url", index: -1 });
            }}
          >
            {url}
          </span>
        </div>
      </div>

      {/* Website content */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-400">
              <span
                className={`cursor-pointer ${
                  isSelected("title", -1)
                    ? "bg-lime-400/30"
                    : "hover:bg-lime-400/30"
                }`}
                onClick={() => {
                  console.log("Clicked title");
                  onSelect({ type: "title", index: -1 });
                }}
              >
                {title}
              </span>
            </div>
          </div>

          {/* Main content sections */}
          <div className="space-y-6">
            {mainText.map((text, index) => (
              <div key={index} className="text-lg text-white/80">
                <span
                  className={`cursor-pointer ${
                    isSelected("content", index)
                      ? "bg-lime-400/30"
                      : "hover:bg-lime-400/30"
                  }`}
                  onClick={() => {
                    console.log(`Clicked content section ${index}`);
                    onSelect({ type: "content", index });
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Form sections */}
          {formSections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-white/5 p-6 rounded-xl space-y-6"
            >
              <h2 className="text-2xl font-bold text-white/90">
                {section.title}
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="space-y-2">
                    <label className="block text-sm font-pixel text-white/80">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-pixel text-white/60"
                      placeholder={field.placeholder}
                      disabled
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Action button */}
          <div className="text-center">
            <button
              className={`px-12 py-4 bg-blue-500 text-white text-lg rounded-lg font-medium cursor-pointer ${
                isSelected("button", -1)
                  ? "bg-lime-400/30"
                  : "hover:bg-lime-400/30"
              }`}
              onClick={() => {
                console.log("Clicked button");
                onSelect({ type: "button", index: -1 });
              }}
            >
              {buttonText}
            </button>
          </div>

          {/* Footer links */}
          <div className="text-center space-y-2">
            {footerLinks.map((link, index) => (
              <div key={index}>
                <span
                  className={`text-[#0070ba] cursor-pointer ${
                    isSelected("footer", index)
                      ? "bg-lime-400/30"
                      : "hover:bg-lime-400/30"
                  }`}
                  onClick={() => {
                    console.log(`Clicked footer link ${index}`);
                    onSelect({ type: "footer", index });
                  }}
                >
                  {link}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
