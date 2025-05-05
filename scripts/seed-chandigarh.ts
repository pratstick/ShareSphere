import { adminClient } from "@/sanity/lib/adminClient";

// Sample data for Chandigarh neighborhood
const chandgarhData = {
  neighborhood: {
    title: "Chandigarh",
    description: "Chandigarh, the City Beautiful\nThe Subreddit for the TriCity of Chandigarh, Mohali and Panchkula.",
    slug: "chandigarh"
  },
  
  // Sample users (20 users)
  users: [
    {
      _id: "user-priya-sharma",
      username: "priya_sharma",
      email: "priya.sharma@email.com",
      firstName: "Priya",
      lastName: "Sharma"
    },
    {
      _id: "user-rahul-gupta", 
      username: "rahul_gupta",
      email: "rahul.gupta@email.com",
      firstName: "Rahul",
      lastName: "Gupta"
    },
    {
      _id: "user-anita-singh",
      username: "anita_singh", 
      email: "anita.singh@email.com",
      firstName: "Anita",
      lastName: "Singh"
    },
    {
      _id: "user-vikram-mehta",
      username: "vikram_mehta",
      email: "vikram.mehta@email.com", 
      firstName: "Vikram",
      lastName: "Mehta"
    },
    {
      _id: "user-sunita-kaur",
      username: "sunita_kaur",
      email: "sunita.kaur@email.com",
      firstName: "Sunita", 
      lastName: "Kaur"
    },
    {
      _id: "user-amit-verma",
      username: "amit_verma",
      email: "amit.verma@email.com",
      firstName: "Amit",
      lastName: "Verma"
    },
    {
      _id: "user-neha-arora",
      username: "neha_arora",
      email: "neha.arora@email.com",
      firstName: "Neha",
      lastName: "Arora"
    },
    {
      _id: "user-rajesh-kumar",
      username: "rajesh_kumar",
      email: "rajesh.kumar@email.com",
      firstName: "Rajesh",
      lastName: "Kumar"
    },
    {
      _id: "user-pooja-malhotra",
      username: "pooja_malhotra",
      email: "pooja.malhotra@email.com",
      firstName: "Pooja",
      lastName: "Malhotra"
    },
    {
      _id: "user-manpreet-singh",
      username: "manpreet_singh",
      email: "manpreet.singh@email.com",
      firstName: "Manpreet",
      lastName: "Singh"
    },
    {
      _id: "user-kavya-sharma",
      username: "kavya_sharma",
      email: "kavya.sharma@email.com",
      firstName: "Kavya",
      lastName: "Sharma"
    },
    {
      _id: "user-deepak-jindal",
      username: "deepak_jindal",
      email: "deepak.jindal@email.com",
      firstName: "Deepak",
      lastName: "Jindal"
    },
    {
      _id: "user-ritu-bansal",
      username: "ritu_bansal",
      email: "ritu.bansal@email.com",
      firstName: "Ritu",
      lastName: "Bansal"
    },
    {
      _id: "user-harpreet-kaur",
      username: "harpreet_kaur",
      email: "harpreet.kaur@email.com",
      firstName: "Harpreet",
      lastName: "Kaur"
    },
    {
      _id: "user-sanjay-agarwal",
      username: "sanjay_agarwal",
      email: "sanjay.agarwal@email.com",
      firstName: "Sanjay",
      lastName: "Agarwal"
    },
    {
      _id: "user-megha-sethi",
      username: "megha_sethi",
      email: "megha.sethi@email.com",
      firstName: "Megha",
      lastName: "Sethi"
    },
    {
      _id: "user-karan-bhatia",
      username: "karan_bhatia",
      email: "karan.bhatia@email.com",
      firstName: "Karan",
      lastName: "Bhatia"
    },
    {
      _id: "user-simran-gill",
      username: "simran_gill",
      email: "simran.gill@email.com",
      firstName: "Simran",
      lastName: "Gill"
    },
    {
      _id: "user-tarun-khanna",
      username: "tarun_khanna",
      email: "tarun.khanna@email.com",
      firstName: "Tarun",
      lastName: "Khanna"
    },
    {
      _id: "user-preeti-aggarwal",
      username: "preeti_aggarwal",
      email: "preeti.aggarwal@email.com",
      firstName: "Preeti",
      lastName: "Aggarwal"
    }
  ],

  // Sample posts (10 posts)
  posts: [
    {
      title: "Need help picking up my daughter from school - Sector 22",
      body: "Hi neighbors! I'm stuck in an emergency meeting and can't pick up my 8-year-old daughter from Sacred Heart School in Sector 26. School ends at 3:30 PM today. She knows not to go with strangers, so I'll need to call the school and inform them. Can someone help? I live in Sector 22. Will be happy to return the favor anytime! 🙏",
      author: "user-priya-sharma",
      helpType: "request",
      category: "childcare"
    },
    {
      title: "Offering grocery pickup service for elderly neighbors",
      body: "Hello everyone! I'm a college student with flexible timing and I have a car. I'd love to help our elderly neighbors with grocery shopping from stores like Big Bazaar in Sector 17 or Reliance Fresh. I can pick up groceries and deliver them to your doorstep. No charges, just want to help our community. Available on weekends and evenings. DM me your list! 🛒❤️",
      author: "user-rahul-gupta", 
      helpType: "offer",
      category: "grocery"
    },
    {
      title: "Looking for someone to walk my dog while I'm away",
      body: "Hi Chandigarh family! I'll be traveling to Delhi for work for 3 days (Monday to Wednesday) and need someone to walk my golden retriever 'Bruno' twice a day - morning around 7 AM and evening around 6 PM. He's very friendly and loves people. I live in Sector 34 near the park. Will pay ₹500 per day. Bruno loves treats and belly rubs! 🐕",
      author: "user-anita-singh",
      helpType: "request",
      category: "pet-care"
    },
    {
      title: "Free math tutoring for kids (Classes 6-10)",
      body: "Hello parents! I'm a retired math teacher and I have some free time on my hands. I'd love to help kids in our neighborhood with math homework and concepts. I can teach classes 6-10 level. I'm available on Saturdays and Sundays from 4-6 PM. My place in Sector 19 or can come to your place if nearby. Let's make math fun for our kids! 📚✨",
      author: "user-vikram-mehta",
      helpType: "offer",
      category: "tutoring"
    },
    {
      title: "Need a ride to PGI for mom's checkup - urgent",
      body: "My mom has an important doctor's appointment at PGI tomorrow (Tuesday) at 11 AM but our car broke down. She uses a walker so needs a comfortable car. We live in Sector 43. Can someone please help with a ride? I can pay for fuel and will be very grateful. The appointment is very important for her heart condition. Please help! 🚗💜",
      author: "user-sunita-kaur",
      helpType: "request",
      category: "transportation"
    },
    {
      title: "Offering computer and phone repair services at home",
      body: "Hi TriCity folks! I'm a software engineer working from home and I love fixing tech problems. I can help with laptop issues, phone screen replacements, software installation, virus removal etc. I have all the tools and spare parts. Very reasonable rates and I come to your place. Available evenings and weekends. Based in Mohali Phase 8. Call me for quick tech fixes! 💻📱",
      author: "user-amit-verma",
      helpType: "offer",
      category: "tech-support"
    },
    {
      title: "Need babysitter for weekend wedding in family",
      body: "Hello neighbors! We have a family wedding this Saturday in Panchkula and need someone trustworthy to look after our 4-year-old twin boys for about 6 hours (2 PM to 8 PM). They're well-behaved and love cartoons and drawing. We live in Sector 45. Looking for someone with experience with kids. Will pay ₹1500 for the day. References appreciated! 👶👶",
      author: "user-neha-arora",
      helpType: "request",
      category: "childcare"
    },
    {
      title: "Free home-cooked meals for new parents and patients",
      body: "Namaste everyone! I'm a homemaker and I love cooking. I want to help new parents, elderly, or anyone recovering from illness by providing fresh, hygienic home-cooked meals. I can make North Indian, Punjabi, and some South Indian dishes. Just WhatsApp me a day before. No charges, just my way of giving back to the community. Located in Sector 21. 🍛❤️",
      author: "user-rajesh-kumar",
      helpType: "offer",
      category: "food"
    },
    {
      title: "Looking for carpool partner for daily office commute to IT PARK",
      body: "Hi everyone! I work in IT PARK and travel daily from Sector 32 Chandigarh. My office timings are 9:30 AM to 6:30 PM. Looking for someone with similar schedule to share the ride and fuel costs. It's a long lonely drive and would love some company! I have a comfortable sedan. Let's make the commute fun and economical! 🚗💼",
      author: "user-pooja-malhotra",
      helpType: "request",
      category: "transportation"
    },
    {
      title: "Free guitar and music lessons for beginners",
      body: "Music lovers of TriCity! I'm a professional musician and I'd love to teach guitar and basic music theory to kids and adults who want to learn. I have 10+ years of experience and have performed in various bands. Classes can be at my place in Panchkula or online via video call. Weekends work best for me. Let's spread the joy of music! 🎸🎵",
      author: "user-manpreet-singh",
      helpType: "offer",
      category: "tutoring"
    }
  ],

  // Sample comments (30+ comments across all posts)
  comments: [
    // Comments for post 1 (school pickup)
    {
      postIndex: 0,
      author: "user-rahul-gupta",
      content: "Hey Priya! I can help. I live in Sector 20, very close to you. I have my bike and can pick her up. Please call me at 98765-43210. I have a young sister too so I understand the situation."
    },
    {
      postIndex: 0, 
      author: "user-vikram-mehta",
      content: "If Rahul can't make it, I'm also available. I'm retired so I have time. My number is 87654-32109. Hope everything works out with your meeting!"
    },
    {
      postIndex: 0,
      author: "user-priya-sharma", 
      content: "Thank you so much Rahul and Vikram uncle! Rahul, I'll call you now. This community is amazing! ❤️"
    },
    {
      postIndex: 0,
      author: "user-kavya-sharma",
      content: "Priya, I'm also a working mom in Sector 24. Let's exchange numbers for future emergencies. We moms need to support each other! 💪"
    },

    // Comments for post 2 (grocery service)
    {
      postIndex: 1,
      author: "user-anita-singh",
      content: "This is so sweet of you Rahul! My elderly aunt in Sector 15 could really use this help. She finds it difficult to go out these days."
    },
    {
      postIndex: 1,
      author: "user-sunita-kaur", 
      content: "What a wonderful initiative! We need more young people like you. I'll spread the word in my building."
    },
    {
      postIndex: 1,
      author: "user-deepak-jindal",
      content: "Rahul beta, you're doing great service! My father in Mohali Phase 7 also needs such help. Can you cover that area too?"
    },
    {
      postIndex: 1,
      author: "user-rahul-gupta",
      content: "Thank you everyone! @deepak_jindal uncle, yes I can cover Mohali too. Please share my contact with your father. Happy to serve! 😊"
    },

    // Comments for post 3 (dog walking)
    {
      postIndex: 2,
      author: "user-vikram-mehta",
      content: "I love dogs! I can help with the evening walks. I live in Sector 35, just next to yours. Used to have a golden retriever myself. Can I meet Bruno first?"
    },
    {
      postIndex: 2,
      author: "user-priya-sharma",
      content: "Anita, I can help with the morning walks before I go to office. I jog every morning anyway in that area!"
    },
    {
      postIndex: 2,
      author: "user-karan-bhatia",
      content: "Hey Anita! I'm also a dog lover and live in Sector 32. I have a Labrador named Rocky. Maybe Bruno and Rocky can be walk buddies!"
    },
    {
      postIndex: 2,
      author: "user-anita-singh",
      content: "OMG you all are lifesavers! Vikram uncle, please come meet Bruno tomorrow evening. Priya, that would be perfect! Karan, Rocky and Bruno playdate sounds amazing! 🐕❤️"
    },

    // Comments for post 4 (math tutoring)
    {
      postIndex: 3,
      author: "user-priya-sharma",
      content: "Sir, my daughter is in class 8 and struggling with algebra. Would it be possible for her to join your sessions?"
    },
    {
      postIndex: 3,
      author: "user-ritu-bansal",
      content: "Vikram sir, my twin boys are in class 7 and need help with geometry. This is such a blessing! Teachers like you are angels."
    },
    {
      postIndex: 3,
      author: "user-harpreet-kaur",
      content: "Sir, my nephew in class 10 is weak in trigonometry. Can he also join? We live in Mohali but can come to Chandigarh."
    },
    {
      postIndex: 3,
      author: "user-vikram-mehta",
      content: "Of course! All kids are welcome. Let's make a small group - it'll be more fun for them to learn together. Please bring them this Saturday at 4 PM."
    },

    // Comments for post 5 (PGI ride)
    {
      postIndex: 4,
      author: "user-rahul-gupta", 
      content: "I can drive you both! My car is comfortable and has good space. I'll pick you up at 10:15 AM sharp. No need to pay for fuel - we're neighbors!"
    },
    {
      postIndex: 4,
      author: "user-megha-sethi",
      content: "Sunita ji, I hope aunty's checkup goes well. Rahul is such a gem! Please take care and let us know if you need anything else."
    },
    {
      postIndex: 4,
      author: "user-sanjay-agarwal",
      content: "If you need any help with car repairs later, I know a good mechanic in Sector 41. Very honest and reasonable rates."
    },
    {
      postIndex: 4,
      author: "user-sunita-kaur",
      content: "Rahul beta, you're an angel! Thank you so much. I'll be ready by 10:15. Sanjay ji, will definitely contact you for car repairs. This community is amazing! 🙏"
    },

    // Comments for post 6 (computer repair)
    {
      postIndex: 5,
      author: "user-tarun-khanna",
      content: "Amit bhai, my laptop has been running very slow lately. Can you check what's wrong? I'm in Mohali Phase 9."
    },
    {
      postIndex: 5,
      author: "user-preeti-aggarwal",
      content: "My phone screen is cracked and local shops are charging too much. What are your rates for screen replacement?"
    },
    {
      postIndex: 5,
      author: "user-simran-gill",
      content: "Finally someone reliable for tech issues! The local computer shops are so expensive and not trustworthy."
    },
    {
      postIndex: 5,
      author: "user-amit-verma",
      content: "Thanks everyone! @tarun_khanna I'll check your laptop this weekend. @preeti_aggarwal phone screen replacement starts from ₹800 depending on model. Much cheaper than shops!"
    },

    // Comments for post 7 (babysitting)
    {
      postIndex: 6,
      author: "user-kavya-sharma",
      content: "Neha, I have experience with kids and I'm free this Saturday. I have a 6-year-old son so I understand how to handle energetic kids!"
    },
    {
      postIndex: 6,
      author: "user-ritu-bansal",
      content: "I can also help if Kavya is not available. I have twin boys myself and they're similar age. Kids love me! 😊"
    },
    {
      postIndex: 6,
      author: "user-neha-arora",
      content: "Thank you so much Kavya and Ritu! Kavya, can you please call me at 98123-45678? My boys would love to play with your son!"
    },

    // Comments for post 8 (home-cooked meals)
    {
      postIndex: 7,
      author: "user-megha-sethi",
      content: "Rajesh ji, this is so kind of you! My neighbor just had a baby and she's struggling with cooking. Can you help her?"
    },
    {
      postIndex: 7,
      author: "user-manpreet-singh",
      content: "Uncle, my grandmother is recovering from surgery and can't cook. Would you be able to send some light, healthy meals?"
    },
    {
      postIndex: 7,
      author: "user-harpreet-kaur",
      content: "Such a noble gesture! The community needs more people like you. God bless your family!"
    },
    {
      postIndex: 7,
      author: "user-rajesh-kumar",
      content: "Of course beta! @megha_sethi please share your neighbor's contact. @manpreet_singh I'll prepare special recovery meals for dadi ji. WhatsApp me at 97890-12345."
    },

    // Comments for post 9 (carpool)
    {
      postIndex: 8,
      author: "user-deepak-jindal",
      content: "Pooja, I also work in Gurgaon but my timings are 8:30 to 5:30. Close enough? We can adjust slightly?"
    },
    {
      postIndex: 8,
      author: "user-sanjay-agarwal",
      content: "I don't work in Gurgaon but I know a WhatsApp group for Chandigarh-Gurgaon carpoolers. Let me add you!"
    },
    {
      postIndex: 8,
      author: "user-pooja-malhotra",
      content: "Deepak, yes that timing works! 30 minutes difference is manageable. Sanjay ji, please add me to that group too. Thank you!"
    },

    // Comments for post 10 (guitar lessons)
    {
      postIndex: 9,
      author: "user-karan-bhatia",
      content: "Manpreet bhai, I've always wanted to learn guitar! I'm 25, is that too late to start? I'm completely beginner."
    },
    {
      postIndex: 9,
      author: "user-simran-gill",
      content: "My 12-year-old daughter is very interested in music. Can she join your classes? She's a quick learner."
    },
    {
      postIndex: 9,
      author: "user-tarun-khanna",
      content: "I used to play guitar in college but I'm very rusty now. Can you help me get back into it?"
    },
    {
      postIndex: 9,
      author: "user-manpreet-singh",
      content: "Age is just a number for music! @karan_bhatia never too late to start. @simran_gill kids are the best students! @tarun_khanna let's refresh those skills. All welcome this Sunday!"
    }
  ]
};

