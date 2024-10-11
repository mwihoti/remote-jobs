import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Remote job Board",
  description: "Find and apply for remote job opportunities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <div className="container items-center justify-between mx-auto py-4 flex">
            <Link href={'/'} className="font-bold text-xl"> Job Board</Link>
            <nav className="flex gap-2 *:px-4 *:py-2 *:rounded-md ">
              <Link href="/jobs" className="bg-gray-200 ">Jobs</Link>
              <Link href="/about" className="bg-blue-600">Post jobs</Link>
            </nav>
            </div>
        </header>
        {children}
      </body>
    </html>
  );
}
