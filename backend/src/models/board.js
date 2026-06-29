const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Board = {
  // Find all boards with optional filters
  findAll: async (filters = {}) => {
    // TODO: Feature 1 - Implement filtering logic
    return prisma.board.findMany({
      include: {
        cards: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  // Find board by ID
  findById: async (id) => {
    return prisma.board.findUnique({
      where: { id: parseInt(id) },
      include: {
        cards: true,
      },
    });
  },

  // Create new board
  create: async (data) => {
    return prisma.board.create({
      data,
    });
  },

  // Delete board
  delete: async (id) => {
    return prisma.board.delete({
      where: { id: parseInt(id) },
    });
  },
};

module.exports = Board;
