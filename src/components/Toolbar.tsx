import Konva from "konva";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../store/design";


function ToolbarImpl() {
  const { selectedElement, updateElementPoints, selectedElementId } = useStore();

  const setNewCoords = (event: MouseEvent) => {
    // get Konva coords
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
        width: "150px",
        height: "60px",
        display: "flex",
        padding: "10px",
        gap: "10px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "grey",
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
      <p style={{margin: '0'}}>{`Coords: ${120}, ${80}`}</p>
    </div>
  );
}

export const Toolbar = observer(ToolbarImpl);
