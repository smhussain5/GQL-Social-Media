-- AlterTable
ALTER TABLE "User" ADD COLUMN     "biography" TEXT;

-- CreateTable
CREATE TABLE "_UserLikedPosts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserDislikedPosts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserLikedPosts_AB_unique" ON "_UserLikedPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLikedPosts_B_index" ON "_UserLikedPosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserDislikedPosts_AB_unique" ON "_UserDislikedPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserDislikedPosts_B_index" ON "_UserDislikedPosts"("B");

-- AddForeignKey
ALTER TABLE "_UserLikedPosts" ADD CONSTRAINT "_UserLikedPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedPosts" ADD CONSTRAINT "_UserLikedPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDislikedPosts" ADD CONSTRAINT "_UserDislikedPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDislikedPosts" ADD CONSTRAINT "_UserDislikedPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
