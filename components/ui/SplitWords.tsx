export default function SplitWords({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em]">
          <span className="word inline-block will-change-transform">{w}&nbsp;</span>
        </span>
      ))}
    </span>
  );
}
