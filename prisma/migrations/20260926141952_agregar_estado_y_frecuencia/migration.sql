-- AlterTable
ALTER TABLE "habitos" ADD COLUMN     "estado" "Estado" NOT NULL DEFAULT 'ACTIVO',
ADD COLUMN     "frecuencia" "Frecuencia" NOT NULL DEFAULT 'DIARIA';
