import styled from "@emotion/styled";
import React from "react";
import { useLocation } from "react-router";
import { ScreenContainer } from "../../components/lib";
import { useDocumentTitile } from "../../utils";
import { useKanbans } from "../../utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { SearchPanel } from "./search-panel";
import {
  useKanbanSearchParams,
  useProjectIdInUrl,
  useProjectInUrl,
} from "./util";

export const KanbanScreen = () => {
  useDocumentTitile("看板列表");

  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: currentProject } = useProjectInUrl();
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel></SearchPanel>
      <ColumnsContainner>
        {kanbans?.map((kanban) => {
          return <KanbanColumn key={kanban.id} kanban={kanban}></KanbanColumn>;
        })}
      </ColumnsContainner>
    </ScreenContainer>
  );
};

const ColumnsContainner = styled.div`
  display: flex;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  flex: 1;
`;
