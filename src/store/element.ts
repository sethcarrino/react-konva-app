import { Instance, types } from "mobx-state-tree";

const ElementAttrs = {
  id: types.identifier,
  type: "none",
  x: 0,
  y: 0,
  height: 0,
  width: 0,
  scaleX: types.optional(types.number, 1),
  scaleY: types.optional(types.number, 1),
  rotation: 0,
  opacity: 1,
  isDragging: false,
  locked: false,
  numPoints: 5,
  shadowEnabled: false,
  shadowBlur: 5,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "black",
  custom: types.frozen(),
};

export type ElementAttrsType = typeof ElementAttrs;

export const Element = types.model("Element", ElementAttrs).actions((self) => ({
  set(attrs: Partial<ElementAttrsType>) {
    Object.assign(self, attrs);
  },
}));

export type ElementType = Instance<typeof Element>;
