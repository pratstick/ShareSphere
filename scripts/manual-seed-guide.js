// Sample data that can be manually created in Sanity Studio

export const chandgarhManualData = {
  // 1. Create Subreddit/Neighborhood first:
  subreddit: {
    _type: "subreddit",
    title: "Chandigarh",
    description: "The beautiful city of Chandigarh - where neighbors help neighbors. From Sector 17 to Sector 69, we're all here to support each other in our daily needs.",
    slug: { _type: "slug", current: "chandigarh" }
  },

  // 2. Create Users:
  users: [
    {
      _type: "user",
      username: "priya_sharma",
      email: "priya.sharma@email.com", 
      firstName: "Priya",
      lastName: "Sharma",
      fullName: "Priya Sharma"
    },
    {
      _type: "user", 
      username: "rahul_gupta",
      email: "rahul.gupta@email.com",
      firstName: "Rahul", 
      lastName: "Gupta",
      fullName: "Rahul Gupta"
    },
    // ... (3 more users)
  ],

  // 3. Create Posts:
  posts: [
    {
      _type: "post",
      title: "Need help picking up my daughter from school - Sector 22",
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Hi neighbors! I'm stuck in an emergency meeting and can't pick up my 8-year-old daughter from Sacred Heart School in Sector 26. School ends at 3:30 PM today. She knows not to go with strangers, so I'll need to call the school and inform them. Can someone help? I live in Sector 22. Will be happy to return the favor anytime! 🙏"
            }
          ]
        }
      ],
      // Reference to author and subreddit
      author: { _type: "reference", _ref: "user-priya-sharma" },
      subreddit: { _type: "reference", _ref: "chandigarh-subreddit-id" }
    }
    // ... (4 more posts)
  ]
};

// Instructions for manual creation:
console.log(`
📝 MANUAL CREATION STEPS:

1. Visit http://localhost:3000/studio
2. Create the following in order:

🏘️ CREATE NEIGHBORHOOD:
- Go to "Subreddits" 
- Add new document
- Title: "Chandigarh"
- Slug: "chandigarh" 
- Description: "The beautiful city of Chandigarh - where neighbors help neighbors..."

👥 CREATE USERS:
- Go to "Users"
- Create 5 users with the names above

📝 CREATE POSTS:
- Go to "Posts"
- Create posts with the sample content
- Link to users and Chandigarh subreddit

💬 CREATE COMMENTS:
- Go to "Comments" 
- Add realistic responses to posts
`);
