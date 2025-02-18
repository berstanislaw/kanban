import QueryProvider from "@/providers/queryProvider";
import NextAuthSessionProvider from "@/providers/sessionProvider";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthSessionProvider>
          <QueryProvider>{children}</QueryProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
