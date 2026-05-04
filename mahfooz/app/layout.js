import PropTypes from "prop-types";
import "../styles/globals.css";

export const metadata = {
  title: "Mahfooz",
  description: "Pakistan's investment learning platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
