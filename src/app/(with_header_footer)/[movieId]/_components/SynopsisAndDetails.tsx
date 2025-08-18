export const SynopsisAndDetails = ({
  director,
  writers,
  overview,
}: {
  director: string;
  writers: string[];
  overview: string;
}) => {
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Synopsis */}
      <div className="space-y-4">
        <h2 className="text-2xl text-foreground">Synopsis</h2>
        <p className="text-base text-foreground/90 leading-relaxed">
          {overview}
        </p>
      </div>

      {/* Movie Details */}
      <div className="space-y-6">
        <h3 className="text-xl text-foreground">Movie Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Director</p>
            <p className="text-base text-foreground">{director}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Writers</p>
            <p className="text-base text-foreground">{writers.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