export async function seedChandgarhData() {
  try {
    console.log("🌱 Starting to seed Chandigarh neighborhood data...");

    // 1. Create or get the Chandigarh neighborhood
    console.log("📍 Creating/Getting Chandigarh neighborhood...");
    let neighborhood;
    try {
      neighborhood = await adminClient.create({
        _type: "subreddit",
        title: chandgarhData.neighborhood.title,
        description: chandgarhData.neighborhood.description,
        slug: {
          _type: "slug",
          current: chandgarhData.neighborhood.slug
        }
      });
      console.log("✅ Neighborhood created:", neighborhood._id);
    } catch (error) {
      // If neighborhood already exists, fetch it
      console.log("📍 Neighborhood already exists, fetching...");
      const existingNeighborhoods = await adminClient.fetch(
        `*[_type == "subreddit" && slug.current == $slug][0]`,
        { slug: chandgarhData.neighborhood.slug }
      );
      neighborhood = existingNeighborhoods;
      console.log("✅ Neighborhood found:", neighborhood._id);
    }

    // 2. Create sample users (only if they don't exist)
    console.log("👥 Creating sample users...");
    const createdUsers = [];
    for (const user of chandgarhData.users) {
      try {
        const createdUser = await adminClient.create({
          _type: "user",
          _id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: `${user.firstName} ${user.lastName}`
        });
        createdUsers.push(createdUser);
        console.log(`✅ User created: ${createdUser.username}`);
      } catch (error) {
        // If user already exists, fetch it
        const existingUser = await adminClient.getDocument(user._id);
        if (existingUser) {
          createdUsers.push(existingUser);
          console.log(`ℹ️ User already exists: ${existingUser.username}`);
        }
      }
    }

    // 3. Create sample posts (skip if posts already exist for this neighborhood)
    console.log("📝 Creating sample posts...");
    const existingPosts = await adminClient.fetch(
      `*[_type == "post" && subreddit._ref == $neighborhoodId]`,
      { neighborhoodId: neighborhood._id }
    );
    
    let createdPosts = [];
    if (existingPosts.length > 0) {
      console.log(`ℹ️ Found ${existingPosts.length} existing posts, skipping post creation`);
      createdPosts = existingPosts;
    } else {
      for (const [index, post] of chandgarhData.posts.entries()) {
        const createdPost = await adminClient.create({
          _type: "post",
          title: post.title,
          body: [
            {
              _type: "block",
              _key: `block-${Date.now()}-${index}`,
              children: [
                {
                  _type: "span",
                  _key: `span-${Date.now()}-${index}`,
                  text: post.body
                }
              ]
            }
          ],
          author: {
            _type: "reference",
            _ref: post.author
          },
          subreddit: {
            _type: "reference", 
            _ref: neighborhood._id
          },
          helpType: post.helpType,
          category: post.category,
          publishedAt: new Date(Date.now() - (index * 3600000)).toISOString() // Stagger posts by 1 hour
        });
        createdPosts.push(createdPost);
        console.log(`✅ Post created: "${createdPost.title}"`);
      }
    }

    // 4. Create sample comments (skip if comments already exist)
    console.log("💬 Creating sample comments...");
    const existingComments = await adminClient.fetch(
      `*[_type == "comment" && post._ref in $postIds]`,
      { postIds: createdPosts.map((p: any) => p._id) }
    );
    
    if (existingComments.length > 0) {
      console.log(`ℹ️ Found ${existingComments.length} existing comments, skipping comment creation`);
    } else {
      for (const comment of chandgarhData.comments) {
        const post = createdPosts[comment.postIndex];
        if (post) {
          const createdComment = await adminClient.create({
            _type: "comment",
            content: comment.content,
            author: {
              _type: "reference",
              _ref: comment.author
            },
            post: {
              _type: "reference",
              _ref: post._id
            },
            publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString() // Random time within last 24 hours
          });
          console.log(`✅ Comment created on post: "${post.title.substring(0, 30)}..."`);
        }
      }
    }

    console.log("🎉 Successfully seeded Chandigarh neighborhood with sample data!");
    console.log("📊 Summary:");
    console.log(`- 1 neighborhood (${neighborhood.title})`);
    console.log(`- ${createdUsers.length} users`);
    console.log(`- ${createdPosts.length} posts`);
    console.log(`- ${chandgarhData.comments.length} comments`);

    return {
      success: true,
      data: {
        neighborhood,
        users: createdUsers,
        posts: createdPosts
      }
    };

  } catch (error) {
    console.error("❌ Error seeding data:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}

// Function to clear existing Chandigarh data
export async function clearChandgarhData() {
  try {
    console.log("🧹 Clearing existing Chandigarh data...");

    // Find the Chandigarh neighborhood
    const neighborhood = await adminClient.fetch(
      `*[_type == "subreddit" && slug.current == $slug][0]`,
      { slug: chandgarhData.neighborhood.slug }
    );

    if (!neighborhood) {
      console.log("ℹ️ No existing Chandigarh neighborhood found.");
      return { success: true, message: "No data to clear" };
    }

    // First, get all posts for this neighborhood
    const posts = await adminClient.fetch(
      `*[_type == "post" && subreddit._ref == $neighborhoodId]`,
      { neighborhoodId: neighborhood._id }
    );
    console.log(`Found ${posts.length} posts to delete`);

    // Delete votes first (they reference posts)
    for (const post of posts) {
      const votes = await adminClient.fetch(
        `*[_type == "vote" && post._ref == $postId]`,
        { postId: post._id }
      );
      for (const vote of votes) {
        await adminClient.delete(vote._id);
      }
      console.log(`✅ Deleted ${votes.length} votes for post: ${post.title}`);
    }

    // Delete comments (they reference posts)
    for (const post of posts) {
      const comments = await adminClient.fetch(
        `*[_type == "comment" && post._ref == $postId]`,
        { postId: post._id }
      );
      for (const comment of comments) {
        await adminClient.delete(comment._id);
      }
      console.log(`✅ Deleted ${comments.length} comments for post: ${post.title}`);
    }

    // Delete posts (they reference the neighborhood)
    for (const post of posts) {
      await adminClient.delete(post._id);
      console.log(`✅ Deleted post: ${post.title}`);
    }

    // Delete users (only the ones we created)
    for (const user of chandgarhData.users) {
      try {
        await adminClient.delete(user._id);
        console.log(`✅ Deleted user: ${user.username}`);
      } catch (error) {
        console.log(`ℹ️ User ${user.username} not found or already deleted`);
      }
    }

    // Delete the neighborhood
    await adminClient.delete(neighborhood._id);
    console.log("✅ Deleted Chandigarh neighborhood");

    console.log("🎉 Successfully cleared all Chandigarh data!");
    return { success: true, message: "Data cleared successfully" };

  } catch (error) {
    console.error("❌ Error clearing data:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}

// Export the data for direct use if needed
export { chandgarhData };
