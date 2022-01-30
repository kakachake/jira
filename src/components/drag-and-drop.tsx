import React, { ReactNode } from "react";
import {
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
  DraggableProps,
  Draggable,
} from "react-beautiful-dnd";

type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };

export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
          });
        }
        return <div></div>;
      }}
    </Droppable>
  );
};

type DropChildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
  React.HTMLAttributes<HTMLDivElement>;
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  )
);

type DragChildProps = Partial<{ provided: DraggableProps }> &
  React.HTMLAttributes<HTMLDivElement>;
export const DragChild = React.forwardRef<HTMLDivElement, DragChildProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
        {/* {props.provided?.placeholder} */}
      </div>
    );
  }
);

type DragProps = Omit<DraggableProps, "children"> & { children: ReactNode };
export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ref: provided.innerRef,
            ...provided.dragHandleProps,
          });
        }
        return <div></div>;
      }}
    </Draggable>
  );
};
