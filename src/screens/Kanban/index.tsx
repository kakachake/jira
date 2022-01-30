import styled from "@emotion/styled";
import { Spin } from "antd";
import React, { useCallback } from "react";
import { useLocation } from "react-router";
import { Loading, ScreenContainer } from "../../components/lib";
import { useDocumentTitile } from "../../utils";
import { useKanbans, useReorderKanban } from "../../utils/kanban";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectIdInUrl,
  useProjectInUrl,
  useTaskModal,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
  Drag,
  DragChild,
  Drop,
  DropChild,
} from "../../components/drag-and-drop";
import { Kanban } from "../../types/kanban";
import { useReorderTask, useTasks } from "../../utils/task";
export const KanbanScreen = () => {
  useDocumentTitile("看板列表");

  const { data: kanbans, isLoading } = useKanbans(useKanbanSearchParams());
  const { data: currentProject } = useProjectInUrl();
  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel></SearchPanel>
        <ColumnsContainner>
          <Drop type={"column"} direction={"horizontal"} droppableId={"kanban"}>
            <DropContainner>
              {" "}
              <Loading loading={isLoading}>
                {kanbans?.map((kanban, index) => {
                  return (
                    <Drag
                      key={kanban.id}
                      draggableId={"kanban" + kanban.id}
                      index={index}
                    >
                      <DragChild>
                        <KanbanColumn
                          key={kanban.id}
                          kanban={kanban}
                        ></KanbanColumn>
                      </DragChild>
                    </Drag>
                  );
                })}
              </Loading>
            </DropContainner>
          </Drop>
          <CreateKanban></CreateKanban>
        </ColumnsContainner>
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutateAsync: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  const { data: allTasks = [] } = useTasks(useTasksSearchParams()[0]);
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      console.log(source);
      console.log(destination);
      console.log(type);

      if (!destination) {
        return;
      }
      if (type === "column") {
        const fromIndex = source.index;
        const toIndex = destination.index;
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, fromIndex, toIndex, referenceId: toId, type });
      }
      if (type === "row") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;

        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];

        console.log(fromTask);
        console.log(toTask);
        if (fromTask?.id === toTask?.id) {
          return;
        }

        reorderTask({
          fromKanbanId,
          toKanbanId,
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );
};

export const ColumnsContainner = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
export const DropContainner = styled(DropChild)`
  display: flex;
  flex: 1;
`;
