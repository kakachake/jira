import styled from "@emotion/styled";
import { Spin } from "antd";
import React from "react";
import { useLocation } from "react-router";
import { Loading, ScreenContainer } from "../../components/lib";
import { useDocumentTitile } from "../../utils";
import { useKanbans } from "../../utils/kanban";
import { CreateKanban } from "./create-kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import { TaskModal } from "./task-modal";
import {
  useKanbanSearchParams,
  useProjectIdInUrl,
  useProjectInUrl,
  useTaskModal,
} from "./util";

export const KanbanScreen = () => {
  useDocumentTitile("看板列表");

  const { data: kanbans, isLoading } = useKanbans(useKanbanSearchParams());
  const { data: currentProject } = useProjectInUrl();

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel></SearchPanel>
      <ColumnsContainner>
        <Loading loading={isLoading}>
          {kanbans?.map((kanban) => {
            return (
              <KanbanColumn key={kanban.id} kanban={kanban}></KanbanColumn>
            );
          })}
          <CreateKanban></CreateKanban>
        </Loading>
      </ColumnsContainner>
      <TaskModal />
    </ScreenContainer>
  );
};

export const ColumnsContainner = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
