import { Selection } from "@/types/challenge";

interface WebsiteViewerMediumProps {
  url: string;
  title: string;
  mainText: string[];
  buttonText: string;
  onSelect: (selection: Selection) => void;
  isSelected: (type: Selection["type"], index: number) => boolean;
}

export function WebsiteViewerMedium({
  url,
  title,
  mainText,
  buttonText,
  onSelect,
  isSelected,
}: WebsiteViewerMediumProps) {
  return (
    <div className="w-full bg-black/50 rounded-xl overflow-hidden border border-white/10">
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
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400">
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

          {/* Action button */}
          <div className="text-center">
            <button
              className={`px-8 py-3 bg-blue-500 text-white rounded-lg font-medium cursor-pointer ${
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
        </div>
      </div>
    </div>
  );
}
