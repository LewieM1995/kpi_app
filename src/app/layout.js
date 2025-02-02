import { Sarabun } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./auth_context/auth_context";
import ClientLayout from "./client_layout/client_layout";

const fontStyle = Sarabun({
  variable: "--font-style",
  subsets: ["latin"],
  weight: "400",
})

export const metadata = {
  title: "Fuji Seal KPI",
  description: "Track and visualize key performance indicators.",
  openGraph: {
    type: "website",
    title: "Fuji Seal KPI",
    url: "https://main.du5r0kntqwpqx.amplifyapp.com",
    siteName: "Fuji Seal KPI"
  }
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={`${fontStyle.variable}`}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
