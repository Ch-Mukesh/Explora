// // mode-toggle.jsx
// import { Moon, Sun } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";
// import { useTheme } from "@/components/theme-provider";

// export function ModeToggle() {
//   const { setTheme, theme } = useTheme();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="icon" className="relative rounded-full border-black dark:border-white">
//           <Sun
//             className={`h-5 w-5 transition-transform duration-300 ${
//               theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
//             } text-gray-900 dark:text-yellow-500`}
//           />
//           <Moon
//             className={`h-5 w-5 absolute  transition-transform duration-300 ${
//               theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
//             } text-gray-900 dark:text-white`}
//           />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           <p className="dark:text-white">Light</p>
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           <p className="dark:text-white">Dark</p>
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           <p className="dark:text-white">System</p>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }


import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="relative rounded-full border-black dark:border-white"
    >
      <Sun
        className={`h-5 w-5 transition-transform duration-300 ${
          theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
        } text-gray-900 dark:text-yellow-500`}
      />
      <Moon
        className={`h-5 w-5 absolute transition-transform duration-300 ${
          theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
        } text-gray-900 dark:text-white`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
