import { searchSubreddits } from "@/sanity/lib/subreddit/searchSubreddits";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const subreddits = await searchSubreddits(query);

  return (
    <>
      {/* Banner */}
      <section className="bg-card border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center">
            <div>
              <h1 className="text-2xl font-bold">
                Search Results ({subreddits.length})
              </h1>
              <p className="text-sm text-muted-foreground">
                Communities matching &quot;{query}&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="my-8">
        <div className="mx-auto max-w-7xl px-4">
          <ul className="flex flex-col gap-4">
            {subreddits.map((subreddit) => (
              <li
                key={subreddit._id}
                className="border border-border rounded-lg overflow-hidden"
              >
                <Link
                  href={`/community/${subreddit.slug}`}
                  className="flex items-center cursor-pointer gap-4 py-5 px-4 hover:bg-muted transition-colors"
                >
                  <Avatar className="h-12 w-12 border-2 border-border shadow-sm">
                    {subreddit.image && (
                      <AvatarImage
                        src={urlFor(subreddit.image).url()}
                        className="object-contain"
                      />
                    )}
                    <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                      {subreddit.title?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-lg font-medium">{subreddit.title}</h2>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {subreddit.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
            {subreddits.length === 0 && (
              <li className="py-8 text-center text-muted-foreground border border-border rounded-lg">
                No communities found matching your search.
              </li>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}

export default SearchPage;
