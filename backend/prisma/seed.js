const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data (optional - comment out if you want to keep data)
  await prisma.card.deleteMany();
  await prisma.board.deleteMany();
  console.log("🗑️  Cleared existing data");

  // Create boards
  const board1 = await prisma.board.create({
    data: {
      title: "Team Wins",
      category: "Celebration",
      author: "Jennifer",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
    },
  });

  const board2 = await prisma.board.create({
    data: {
      title: "Thank You Notes",
      category: "Appreciation",
      author: "Alex",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
    },
  });

  const board3 = await prisma.board.create({
    data: {
      title: "Inspiration Wall",
      category: "Inspiration",
      author: "Sam",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    },
  });

  const board4 = await prisma.board.create({
    data: {
      title: "Recent Wins",
      category: "Recent",
      author: "Taylor",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
    },
  });

  console.log("✅ Created 4 boards");

  // Create cards for board 1 (Team Wins)
  await prisma.card.create({
    data: {
      message: "Amazing presentation at the client meeting!",
      gifUrl: "https://media.giphy.com/media/g9582DNuQppxC/giphy.gif",
      author: "Morgan",
      upvotes: 12,
      boardId: board1.id,
    },
  });

  await prisma.card.create({
    data: {
      message: "Shipped the new feature ahead of schedule!",
      gifUrl: "https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif",
      author: "Jordan",
      upvotes: 8,
      boardId: board1.id,
    },
  });

  await prisma.card.create({
    data: {
      message: "Fixed that nasty bug that was haunting us for weeks!",
      gifUrl: "https://media.giphy.com/media/3oz8xIsloV7zOmt81G/giphy.gif",
      author: "Casey",
      upvotes: 15,
      boardId: board1.id,
    },
  });

  // Create cards for board 2 (Thank You Notes)
  await prisma.card.create({
    data: {
      message: "Thanks for staying late to help me debug!",
      gifUrl: "https://media.giphy.com/media/ZfK4cXKJTTay1Ava29/giphy.gif",
      author: "Riley",
      upvotes: 5,
      boardId: board2.id,
    },
  });

  await prisma.card.create({
    data: {
      message: "Your code review feedback was super helpful!",
      gifUrl: "https://media.giphy.com/media/3o7abB06u9bNzA8lu8/giphy.gif",
      author: "Avery",
      upvotes: 7,
      boardId: board2.id,
    },
  });

  // Create cards for board 3 (Inspiration Wall)
  await prisma.card.create({
    data: {
      message: "You can do hard things!",
      gifUrl: "https://media.giphy.com/media/ACcXRXwUqJ6Ok/giphy.gif",
      author: "Dakota",
      upvotes: 20,
      boardId: board3.id,
    },
  });

  await prisma.card.create({
    data: {
      message: "Keep pushing forward, you've got this!",
      gifUrl: "https://media.giphy.com/media/yoJC2K6rCzwNY2EngA/giphy.gif",
      author: "Charlie",
      upvotes: 18,
      boardId: board3.id,
    },
  });

  // Create cards for board 4 (Recent Wins)
  await prisma.card.create({
    data: {
      message: "100% test coverage achieved!",
      gifUrl: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
      author: "Reese",
      upvotes: 10,
      boardId: board4.id,
    },
  });

  console.log("✅ Created 8 cards across all boards");
  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
