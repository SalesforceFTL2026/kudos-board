require("dotenv").config();
const Board = require("./models/board");
const Card = require("./models/card");

async function testModels() {
  console.log("🧪 Testing Models...\n");

  try {
    // Test 1: Get all boards (no filters)
    console.log("1️⃣  Testing Board.findAll() - no filters");
    const allBoards = await Board.findAll();
    console.log(`   ✅ Found ${allBoards.length} boards`);
    console.log(`   Titles: ${allBoards.map(b => b.title).join(", ")}\n`);

    // Test 2: Filter by category
    console.log("2️⃣  Testing Board.findAll() - category filter");
    const celebrationBoards = await Board.findAll({ category: "Celebration" });
    console.log(`   ✅ Found ${celebrationBoards.length} board(s) in 'Celebration' category`);
    if (celebrationBoards.length > 0) {
      console.log(`   Board: "${celebrationBoards[0].title}"\n`);
    }

    // Test 3: Search by title
    console.log("3️⃣  Testing Board.findAll() - search filter");
    const searchResults = await Board.findAll({ search: "win" });
    console.log(`   ✅ Found ${searchResults.length} board(s) matching 'win'`);
    if (searchResults.length > 0) {
      console.log(`   Titles: ${searchResults.map(b => b.title).join(", ")}\n`);
    }

    // Test 4: Both filters
    console.log("4️⃣  Testing Board.findAll() - category + search");
    const combinedResults = await Board.findAll({
      category: "Recent",
      search: "wins"
    });
    console.log(`   ✅ Found ${combinedResults.length} board(s) matching both filters\n`);

    // Test 5: Get single board by ID
    if (allBoards.length > 0) {
      console.log("5️⃣  Testing Board.findById()");
      const firstBoard = await Board.findById(allBoards[0].id);
      console.log(`   ✅ Found board: "${firstBoard.title}"`);
      console.log(`   Cards: ${firstBoard.cards.length}\n`);
    }

    // Test 6: Get cards by board ID
    if (allBoards.length > 0) {
      console.log("6️⃣  Testing Card.findByBoardId()");
      const cards = await Card.findByBoardId(allBoards[0].id);
      console.log(`   ✅ Found ${cards.length} cards`);
      if (cards.length > 0) {
        console.log(`   First card: "${cards[0].message}" (${cards[0].upvotes} upvotes)\n`);
      }
    }

    // Test 7: Create and delete board (optional - commented out to avoid polluting data)
    /*
    console.log("7️⃣  Testing Board.create() and Board.delete()");
    const newBoard = await Board.create({
      title: "Test Board",
      category: "Test",
      author: "Test Script"
    });
    console.log(`   ✅ Created board with ID: ${newBoard.id}`);

    await Board.delete(newBoard.id);
    console.log(`   ✅ Deleted board ${newBoard.id}\n`);
    */

    console.log("✅ All model tests passed!\n");

  } catch (error) {
    console.error("❌ Test failed:");
    console.error(error);
    process.exit(1);
  }
}

// Run tests
testModels()
  .then(() => {
    console.log("🎉 Testing complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Fatal error:", error);
    process.exit(1);
  });
