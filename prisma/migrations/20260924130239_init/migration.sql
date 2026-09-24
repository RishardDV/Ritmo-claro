/*
  Warnings:

  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "habitos" DROP CONSTRAINT "habitos_actorId_fkey";

-- DropTable
DROP TABLE "usuarios";

-- CreateTable
CREATE TABLE "actores" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Role" NOT NULL DEFAULT 'USUARIO',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "actores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "actores_email_key" ON "actores"("email");

-- AddForeignKey
ALTER TABLE "habitos" ADD CONSTRAINT "habitos_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "actores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
