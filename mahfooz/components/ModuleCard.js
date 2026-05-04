import PropTypes from "prop-types";
import Link from "next/link";

export function ModuleCard({ title, description, href }) {
  return (
    <Link
      href={href}
      className="rounded-[24px] border border-border/80 bg-card p-6 shadow-soft transition-transform hover:-translate-y-0.5"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
    </Link>
  );
}

ModuleCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
