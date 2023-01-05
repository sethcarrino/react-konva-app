import Konva from "konva";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../store/design";

const buttonStyles = {
  borderRadius: 6,
  cursor: "pointer"
}


function ToolbarImpl() {
  const [cursorCoordinates, setCursorCoordinates] = useState({ x: 0, y: 0 });
  const { selectedElement, updateElementPoints, selectedElementId, toggleElementLock } = useStore();

  const setNewCoords = (event: MouseEvent) => {
    setCursorCoordinates({ x: event.clientX, y: event.clientY })
  };

  useEffect(() => {
    window.addEventListener("mousemove", setNewCoords);

    return () => {
      window.removeEventListener("mousemove", setNewCoords);
    };
  });

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        left: "10px",
        display: "flex",
        padding: "10px",
        gap: "10px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "lightgrey",
        borderRadius: "8px"
      }}
    >
      <input 
        type="range" min="2" max="25" 
        value={selectedElement?.numPoints || 5}
        onChange={(e)=>{
          const count = e.target.value;
          updateElementPoints(selectedElementId, count)
        }} 
      />
      <p style={{margin: '0'}}>{`Coords: ${cursorCoordinates.x}, ${cursorCoordinates.y}`}</p>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        {selectedElementId && <button style={buttonStyles} className="button-alt" onClick={() => toggleElementLock(selectedElementId)}>{selectedElement?.locked ? "Unlock" : "Lock"}</button>}
      </div>
    </div>
  );
}

export const Toolbar = observer(ToolbarImpl);
