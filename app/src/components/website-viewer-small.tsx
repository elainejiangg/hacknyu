// import { Selection } from "@/types/challenge";

// interface WebsiteViewerSmallProps {
//   url: string;
//   title: string;
//   onSelect: (selection: Selection) => void;
//   isSelected: (type: Selection["type"], index: number) => boolean;
// }

// export function WebsiteViewerSmall({
//   url,
//   title,
//   onSelect,
//   isSelected,
// }: WebsiteViewerSmallProps) {
//   return (
//     <div className="w-full bg-black/50 rounded-xl overflow-hidden border border-white/10">
//       {/* Browser chrome/toolbar */}
//       <div className="bg-white/5 p-4 border-b border-white/10">
//         {/* URL bar */}
//         <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 font-mono text-sm">
//           <span className="text-white/60">https://</span>
//           <span
//             className={`text-white/90 cursor-pointer ${
//               isSelected("url", -1) ? "bg-lime-400/30" : "hover:bg-lime-400/30"
//             }`}
//             onClick={() => {
//               console.log("Clicked URL");
//               onSelect({ type: "url", index: -1 });
//             }}
//           >
//             {url}
//           </span>
//         </div>
//       </div>

//       {/* Website content */}
//       <div className="p-6">
//         <div className="max-w-md mx-auto space-y-8">
//           <div className="text-center">
//             <div className="text-4xl font-bold text-blue-400 mb-2">
//               <span
//                 className={`cursor-pointer ${
//                   isSelected("title", -1)
//                     ? "bg-lime-400/30"
//                     : "hover:bg-lime-400/30"
//                 }`}
//                 onClick={() => {
//                   console.log("Clicked title");
//                   onSelect({ type: "title", index: -1 });
//                 }}
//               >
//                 {title}
//               </span>
//             </div>
//             <p className="text-white/60">Log in to your account</p>
//           </div>

//           <div className="space-y-4">
//             <div className="space-y-2">
//               <label className="block text-sm font-pixel text-white/80">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-pixel text-white/60"
//                 placeholder="Enter your email"
//                 disabled
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-pixel text-white/80">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-pixel text-white/60"
//                 placeholder="Enter your password"
//                 disabled
//               />
//             </div>

//             <button
//               className="w-full bg-blue-500/80 text-white font-pixel py-3 rounded-lg mt-6"
//               disabled
//             >
//               Log In
//             </button>
//           </div>

//           <div className="text-center text-sm">
//             <div className="text-[#0070ba]">Having trouble logging in?</div>
//             <div className="text-[#0070ba]">Reset your password</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Selection } from "@/types/challenge";
import axios from "axios";

interface WebsiteViewerSmallProps {
  parts: {
    id: number;
    question_part_content: string;
  }[];
  onSelect: (selection: Selection) => void;
  isSelected: (type: Selection["type"], index: number) => boolean;
}

export function WebsiteViewerSmall({
  parts,
  onSelect,
  isSelected,
}: WebsiteViewerSmallProps) {
  const handleSelect = async (type: Selection["type"], index: number) => {
    console.log(`Clicked ${type} at index ${index}`);
    onSelect({ type, index });

    try {
      // Trigger the endpoint with the selected element type and index
      const response = await axios.put(
        `http://localhost:3001/answers/${index}/add-flag`,
        {
          type: type,
        }
      );
      console.log("Flag added:", response.data);
    } catch (error) {
      console.error("Error adding flag:", error);
    }
  };

  return (
    <div className="w-full bg-black/50 rounded-xl overflow-hidden border border-white/10">
      {/* Browser chrome/toolbar */}
      <div className="bg-white/5 p-4 border-b border-white/10">
        {/* URL bar */}
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 font-mono text-sm">
          <span className="text-white/60">https://</span>
          <span
            className={`text-white/90 cursor-pointer ${
              isSelected("url", parts[0].id)
                ? "bg-lime-400/30"
                : "hover:bg-lime-400/30"
            }`}
            onClick={() => handleSelect("url", parts[0].id)} // Using the `id` for the URL part
          >
            {parts[0].question_part_content}
          </span>
        </div>
      </div>

      {/* Website content */}
      <div className="p-6">
        <div className="max-w-md mx-auto space-y-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">
              <span
                className={`cursor-pointer ${
                  isSelected("title", parts[1].id)
                    ? "bg-lime-400/30"
                    : "hover:bg-lime-400/30"
                }`}
                onClick={() => handleSelect("title", parts[1].id)} // Using the `id` for the title part
              >
                {parts[1].question_part_content}
              </span>
            </div>
            <p className="text-white/60">Log in to your account</p>
          </div>

          <div className="space-y-4">
            {/* Render other parts here if applicable */}
            {parts.slice(2).map((part) => (
              <div key={part.id}>
                <span
                  className={`cursor-pointer transition-colors rounded px-0.5
                    ${
                      isSelected("message", part.id)
                        ? "bg-lime-400/30"
                        : "hover:bg-lime-400/30"
                    }`}
                  onClick={() => handleSelect("message", part.id)} // Using the `id` for each part
                >
                  {part.question_part_content}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
