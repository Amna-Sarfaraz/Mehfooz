import PropTypes from 'prop-types';

export function LessonCard({ title, description }) {
  return (
    <article className="rounded-[24px] border border-border/80 bg-card p-6 shadow-soft">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
    </article>
  );
}

LessonCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
