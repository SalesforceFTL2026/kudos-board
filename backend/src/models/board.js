const getPrismaClient = require("../config/database");
const prisma = getPrismaClient();

const Board = {
  // Find all boards with optional filters
  findAll: async (filters = {}) => {
    const { category, search } = filters;

    const where = {};

    // Filter by category (exact match)
    if (category) {
      where.category = category;
    }

    // Search in title (case-insensitive partial match)
    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    return prisma.board.findMany({
      where,
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
