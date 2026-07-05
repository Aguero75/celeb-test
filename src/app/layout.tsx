import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import "./globals.css";
export const metadata: Metadata = {
  title: "CelebFanHub — Official Fan Portal",
  description: "Your exclusive gateway to the inner circle.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#12121A",
                color: "#E8C97A",
                border: "1px solid #C9A84C",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
