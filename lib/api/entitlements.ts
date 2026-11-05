// The first FREE_CHAPTER_COUNT chapters (ordered by chapterId) are free.
// Later chapters need the Pro plan. This mirrors the lock shown in the UI.
export const FREE_CHAPTER_COUNT = 2;

export function requiresPro(chapterIds: number[], chapterId: number): boolean {
  const sorted = [...new Set(chapterIds)].sort((a, b) => a - b);
  return sorted.indexOf(chapterId) >= FREE_CHAPTER_COUNT;
}
