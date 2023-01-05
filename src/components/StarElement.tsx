import { useRef, useEffect } from 'react';
import { Star, Transformer } from "react-konva";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/design";
import { ElementType } from "../store/element";

type StarElementProps = {
  star: ElementType;
  isSelected: boolean;
  index: number;
}

function StarShape({star, isSelected, index}: StarElementProps) {
    const { elements, setSelectedElement, setElements } = useStore();
    const shapeRef: any = useRef();
    const trRef: any = useRef();

    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
      <>
        <Star
            id={star.id}
            ref={shapeRef}
            x={star.x}
            y={star.y}
            numPoints={star.numPoints}
            innerRadius={20}
            outerRadius={40}
            fill="#89b717"
            opacity={0.8}
            draggable
            rotation={star.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            onMouseDown={() => {
              setSelectedElement(star.id);
            }}
            onTransformEnd={(e) => {
              const node: any = shapeRef.current;

              if(node) {
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
                
                const els = elements.slice();
                els[index] = {
                  ...star,
                  x: node.x(),
                  y: node.y(),
                  width: Math.max(5, node.width() * scaleX),
                  height: Math.max(node.height() * scaleY),
                };
                setElements(els);
              }
            }}
          />
          {isSelected && 
            <Transformer 
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          }
        </>
    )
}

export const StarElement = observer(StarShape);