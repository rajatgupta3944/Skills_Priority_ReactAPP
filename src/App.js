import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import LeftPanel from "./components/LeftPanel";
import "./App.css";
import Header from "./components/Header";
import data from "./Data/core";
import data2 from "./Data/special";
import data3 from "./Data/creative";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "grey" : "lightblue",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "white",
  padding: grid,
  width: 250,
});

const App = () => {
  const [leftPanelItems, setLeftPanelItems] = useState(data);
  const [leftMidPanelItems, setLeftMidPanelItems] = useState(data2);
  const [leftLastPanelItems, setLeftLastPanelItems] = useState(data3);
  const [rightPanelItems, setRightPanelItems] = useState([]);
  const [rightPanelLastItems, setRightPanelLastItems] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceListId = result.source.droppableId;
    const destinationListId = result.destination.droppableId;

    const sourceList = getList(sourceListId);
    const destinationList = getList(destinationListId);

    const movedItem = sourceList[result.source.index];

    const updatedSourceList = [...sourceList];

    if (sourceListId !== destinationListId) {
      const updatedDestinationList = [...destinationList];
      updatedDestinationList.splice(result.destination.index, 0, movedItem);
      setList(destinationListId, updatedDestinationList);

      updatedSourceList.splice(result.source.index, 1);
    }

    setList(sourceListId, updatedSourceList);
  };

  const removeItemFromRightPanel = (itemId) => {
    const updatedRightPanelItems = rightPanelItems.filter(
      (item) => item.id !== itemId
    );

    setRightPanelItems(updatedRightPanelItems);
  };

  const removeItemFromRightPanelLast = (itemId) => {
    const updatedRightPanelItems = rightPanelLastItems.filter(
      (item) => item.id !== itemId
    );

    setRightPanelLastItems(updatedRightPanelItems);
  };

  const getList = (droppableId) => {
    switch (droppableId) {
      case "leftPanelDroppable":
        return leftPanelItems;
      case "leftMidPanelDroppable":
        return leftMidPanelItems;
      case "leftLastPanelDroppable":
        return leftLastPanelItems;
      case "rightPanelDroppable":
        return rightPanelItems;
      case "rightPanelLastDroppable":
        return rightPanelLastItems;
      default:
        return [];
    }
  };

  const setList = (droppableId, updatedList) => {
    switch (droppableId) {
      case "leftPanelDroppable":
        setLeftPanelItems(updatedList);
        break;
      case "leftMidPanelDroppable":
        setLeftMidPanelItems(updatedList);
        break;
      case "leftLastPanelDroppable":
        setLeftLastPanelItems(updatedList);
        break;
      case "rightPanelDroppable":
        setRightPanelItems(updatedList);
        break;
      case "rightPanelLastDroppable":
        setRightPanelLastItems(updatedList);
        break;
      default:
        break;
    }
  };

  return (
    <div className="body-alignment">
      <LeftPanel />
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "12px" }}>

          <div className="main-content">
            <Header data="Skill Selected" />
            <div className="common-box-css">
            <span style={{ margin: "12px" }}><span className="box-heading-css">Core </span><a>(Creative 0)</a></span>
            <Droppable droppableId="leftPanelDroppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    ...getListStyle(snapshot.isDraggingOver),
                  }}
                  className="box-core"
                >

                  {leftPanelItems.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <span
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...getItemStyle(snapshot.isDragging, provided.draggableProps.style),
                          }}
                          className="common-cards card-core"
                        >
                          {item.content}
                        </span>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            </div>
            <div className="common-box-css">
            <span style={{ margin: "12px" }}><span className="box-heading-css">Special </span><a>(Creative 0)</a></span>
            <Droppable droppableId="leftMidPanelDroppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    ...getListStyle(snapshot.isDraggingOver),
                  }}
                  className="box-special"
                >
                  {leftMidPanelItems.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}

                          style={{
                            ...getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            ),
                          }}
                          className="common-cards card-special"
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            </div>
            <div className="common-box-css">
            <span style={{ margin: "12px" }}><span className="box-heading-css">Creative </span><a>(Creative 0)</a></span>
            <Droppable droppableId="leftLastPanelDroppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    ...getListStyle(snapshot.isDraggingOver),
                  }}
                  className="box-creative"
                >
                  {leftLastPanelItems.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )
                          }}
                          className="common-cards card-creative"
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            </div>
          </div>
          <div>
            <div className="right-panel" style={{ backgroundColor: "#E2EBF8" }}>
              <div>
                <Header data="Set Skill Priority" />

                <Droppable droppableId="rightPanelDroppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        ...getListStyle(snapshot.isDraggingOver),
                      }}
                      className="common-right-panel"
                    >
                      <span className="right-title-panel">School Priority</span>
                      {rightPanelItems.map((item, index) => (
                        <div key={item.id} className="cards-right-panel" style={{backgroundColor:item.bgcolor,borderColor:item.borderrad}}>
                          {item.content}
                          <button onClick={() => removeItemFromRightPanel(item.id)} className="buttons-right-panel">
                            x
                          </button>
                        </div>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              <Droppable droppableId="rightPanelLastDroppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      ...getListStyle(snapshot.isDraggingOver),
                    }}
                    className="common-right-panel"
                  >
                    <span className="right-title-panel">Home Priority</span>
                    {rightPanelLastItems.map((item, index) => (
                      <div key={item.id} className="cards-right-panel" style={{backgroundColor:item.bgcolor,borderColor:item.borderrad}}>
                        {item.content}
                        <button onClick={() => removeItemFromRightPanelLast(item.id)} className="buttons-right-panel">
                          x
                        </button>
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
