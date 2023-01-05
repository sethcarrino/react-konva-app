import Konva from "konva";
import { observer } from "mobx-react-lite";
import { Layer, Stage } from "react-konva";
import { useStore } from "../store/design";
import { StarElement } from "./StarElement"

function ArtboardImpl() {
  const { elements, selectedElementId, setSelectedElement } = useStore();

  const deselectElement = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedElement('');
    }
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} onMouseDown={deselectElement} onTouchStart={deselectElement}>
      <Layer>
        {elements.map((star, index) => (
            <StarElement key={star.id} star={star} index={index} isSelected={star.id === selectedElementId}/>
        ))}
      </Layer>
    </Stage>
  );
}

export const Artboard = observer(ArtboardImpl);
