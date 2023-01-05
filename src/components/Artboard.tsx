import Konva from "konva";
import { observer } from "mobx-react-lite";
import { useRef } from 'react';
import { Layer, Stage } from "react-konva";
import { useStore } from "../store/design";
import { StarElement } from "./StarElement"

const buttonStyles = {

}

function ArtboardImpl() {
  const { elements, selectedElementId, setSelectedElement } = useStore();
  const stageRef: any = useRef(null);

  const deselectElement = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedElement('');
    }
  };

  const downloadURI = (uri: string, name: string) => {
    let link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleExport = () => {
    const uri = stageRef.current.toDataURL({mimeType: 'image/jpeg'});
    downloadURI(uri, 'stars.jpg');
  };


  return (
    <div style={{ position: 'relative' }}>
      <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight} onMouseDown={deselectElement} onTouchStart={deselectElement}>
        <Layer>
          {elements.map((star, index) => (
              <StarElement key={star.id} star={star} index={index} isSelected={star.id === selectedElementId}/>
          ))}
        </Layer>
      </Stage>
      <div style={{ position: "fixed", top: 0, right: 0, padding: "24px" }}>
        <button style={{ ...buttonStyles }} className="button" onClick={handleExport}>Export as JPEG</button>
      </div>
    </div>
  );
}

export const Artboard = observer(ArtboardImpl);
