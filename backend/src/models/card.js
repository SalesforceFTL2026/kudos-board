const getPrismaClient = require("../config/database");
const prisma = getPrismaClient();

const Card = {
  // Find all cards by board ID
  findByBoardId: async (boardId) => {
    return prisma.card.findMany({
      where: { boardId: parseInt(boardId) },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  // Find card by ID
  findById: async (id) => {
    return prisma.card.findUnique({
      where: { id: parseInt(id) },
    });
  },

  // Create new card
  create: async (data) => {
    return prisma.card.create({
      data,
    });
  },

  // Increment upvotes
  upvote: async (id) => {
    return prisma.card.update({
      where: { id: parseInt(id) },
      data: {
        upvotes: {
          increment: 1,
        },
      },
    });
  },

  // Delete card
  delete: async (id) => {
    return prisma.card.delete({
      where: { id: parseInt(id) },
    });
  },
};

module.exports = Card;
