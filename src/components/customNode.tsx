import { Handle, Position } from "@xyflow/react";

export const StartStyledNode = ({ data }: any) => {
  return (
    <div className="flex items-center p-2 rounded bg-slate-100">
      <div
        className={`flex justify-center items-center w-6 h-6 rounded-full mr-2`}
        style={{ backgroundColor: data.iconBackground || "#f3f3f3" }}
      >
        {data.icon}
      </div>
      <div className="text-sm font-medium text-gray-700">{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export const CategoryStyledNode = ({ data }: any) => {
  return (
    <div
      className="flex items-center p-2 rounded min-w-20
    max-w-40 break-words whitespace-normal bg-slate-50"
    >
      <div
        className={`flex justify-center items-center w-6 h-6 rounded-full mr-2`}
        style={{ backgroundColor: data.iconBackground || "#f3f3f3" }}
      >
        {data.icon}
      </div>
      <div className="text-sm font-medium text-gray-700">{data.label}</div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export const MealStyledNode = ({ data }: any) => {
  return (
    <div className="flex items-center p-2 rounded-full bg-slate-50">
      <div
        className={`flex justify-center items-center w-6 h-6 rounded-full mr-2`}
        style={{ backgroundColor: data.iconBackground || "#f3f3f3" }}
      >
        {data.icon}
      </div>
      <div className="text-sm font-medium text-gray-700">{data.label}</div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};
