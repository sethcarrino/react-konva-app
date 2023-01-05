import Konva from "konva";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../store/design";

function ToolbarImpl() {
  const [cursorCoordinates, setCursorCoordinates] = useState<any>({ x: 0, y: 0 });
  const { selectedElement, updateElementPoints, selectedElementId, toggleElementLock } = useStore();

  const setNewCoords = (event: MouseEvent) => {
    const x = selectedElement?.x ? Math.round(selectedElement.x) : 0;
    const y = selectedElement?.y ? Math.round(selectedElement.y) : 0;
    setCursorCoordinates({ x, y })
  };

  useEffect(() => {
    window.addEventListener("mousemove", setNewCoords);

    return () => {
      window.removeEventListener("mousemove", setNewCoords);
    };
  });

  return (
    <>
      {selectedElementId && 
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
            disabled={selectedElement?.locked}
          />
          <p style={{margin: '0'}}>{`Coords: ${cursorCoordinates.x}, ${cursorCoordinates.y}`}</p>
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <button className="button-alt" onClick={() => toggleElementLock(selectedElementId)}>{selectedElement?.locked ? "Unlock" : "Lock"}</button>
          </div>
        </div>
      }
    </>
    
  );
}

export const Toolbar = observer(ToolbarImpl);
