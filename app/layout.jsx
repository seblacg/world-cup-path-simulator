export const metadata = {
  title: "2026 World Cup Path Simulator",
  description: "Map out your team's path to the 2026 World Cup final. Explore every possible knockout matchup by team or venue across the US, Canada and Mexico.",
  verification: {
    other: {
      "impact-site-verification": "8fad96be-e9b9-4fc9-a091-fb2bcc60f4e4",
    },
  },
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
