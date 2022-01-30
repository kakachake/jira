/**
 * 在本地对排序进行乐观更新
 * @param fromId 要排序的项目的id
 * @param type 'before' | 'after'
 * @param referenceId 参照id
 * @param list 要排序的列表, 比如tasks, kanbans
 */
export const reorder = ({
  fromId,
  type,
  referenceId,
  list,
  fromKanbanId,
  toKanbanId,
}: {
  list: { id: number }[];
  fromId: number;
  type: "after" | "before";
  referenceId: number;
  fromKanbanId: number;
  toKanbanId: number;
}) => {
  const copiedList = [...list];
  const fromIndex = copiedList.findIndex((item) => item.id === fromId);
  if (!referenceId) {
    return insert([...copiedList], fromIndex, copiedList.length - 1);
  }
  let targetIndex = copiedList.findIndex((item) => item.id === referenceId);
  targetIndex =
    toKanbanId !== fromKanbanId && targetIndex > fromIndex
      ? targetIndex - 1
      : targetIndex;
  return insert([...copiedList], fromIndex, targetIndex);
};

export const insert = (list: unknown[], from: number, to: number) => {
  const item = list[from];
  list.splice(from, 1);
  list.splice(to, 0, item);
  return list;
};
