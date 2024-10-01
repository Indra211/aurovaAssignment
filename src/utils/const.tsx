import { CiGlobe } from "react-icons/ci";
import { v4 as uuidv4 } from "uuid";
import {
  CategoryStyledNode,
  MealStyledNode,
  StartStyledNode,
} from "../components";

export const createNode = (
  label: string,
  type: string,
  icon: any,
  positionX: number,
  positionY: number,
  sourceId: string,
  _: string,
  nodeId?: any
) => {
  const id = nodeId || uuidv4();
  return {
    node: {
      id,
      data: { label, type, icon },
      type,
      position: { x: positionX, y: positionY },
      targetPosition: "left",
      sourcePosition: "right",
    },
    edge: {
      id: uuidv4(),
      source: sourceId,
      target: id,
    },
  };
};

export const initialNodes: any = [
  {
    id: "1",
    data: {
      label: "Explore",
      icon: <CiGlobe className="text-slate-600" />,
    },
    position: { x: 0, y: 0 },
    type: "start",
    sourcePosition: "right",
  },
];

export const nodeTypes = {
  start: StartStyledNode,
  category: CategoryStyledNode,
  action: MealStyledNode,
  meal: CategoryStyledNode,
  ingredient: CategoryStyledNode,
  ingredients: CategoryStyledNode,
  details: MealStyledNode,
};
