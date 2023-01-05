import { useRef, useEffect, useMemo } from 'react';
import { Star, Transformer } from "react-konva";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/design";
import { ElementType } from "../store/element";

type StarElementProps = {
  star: ElementType;
  isSelected: boolean;
  index: number;
}

const transformerOptions = {
  anchorFill: '#90ee90',
  anchorCornerRadius: 500,
  anchorSize: 12,
  borderStrokeWidth: 2,
}

const colors = ["red", "blue", "yellow", "green", "white", "brown", "gray"]

function StarShape({star, isSelected, index}: StarElementProps) {
    const { elements, setSelectedElement, setElements } = useStore();
    const shapeRef: any = useRef();
    const trRef: any = useRef();
    const randomColor = useMemo(() => colors[Math.floor(Math.random()*colors.length)], []);

    useEffect(() => {
        if (isSelected && !star.locked) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    const handleDragStart = (e: any) => {
      const id = e.target.id();
      setElements(
        elements.map((el) => {
          return {
            ...el,
            isDragging: el.id === id,
            x: el.id === id ? e.target.x() : el.x,
            y: el.id === id ? e.target.y() : el.y
          };
        })
      );
    };

    const handleDragEnd = (e: any) => {
      const id = e.target.id();
      setElements(
        elements.map((el) => {
          return {
            ...el,
            isDragging: false,
            x: el.id === id ? e.target.x() : el.x,
            y: el.id === id ? e.target.y() : el.y
          };
        })
      );
    };

    const handleTransform = (e: any) => {
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
    } 

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
            fill={randomColor}
            opacity={0.8}
            draggable={!star.locked}
            rotation={star.rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            onMouseDown={() => {
              setSelectedElement(star.id);
            }}
            shadowOffsetX={star.isDragging ? 10 : 5}
            shadowOffsetY={star.isDragging ? 10 : 5}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onTransformEnd={handleTransform}
        />
        {isSelected && !star.locked && 
          <Transformer 
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
            {...transformerOptions}
          />
        }
      </>
    )
}

export const StarElement = observer(StarShape);