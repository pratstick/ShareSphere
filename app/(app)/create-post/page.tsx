import CreateNeighborhoodButton from "@/components/header/CreateCommunityButton";
import CreatePostForm from "@/components/post/CreatePostForm";
import { NeighborhoodCombobox } from "@/components/subreddit/SubredditCombobox";
import { getSubreddits } from "@/sanity/lib/subreddit/getSubreddits";

async function CreatePostPage({
  searchParams,
}: {
  searchParams: Promise<{ neighborhood: string; type: string }>;
}) {
  const { neighborhood, type } = await searchParams;

  // get all subreddits
  const subreddits = await getSubreddits();

  if (neighborhood) {
    return (
      <>
        {/* Banner */}
        <section className="bg-white border-b">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="flex items-center">
              <div>
                <h1 className="text-2xl font-bold">
                  {type === "request" ? "Request Help" : "Offer Help"}
                </h1>
                <p className="text-sm text-gray-600">
                  {type === "request" 
                    ? "Ask for help in" 
                    : "Offer help in"
                  }{" "}
                  <span className="font-bold">{neighborhood}</span> neighborhood
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="my-8">
          <CreatePostForm />
        </section>
      </>
    );
  }

  return (
    <>
      {/* Banner */}
      <section className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-6">            <div className="flex items-center">
              <div>
                <h1 className="text-2xl font-bold">
                  {type === "request" ? "Request Help" : "Share Help"}
                </h1>
                <p className="text-sm text-gray-600">
                  {type === "request" 
                    ? "Select a neighborhood to request help from"
                    : "Select a neighborhood to offer help to"
                  }
                </p>
              </div>
            </div>
        </div>
      </section>

      {/* Content */}
      <section className="my-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4">
            <div className="max-w-3xl">
              <label className="block text-sm font-medium mb-2">
                Select a neighborhood to share in
              </label>
              <NeighborhoodCombobox
                subreddits={subreddits}
                defaultValue={neighborhood}
                helpType={type}
              />

              <hr className="my-4" />

              <p className="mt-4 text-sm text-gray-600">
                If you don&apos;t see your neighborhood, you can create it here.
              </p>
              <div className="mt-2">
                <CreateNeighborhoodButton />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CreatePostPage;
