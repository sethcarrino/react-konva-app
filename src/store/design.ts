import { Instance, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { Element, ElementType } from "./element";

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
    numPoints: 5,
  }));
}

const INITIAL_STATE = generateShapes();

export const Store = types
  .model("Store", {
    elements: types.array(Element),
    selectedElementId: types.maybeNull(types.string),
  })
  .actions((self) => ({
    setSelectedElement: (id: string) => {
      self.selectedElementId = id;
    },
    setElements: (elements: ElementType[] | any) => {
      self.elements = elements;
    },
    updateElementPoints: (elementId: string | any, pointCount: string) => {
      const els: ElementType[] | any = [...self.elements];
      const elementIndex = els.findIndex((el: ElementType) => el.id === elementId);
      const element = els[elementIndex];
      els[elementIndex] = {...element, numPoints: parseInt(pointCount)}

      self.elements = els;
    },
    toggleElementLock: (elementId: string | any) => {
      const els: ElementType[] | any = [...self.elements];
      const elementIndex = els.findIndex((el: ElementType) => el.id === elementId);
      const element = els[elementIndex];
      els[elementIndex] = {...element, locked: !element.locked}

      self.elements = els;
    }
  }))
  .views((self) => ({
    get selectedElement() {
      const matchingElement = self.elements.find(
        (element) => self.selectedElementId === element.id
      );
      return matchingElement;
    },
  }));

export type StoreType = Instance<typeof Store>;

const store = Store.create({ elements: INITIAL_STATE });

export default store;

export const StoreContext = createContext<StoreType>(store);

export const useStore = () => useContext(StoreContext);
