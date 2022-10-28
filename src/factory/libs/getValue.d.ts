import { GetFieldType } from "./types";
export default function getValue<TData, TPath extends string, TDefault = GetFieldType<TData, TPath>>(data: TData, path: TPath, defaultValue?: TDefault): GetFieldType<TData, TPath> | TDefault;
//# sourceMappingURL=getValue.d.ts.map