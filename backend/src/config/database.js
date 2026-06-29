const { PrismaClient } = require("@prisma/client");

let prisma;

function getPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient({
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    });

    process.on("beforeExit", async () => {
      await prisma.$disconnect();
    });
  }

  return prisma;
}

module.exports = getPrismaClient;
