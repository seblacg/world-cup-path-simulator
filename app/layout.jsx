export const metadata = {
  title: "2026 World Cup Path Simulator",
  description: "Map out your team's path to the 2026 World Cup final.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#050508" }}>
        {children}
      </body>
    </html>
  );
}
